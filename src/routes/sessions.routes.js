import { Router } from "express";
import { login, register } from "../Dao/controllers/sessions.controllers.js";

const sessionsRouter = Router()

sessionsRouter.post('/register', register)
sessionsRouter.post('/login', login)
 
export default sessionsRouter