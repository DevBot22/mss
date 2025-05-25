import { Router } from "express";
import { deleteUser, getUser, getAllUsers } from "../controllers/user.controller.js";

const userRoutes = Router()

userRoutes.get('/', getAllUsers)
userRoutes.get('/:id', getUser)
userRoutes.delete('/delete-user/:id', deleteUser)



export default userRoutes