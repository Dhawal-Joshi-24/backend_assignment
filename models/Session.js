const mongoose = require('mongoose');
const { Schema } = mongoose;

const sessionSchema = new Schema({

    user_id: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    
    start_time: {
        type: Date,
    },
    end_time: {
        type: Date,
    },
    session_time: {
        type: Number,
    },
   
}, { timestamps: true })


const Session = mongoose.model('Video', sessionSchema);

module.exports = { Session }