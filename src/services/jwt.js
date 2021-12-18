const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; //Asigo la llave secreta

/**
 * 
 * 
 * @param {Number} id user_id
 * @returns {String}
 */
function generateAccessToken(id, user) {
    return jwt.sign({id, user}, JWT_SECRET, {expiresIn: '1d'})
}

/**
 * 
 * 
 * @param {String} token
 * @returns {{ id: Number }}
 */

function verifyAccessToken(token) {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    generateAccessToken,
    verifyAccessToken
}