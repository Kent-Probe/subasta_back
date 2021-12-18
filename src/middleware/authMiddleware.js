const { verifyAccessToken } = require('../services/jwt');
const ApiError = require('../utils/ApiError');

function authMiddleware(req, res, next) {
    const accessToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
    try{
        if(accessToken == null || accessToken == ""){
            throw new ApiError("Acseso de token requerido ", 401);
        }
        const user = verifyAccessToken(accessToken);

        if(user._id && user.user){
            console.log("Aqui esta");
        }

        next();
    }catch({ message, statusCode }) {
        res.status(401).json({message:"Acceso del token invalido", tokenSent: accessToken})
    }
}

module.exports = {
    authMiddleware,
};