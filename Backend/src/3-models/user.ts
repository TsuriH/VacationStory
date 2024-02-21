import Joi from "joi";

class User {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public userName: string;
    public password: string;
    public roleName: string;

    public constructor(user: User) {
        this.userId = user.userId
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.userName = user.userName
        this.password = user.password
        this.roleName = user.roleName
    }

    private static validationScheme = Joi.object({
        userId: Joi.number().integer().optional(),
        firstName: Joi.string().max(20).required(),
        lastName: Joi.string().max(20).required(),
        userName: Joi.string().max(20).required(),
        password: Joi.string().max(20).required(),
        roleName: Joi.optional()
        
    })

    public validate() {
        const result = User.validationScheme.validate(this)
        return result.error?.message
    }



}

export default User