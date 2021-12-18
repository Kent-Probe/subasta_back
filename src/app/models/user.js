const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        user_id: {
            type: Number,
            trim: true,
            required: [true, "Es requerido"],
            /*validate : {
            async validator(v){
                const e = await mongoose.model('users').findOne({ id: v });
                return !e;
            },
            message : 'Ya existe un usuario registrado'
        }*/
        },
        name: {
            type: String,
            lowercase: true,
            trim: true,
            required: [true, "Es requerido"],
        },
        username: {
            type: String,
            lowercase: true,
            trim: true,
            required: [true, "Es requerido"],
            /*validate : {
            async validator(v){
                const e = await mongoose.model('users').findOne({ id: v });
                return !e;
            },
            message : 'Ya existe un usuario registrado'
        }*/
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            required: [true, "Es requerido"],
            match: [
                /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
                "Correo electronico no valido",
            ],
        },
        rol: {
            type: String,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            lowercase: true,
            trim: true,
            required: [true, "Es requerido"],
        },
        salt: {
            type: String,
            lowercase: true,
            trim: true,
            required: [true, "Es requerido"],
        }
    },
    { versionKey: false }
);
const userModel = mongoose.model("users", userSchema, "users");
//mostrar Get
const find = async (username, password) => {
    const user = await userModel.findOne({
        username: username,
        password: password,
    });
    console.log(user);
    return user;
};
//crear Post
const create = async (id, nameC, userC, emailC, passwordC, rolC) => {
    const user = new userModel({
        user_id: id,
        name: nameC,
        username: userC,
        email: emailC,
        rol: rolC,
        password: passwordC,
        salt: "uraba",
    }); //estas creando un objeto en mongo debes usar el modelo
    //el schema es solo para establecer los lineamientos de mongo
    await user.save();
};
//actualizar put
const update = async (id, nameC, userC, emailC, rolC, passwordC) => {
    const user = await userModel.updateOne(
        { id: id },
        {
            $set: {
                name: nameC,
                username: userC,
                email: emailC,
                rol: rolC,
                password: passwordC,
            },
        }
    );
};
//Eliminar delete
const deleteUser = async (id) => {
    const user = await userModel.deleteOne({ id: id });
};

module.exports = {
    deleteUser,
    find,
    update,
    create,
    userModel,
};
