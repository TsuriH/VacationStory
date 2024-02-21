import express from "express"
import CatchAll from "../src/4-middlewears/catch-all"
import vacationsController from "./6-controllers/vacations-controller"
import authController from "../src/6-controllers/auth-controller"
import vacationFollowers from "../src/6-controllers/vacations-followers-controller"
import fileUpload from "express-fileupload"
import cors from "cors"
import { RouteNotFound } from "./3-models/client-error"
import routeNotFoundMiddleWare from "./4-middlewears/route-not-found"

const server = express()

server.use(fileUpload())

server.use(cors())

server.use(express.json())

server.use("/1-assets", express.static((__dirname + '/1-assets')))

server.use("/api/auth", authController)

server.use("/api/vacation-followers", vacationFollowers)

server.use("/api/vacations", vacationsController)

server.use("*", routeNotFoundMiddleWare)

server.use(CatchAll)

server.listen(4004, () => console.log("Connected to localhost:4004"))

