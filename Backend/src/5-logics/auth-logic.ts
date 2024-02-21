import { UnAuthorized, ValidationError } from "../3-models/client-error";
import User from "../3-models/user";
import auth from "../2-utils/auth"
import dal from "../2-utils/dal"
import RoleName from "../3-models/role";
import Credentials from "../3-models/credentials";
import { OkPacket } from "mysql";

async function register(user: User): Promise<string> {

    const error = user.validate()

    if (error) throw new ValidationError(error)

    user.roleName = RoleName.User

    const sql = `INSERT INTO users VALUES(
                 DEFAULT,
                 '${user.firstName}',
                 '${user.lastName}',
                 '${user.userName}',
                 '${user.password}',
                 '${user.roleName}'
    )`

    await dal.execute(sql)

    delete user.password

    const token = auth.generateToken(user)

    return token

}

async function login(credentials: Credentials): Promise<string> {

    const error = credentials.validate()

    if (error) throw new ValidationError(error)

    const sql = `SELECT * from users WHERE
                 userName = '${credentials.userName}' AND
                 password = '${credentials.password}'`

    const result: OkPacket = await dal.execute(sql)

    if (result.fieldCount === 0 || result[0] === undefined) throw new UnAuthorized("Wrong user name or password")

    console.log(result[0])

    delete result[0].password

    const token = auth.generateToken(result[0])

    return token
    
}

export default {
    register,
    login
}