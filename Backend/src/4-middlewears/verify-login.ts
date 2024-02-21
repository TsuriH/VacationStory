import { NextFunction, Request, Response } from "express"
import { UnAuthorized } from "../3-models/client-error"
import auth from "../2-utils/auth"


async function verifyLogin(request: Request, response: Response, next: NextFunction):Promise<void> {
        
        const authHeader = request.headers['authorization']

        console.log(authHeader)
        
        const result = await auth.verifyToken(authHeader)

        if (!result){
            next(new UnAuthorized("you are not a user"))
            return
        } 

        // const payload = auth.verifyAdmin

        next()

}

export default verifyLogin
