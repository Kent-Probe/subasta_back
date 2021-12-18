const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        unique : true,
        trim : true,
        required : [true, 'Es requerido'], 
        validate : {
            async validator(v){
                const e = await mongoose.model('users').findOne({ user_id: v });
                return !e;
            },
            message : 'Ya existe un usuario registrado'
        } 
    },
    name: {
        type:String,
        unique : true,
        lowercase : true,
        trim : true,
        required : [true, 'Es requerido'],
    },
    username: {
        type:String,
        unique : true,
        lowercase : true,
        trim : true,
        required : [true, 'Es requerido'],  
        validate : {
            async validator(v){
                const e = await mongoose.model('users').findOne({ user_id: v });
                return !e;
            },
            message : 'Ya existe un usuario registrado'
        }
    },
    email: {
        type:String,
        unique : true,
        lowercase : true,
        trim : true,
        required : [true, 'Es requerido'],
        match : [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Correo electronico no valido']  
    },
    rol: {
        type:String,
        unique : true,
        lowercase : true,
        trim : true,
        required : [true, 'Es requerido'],  
    },
    password: {
        type:String,
        unique : true,
        lowercase : true,
        trim : true,
        required : [true, 'Es requerido'],  
    },
    salt: {
        type:String,
        unique : true,
        lowercase : true,
        trim : true,
        required : [true, 'Es requerido'],  
    },
}, { versionKey : false});

const userModel = mongoose.model('users', userSchema)

//mostrar Get
const find = async(username, password) => {
    const user = await userModel.findOne({username:username, password: password})
    console.log(user)
    return user;
}


//crear Post
const create = async(id, nameC, userC, emailC, rolC, passwordC) =>{
    const user = new userModel({
        user_id: id,
        name: nameC,
        username: userC,
        email: emailC,
        rol: rolC,
        password: passwordC,
        salt: 'uraba',       
    });
    const reslt = await user.save();
}
//actualizar put
const update = async(id, nameC, userC, emailC, rolC, passwordC) => {
    const user = await userModel.updateOne({user_id:id},{
        $set:{
            name: nameC,
            username: userC,
            email: emailC,
            rol: rolC,
            password: passwordC
        }
    });
}
//Eliminar delete
const deleteUser = async(id) =>{
    const user = await userModel.deleteOne({user_id:id})
}


module.exports = {
    deleteUser,
    find,
    update,
    create,
    userModel
}