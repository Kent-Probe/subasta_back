const express = require("express");
const app = express();

//Modulos requeridos
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');

//base de datos
const { url } = require("./config/database");

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true, //por ahora
    })
    .then(() => console.log("Conectado a MongoDB Atlas"))
    .catch((error) => console.log(`A occurrido un error: ${error}`));

const { findUserU, findUserAll, findUser, deleteUser, update, create, userModel } = require("./app/models/user");
const { findAuctionAll, findAuction, deleteAuction, updateAuction, createAuction, updateAuctionWinner } = require('./app/models/auction')

//seetings
app.set("views", "localhost:3000");
app.set("port", process.env.PORT || 8080);
app.set("view engine", "react");

//middlewers
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    session({
        secret: "holaGuapo:v",
        resave: false,
        saveUninitialized: false,
    })
    );
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
//app.use(flash());

//routes
require("./app/routes/routes")(app, passport);

app.post('/productos', async (req, res) => {
    const data = await findAuctionAll();
    res.send(data)
})

app.post("/credenciales", async (req, res) => {
    const data = await findUser(req.body.nombreu, req.body.password);
    if (data === null){
        data = await findUserU(req.body.nombreu);
    }
    res.send(data);
});

app.post('/obtenerUser', async (req, res) => {
    const data = await findUser(req.body.nombreu)
})

app.post("/registrar", (req, res) => {
    console.log(req.body)
    create(req.body.id, req.body.name, req.body.username, req.body.email, req.body.password, 'externo')
    res.send('todo bien brooo')
});
//static fields
//app.use(express.static())

app.listen(app.get("port"), async () => {
    console.log("server activo en ", app.get("port"));
    
    //console.log( await findUserAll())
    //create(1, 'prueba 1A', 'prueba1a', 'prueba1A@gmail.com', 'password', 'interno')
    //update(1000810902, 'Jhon boyner franco', 'jhonBoy', 'JhonBoy0012@gmail.com', 'interno', 'yaNoEsContras')
    //deleteUser(1000810902)
    //find('jhonBoy');
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
