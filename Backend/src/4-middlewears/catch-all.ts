
import express, { NextFunction, Request, Response } from "express"

function CatchAll(err: any, request: Request, response: Response, next: NextFunction): void {

    console.log(err)

    const statusCode = err.status? err.status : 500 
    const status = statusCode
    const message = err.message

    response.status(status).send({
        success: false,
        message: message
    })
}

export default CatchAll
