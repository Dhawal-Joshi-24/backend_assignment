const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoSchema = new Schema({

    title: {
        type:String,
        maxlength:50,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
   
}, { timestamps: true })


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }