import express from 'express'
import morgan from 'morgan'
import 'dotenv/config'
import mongoose from 'mongoose'

const app = express()
const port = process.env.PORT


// * Middleware
app.use(morgan('dev'))


// * Router


// * 404 Route
app.use('/{*any}', (req, res) => {
    return res.status(404).json({message: 'Route not found'})
})


// * Connect to servers
const startServers = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('DB connection established')
        app.listen(port, () => console.log(`Server running on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
startServers()