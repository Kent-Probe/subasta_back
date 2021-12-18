const mongoose = require('mongoose')

const auctiontSchema = new mongoose.Schema({
    auction_id : {
        type : Number,
        unique : true,
        trim: true,
        required: [true, "Es requerido"]
    },
    img: {
        type : String,
        trim: true,
        required: [true, "Es requerido"]

    },
    auction_name : {
        type : String,
        trim: true,
        required: [true, "Es requerido"]
    },
    auction_des : {
        type : String,
        trim: true,
        required: [true, "Es requerido"]
    },
    auction_DateTime_Now : {
        type : Date,
        default : Date.now,
        trim: true,
        required: [true, "Es requerido"]
    },
    auction_DateTime_Finalize : {
        type : Date,
        trim: true,
        required: [true, "Es requerido"]
    },
    start_Amount : {
        type : Number,
        trim: true,
        default : 100000,
    },
    winner : {
        type : String,
        trim: true,
    }
}, { versionKey: false }) 

