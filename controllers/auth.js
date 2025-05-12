import express from 'express'
import User from '../models/user.js'
import errorHandler from '../middleware/errorHandler.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Unauthorized, UnprocessableEntity } from '../utils/errors.js'

const router = express.Router()


// * Routes
router.post('/register', async (req, res) => {
    try {
        if(req.body.password !== req.body.passwordconfirmation) {
            throw new UnprocessableEntity('Passwords do not match', 'password')
        }
        req.body.password = bcrypt.hashSync(req.body.password)

        const user = await User.create(req.body)

        return res.status(201).json({ message: `Welcome ${user.username}` })
    } catch (error) {
        console.log(error.message)
        errorHandler(error, res)
    }
})

router.post('/login', async (req,res) => {
    try {
        const { email, password } = req.body

        // 1. Find user from email
        const userToLogin = await User.findOne({ email })

        // 2. If failed to find, unauthorized
        if(!userToLogin){
            throw new Unauthorized
        }

        // 4. If they don't match, unauthorized
        if(!bcrypt.compareSync(password, userToLogin.password)){
            throw new Unauthorized
        }

        // 5. If theres a match, make a JWT
        const payload = {
            user: {
                _id: userToLogin._id,
                username: userToLogin.username
            }
        }
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '2d'})
        
        // * Send the response
        return res.json({ token })
    } catch (error) {
        errorHandler(error, res)
    }
    
})

export default router