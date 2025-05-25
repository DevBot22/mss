import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"


//User signup
export const userSignup = async (req, res, next) => {
    try {
        const {name, email, password, role} = req.body

        const existingUser = await User.findOne({email})

        if(existingUser) {
            return res.status(400).json({message: 'Email is already used'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({name, email, password: hashedPassword, role})
        await user.save()
        
        res.status(201).json({message: 'User registered successfully', user})
    } catch (error) {
        next(error)
    }
}

//User login
export const userLogin = async (req, res, next) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user) {
            return res.status(404).json({message: 'Invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(404).json({message: 'Invalid credentials'})
        }

        const token = jwt.sign(
            {userId: user._id, role: user.role},
            process.env.JWT_SECRET_KEY,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        )

        res.status(200).json(
               {
                message: 'Login successful',
                token,
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }, {token}
        )

    } catch (error) {
        next(error)
    }
}