
import { Unauthorized } from "../utils/errors"
import errorHandler from "./errorHandler.js"
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export default async function isSignedIn(req, res, next) {
    try {
        const authHeader = req.headers.authorization
    if(!authHeader) {
        console.log('Missing Headers')
        throw new Unauthorized
    }

    const token = authHeader.split(' ')[1]

    const { user } = jwt.verify(token, process.env.TOKEN_SECRET)

    // Handle JsonWebTokenError inside the errorHandler

    const userToVerify = await User.findById()

    if(!userToVerify) {
        console.log('User no longer exists')
        throw new Unauthorized
    }
    
    req.user = userToVerify

    next()
    } catch (error) {
        errorHandler(error, res)
    }
    
}