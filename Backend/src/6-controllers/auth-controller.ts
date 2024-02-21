import express, { NextFunction, Request, Response } from "express"
import authLogic from "../5-logics/auth-logic"
import User from "../3-models/user"
import Credentials from "../3-models/credentials"
import verifyLogin from "../4-middlewears/verify-login"

const router = express.Router()

router.get("/verify-logged-in", verifyLogin, async (request: Request, response: Response, next: NextFunction) => {

    try {

        response.status(201).json({
            success: true
        })

    } catch (error) {

        next(error)

    }

})


router.post("/register", async (request: Request, response: Response, next: NextFunction) => {

    try {

        const registrationDetails = new User(request.body)

        const token = await authLogic.register(registrationDetails)

        response.json(token)

    } catch (error) {

        next(error)

    }

})

router.post("/login", async (request: Request, response: Response, next: NextFunction) => {

    try {

        const credentials = new Credentials(request.body)
        const token = await authLogic.login(credentials)


        response.json(token)

    } catch (error) {


        next(error)
    }

})

export default router