
module.exports = (app, passport) => {
    
    app.use(cors());
    app.get("/credenciales", (req, res) => {
        console.log(req.params);
        console.log(req.body);
    });
};
