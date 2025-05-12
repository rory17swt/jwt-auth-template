import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true
    },
    description: { 
        type: String, 
        required: true
    },
    duration: { 
        type: Number, 
        required: true
    },
    location: { 
        type: String, 
        required: true
    },
    tags: {
        String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true}
})

const Activity = mongoose.model('Activity', activitySchema)
export default Activity