import { Router } from "express";
import { deleteUser, getUser, getAllUsers } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const userRoutes = Router()

userRoutes.get('/', protect, authorizeRoles('admin'), getAllUsers)
userRoutes.get('/:id', getUser)
userRoutes.delete('/delete-user/:id', protect, authorizeRoles('admin'), deleteUser)



export default userRoutes