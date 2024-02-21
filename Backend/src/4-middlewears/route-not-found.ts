import { NextFunction, Request, Response } from "express";
import { RouteNotFound } from "../3-models/client-error";


function routeNotFoundMiddleWare(request: Request, response: Response, next: NextFunction): void {
    const err = new RouteNotFound(request.originalUrl);
    next(err); 
}

export default routeNotFoundMiddleWare;
