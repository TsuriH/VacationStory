
export class ClientError {
    public status: number;
    public message: string;

    public constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }
}

export class IdNotFound extends ClientError {

    public constructor(id: number) {
        super(404, `there is no id like${id}, Tsuri`)
    }
}

export class RouteNotFound extends ClientError {

    public constructor(route: string) {
        super(404, `there is no ${route} like that, Tsuri`)
    }
}

export class ValidationError extends ClientError {

    public constructor(message: string) {
        super(400, message)
    }
}

export class UnAuthorized extends ClientError {

    public constructor(message: string) {
        super(401,message )
    }
}

export class ForbiddenError extends ClientError {

    public constructor(message: string) {
        super(403, message)
    }
}



