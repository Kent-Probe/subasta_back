const mongoose = require('mongoose')

//modelo de las subastas
const auctiontSchema = new mongoose.Schema({
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
    },
    username:{
        type : String,
        trim: true,
    }
}, { versionKey: false }) 


const auctiontModel = mongoose.model("auctions", auctiontSchema, "auctions");

//mostrar 
const findAuction = async (username) => {
    const user = await auctiontModel.findOne({
        username: username
    });
    return user;
};

//mostrar todos
const findAuctionAll = async () => {
    const user = await auctiontModel.find({});
    return user;
};

//crear 
const createAuction = async (auction_name, auction_des, auction_DateTime_Finalize, start_amount, winner, img, username) => {
    let date = new Date();
    const user = new auctiontModel({
        img: img,
        auction_name: auction_name,
        auction_des: auction_des,
        auction_DateTime_Now: date,
        auction_DateTime_Finalize: auction_DateTime_Finalize,
        start_Amount: start_amount,
        winner : winner,
        username: username

    }); //estas creando un objeto en mongo debes usar el modelo
    //el schema es solo para establecer los lineamientos de mongo
    await user.save();
};
//actualizar 
const updateAuction = async (auction_id, img, auction_name, auction_des, auction_DateTime_Now, auction_DateTime_Finalize, start_Amount, winner) => {
    const user = await auctiontModel.updateOne(
        { auction_id: auction_id },
        {
            $set: {
                img: img,
                auction_name: auction_name,
                auction_des: auction_des,
                auction_DateTime_Now: auction_DateTime_Now,
                auction_DateTime_Finalize: auction_DateTime_Finalize,
                start_Amount: start_Amount,
                winner : winner
            },
        }
    );
};
const updateAuctionWinner = async (auction_id, winner) => {
    const user = await auctiontModel.updateOne(
        { auction_id: auction_id },
        {
            $set: {
                start_Amount: start_Amount,
                winner : winner
            },
        }
    );
};
//Eliminar 
const deleteAuction = async (auction_id) => {
    const user = await auctiontModel.deleteOne({ auction_id: auction_id });
};


module.exports = {
    findAuction,
    createAuction,
    updateAuction,
    deleteAuction,
    updateAuctionWinner, 
    findAuctionAll
}