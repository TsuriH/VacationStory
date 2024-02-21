import express, { NextFunction, Request, Response } from "express"
import logic from "../5-logics/vacations-logic"
import VacationModel from "../3-models/vacation-model"
import verifyLogin from "../4-middlewears/verify-login"
import verifyAdmin from "../4-middlewears/verify-admin"

const router = express.Router()

//first page the user see




router.get("/",verifyLogin, async (request: Request, response: Response, next: NextFunction) => {
    try {

        const allVacations = await logic.getAllVacations()

        response.json(allVacations)
    
    } catch (error) {

    next(error)
        
    }
   
})

router.get("/:userId", async (request: Request, response: Response, next: NextFunction) => {
    try {

        const userId = +request.params.userId

        const vacationUserFollow = await logic.getVacationUserFollow(userId)

        response.json(vacationUserFollow)

    }
    catch (error) {
        next(error)

    }

})

//admin adding an vacation
router.post("/",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        request.body.image = request.files?.image

        const vacationData = new VacationModel(request.body)
        
        const newVacation = await logic.addingVacation(vacationData)

        response.json(newVacation)

    }
    catch (error) {
        next(error)

    }

})

router.put("/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {

        const vacationId = +request.params.vacationId

        request.body.image = request.files?.image

        const vacationData = new VacationModel(request.body)

        vacationData.id = vacationId
        
        const newVacation = await logic.updateVacation(vacationData)

        response.json(newVacation)

    }
    catch (error) {
        next(error)

    }

})

router.delete("/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {

        const vacationId = +request.params.vacationId

        await logic.deleteVacation(vacationId)

        response.sendStatus(204)

    }
    catch (error) {
        next(error)

    }

})














export default router