import { NextFunction, Request, Response } from "express"
import { ForbiddenError, UnAuthorized } from "../3-models/client-error"
import dal from "../2-utils/auth"


async function verifyAdmin(request: Request, response: Response, next: NextFunction) {
    
        const authHeader = request.headers['authorization']

        const result = await dal.verifyToken(authHeader)

        if (!result) next(new UnAuthorized("you are not a user"))

        const container = await dal.verifyAdmin(authHeader.split(' ')[1])
        
        if(container.user.roleName !== "Admin") next(new ForbiddenError("You are not an admin"))

        next()

}

export default verifyAdmin
