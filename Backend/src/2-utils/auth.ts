
import Jwt, { JsonWebTokenError } from "jsonwebtoken"
import User from "../3-models/user"
import { UnAuthorized } from "../3-models/client-error"


const secretKey = "tsuriLocalhost"

function generateToken(user: User) {

    const container = { user }

    const token = Jwt.sign(container, secretKey, { expiresIn: "2h" })

    return token

}

function  verifyToken(authHeader: string): Promise<boolean> {

    return new Promise((resolve, reject) => {
        try {

            if (!authHeader) {
                resolve(false)
                return
            }

            const token = authHeader.split(' ')[1]

            if (!token) {
                resolve(false)
                return

            }

            Jwt.verify(token, secretKey, (err, user) => {

                if (err) {
                    resolve(false)
                    return
                }

                resolve(true)
            })

        } catch (error) {

            reject(error)

        }

    })

}

function verifyAdmin(token: string): any {

    return new Promise((resolve, reject) => {

        const payload = Jwt.decode(token)

        resolve(payload)



    })




}



export default {
    generateToken,
    verifyToken,
    verifyAdmin

}