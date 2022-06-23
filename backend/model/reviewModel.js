const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: email,
        require: true
    },
    saveForNext: boolean,
    review: {
        type: String,
        require: true,
    }
})

const reviewModel = mongoose.model('reviewModel', reviewSchema);
module.exports = reviewModel;
