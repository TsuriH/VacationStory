import VacationModel from "../3-models/vacation-model";
import dal from "../2-utils/dal"
import { OkPacket } from "mysql";
import { IdNotFound, ValidationError } from "../3-models/client-error";
import { v4 as uuid } from "uuid"
import imageDelete from "../2-utils/safe-delete"
import deleteImage from "../2-utils/safe-delete";

async function getAllVacations(): Promise<VacationModel[]> {
    const sql = "SELECT * FROM vacations"
    const allVacations = await dal.execute(sql);
    return allVacations
}

async function getVacationUserFollow(userId: number): Promise<VacationModel[]> {

    const sql = `SELECT * from vacations WHERE 
                vacationId IN ( SELECT vacationId FROM
                vacationsfollowers where userId = ${userId})`

    const vacationsUserFollow = await dal.execute(sql)
    if (vacationsUserFollow[0].length === 0) throw new IdNotFound(userId)
    return vacationsUserFollow
}

async function addingVacation(vacation: VacationModel): Promise<VacationModel> {

    const error = vacation.validate()
   
    if (error) throw new ValidationError(error)

    if (vacation.image) {
        const fileType = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
        const newImageName = uuid() + fileType
        vacation.imageName = newImageName
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName)
        delete vacation.image;
    }
    const sql = `INSERT INTO vacations VALUES(DEFAULT,
        '${vacation.country}',
        '${vacation.description}',
        ${vacation.price},
        '${vacation.imageName}',
        '${vacation.dates}'
            )`
    const result: OkPacket = await dal.execute(sql)

    vacation.id = result.insertId

    return vacation

}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    const error = vacation.validate()
    
    if (error) throw new ValidationError(error)
    
    if (vacation.image) {
        const sql = `SELECT imageName from vacations WHERE vacationId = ${vacation.id}`
        const previousImageNameToDelete = await dal.execute(sql)
        await deleteImage(previousImageNameToDelete[0].imageName)
        const fileType = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
        const newImageName = uuid() + fileType
        vacation.imageName = newImageName
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName)
        delete vacation.image;
    }

    const sql = `UPDATE vacations SET
        country = '${vacation.country}',
        description = '${vacation.description}',
        price = ${vacation.price},
        imageName = '${vacation.imageName}',
        dates = '${vacation.dates}'
        WHERE vacationId = ${vacation.id}
            `
    const result: OkPacket = await dal.execute(sql)

    if (result.affectedRows === 0) throw new IdNotFound(vacation.id)

    return vacation

}

async function deleteVacation(id: number): Promise<void> {

    const sql = `DELETE from vacations WHERE vacationId = ${id}
            `
    const result: OkPacket = await dal.execute(sql)

    if (result.affectedRows === 0) throw new IdNotFound(id)

}

export default {
    getAllVacations,
    getVacationUserFollow,
    addingVacation,
    updateVacation,
    deleteVacation
}

