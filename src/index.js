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

const { find, deleteUser, update, create, userModel } = require("./app/models/user");

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
//app.use(flash());

//routes
require("./app/routes/routes")(app, passport);

app.use(cors());


app.post("/credenciales", async (req, res) => {
    const data = await find(req.body.nombreu, req.body.password)
    console.log(req.body);
    console.log(data)
    res.send(data)
});

app.post("/registrar", (req, res) => {
    console.log(req.body)
    create(req.body.id, req.body.name, req.body.username, req.body.email, req.body.password, 'externo')
    res.send('todo bien brooo')
});
//static fields
//app.use(express.static())

app.listen(app.get("port"), () => {
    console.log("server activo en ", app.get("port"));

    //create();
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
