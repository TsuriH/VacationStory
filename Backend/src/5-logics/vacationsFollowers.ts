import { OkPacket } from "mysql"
import dal from "../2-utils/dal"
import VacationUserFollowModel from "../3-models/vacation-user-follow-model"

async function getAllVacationFollowers(): Promise<number>{
    
    const sql = `SELECT * FROM vacationsfollowers`

    const result =  await dal.execute(sql)

    return result 
  
}

async function getVacationFollowers(vacationId): Promise<number>{
    
    const sql = `SELECT * FROM vacationsfollowers WHERE vacationId = ${vacationId}`

    const result =  await dal.execute(sql)

    return result 
  
}

async function addFollower(vacationFollower: VacationUserFollowModel): Promise<VacationUserFollowModel>{
    
    const sql = `INSERT INTO vacationsfollowers 
                 VALUES(${vacationFollower.vacationId}, ${vacationFollower.userId})`

    const result: OkPacket =  await dal.execute(sql)

    return vacationFollower;
  
}

async function deleteFollower(vacationFollower: VacationUserFollowModel): Promise<number>{
    
    const sql = `DELETE FROM vacationsfollowers WHERE 
                vacationId = ${vacationFollower.vacationId} AND userId = ${vacationFollower.userId} `

    const result: OkPacket =  await dal.execute(sql)

    return  result.insertId


  
}





export default{ 
    getVacationFollowers,
    addFollower,
    deleteFollower,
    getAllVacationFollowers
}