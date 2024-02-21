import Joi from "joi";

class Credentials {

    public userName: string;
    public password: string

    public constructor(credentials: Credentials) {
        this.userName = credentials.userName
        this.password = credentials.password
    }

    private static validationScheme = Joi.object({
  
        userName: Joi.string().max(20).required(),
        password: Joi.string().max(20).required(),

        
    })

    public validate() {
        const result = Credentials.validationScheme.validate(this)
        return result.error?.message
    }


}

export default Credentials