import express from 'express'
import Activity from '../models/activity.js'
import isSignedIn from '../middleware/isSignedIn'
import errorHandler from '../middleware/errorHandler'
import { Forbidden, NotFound } from '../utils/errors.js'

const router = express.Router()

// * Routes

// Index
router.get('/activities', async (req,res) => {
    try {
        const activities = await Activity.find()
        return res.json(activities)
    } catch (error) {
        
    }
})

// Create
router.post('/activities', isSignedIn, async (req, res) => {
    try {
        req.body.user = req.user._id
        const activity = await Activity.create(req,body)
        return res.status(201).json(activity)
    } catch (error) {
        errorHandler(error, res)
    }
})

// Show
router.get('/activities/:activityId', async (req,res) => {
    try {
        const { activityId } = req.params
        const activity = await Activity.findById(activityId)
        return res.json(activity)
    } catch (error) {
        errorHandler(error, res)
    }
})

// Update
router.put('/activities/:activityId', isSignedIn, async (req, res) => {
    try {
        const { activityId } = req.params
        const activity = await Activity.findById(activityId)

        if(!activity) throw new NotFound('Activity not found')
        if(!activity.owner.equals(req.user._id)) throw new Forbidden()

        const updatedActivity = await Activity.findByIdAndUpdate(activityId, req.body, { new: true })
        return res.json(updatedActivity)
    } catch (error) {
        errorHandler(error, res)
    }
})

// Delete
router.delete('/activities/:activityId', isSignedIn, async (req, res) => {
    try {
        const { activityId } = req.params
        const activity = await Activity.findById(activityId)

        if(!activity) throw new NotFound('Activity not found')
        if(!activity.owner.equals(req.user._id)) throw new Forbidden()

        await Activity.findbyIdAndDelete(activityId)
        return res.sendStatus(204)
    } catch (error) {
        errorHandler(error, res)
    }
})



export default router