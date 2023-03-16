const mongoose = require('mongoose');
const { Schema } = mongoose;

const userVideoSchema = new Schema({

    user_id: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    video_id: {
        type:Schema.Types.ObjectId,
        ref: 'Videos'
    },
    watch_time: {
        type: Number,
    },
    watch_count: {
        type: Number,
    },
   
}, { timestamps: true })


const UserVideo = mongoose.model('Video', userVideoSchema);

module.exports = { UserVideo }