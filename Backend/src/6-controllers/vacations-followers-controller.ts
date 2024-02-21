import express, { NextFunction, Request, Response } from "express"
import logic from "../5-logics/vacationsFollowers"
import VacationUserFollowModel from "../3-models/vacation-user-follow-model"

const router = express.Router()



router.get("/", async (request: Request, response: Response, next: NextFunction) => {

    try {
        
        const allVacationFollowers = await logic.getAllVacationFollowers()

        response.json(allVacationFollowers)

    }
    catch (error) {
        next(error)

    }

})


router.get("/:vacationId", async (request: Request, response: Response, next: NextFunction) => {

    try {

        const vacationFollowerId = +request.params.vacationId
        
        const vacationFollowers = await logic.getVacationFollowers(vacationFollowerId)

        response.json(vacationFollowers)

    }
    catch (error) {
        next(error)

    }

})

router.post("/:vacationId", async (request: Request, response: Response, next: NextFunction) => {

    try {
        
        const vacationFollowerId = +request.params.vacationId
        
        const addedFollowersNumber = new VacationUserFollowModel(request.body)

        addedFollowersNumber.vacationId = vacationFollowerId

        const addedVacationFollower = await logic.addFollower(addedFollowersNumber)

        response.status(201).json(addedVacationFollower);

    }
    catch (error) {
        next(error)

    }

})

router.delete("/:vacationId", async (request: Request, response: Response, next: NextFunction) => {

    try {
        
        const vacationFollowerId = +request.params.vacationId
        
        const vacationFollowerToDelete = new VacationUserFollowModel(request.body)

        vacationFollowerToDelete.vacationId = vacationFollowerId

        await logic.deleteFollower(vacationFollowerToDelete)

        response.sendStatus(204);

    }
    catch (error) {
        next(error)

    }

})

export default router