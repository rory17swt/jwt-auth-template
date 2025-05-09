import express from 'express'
import User from '../models/user.js'
import errorHandler from '../middleware/errorHandler.js'
import bcrypt from 'bcryptjs'

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
    
})










export default router