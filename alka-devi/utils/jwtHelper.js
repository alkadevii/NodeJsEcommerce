var jwt = require('jsonwebtoken');
var SECRET = "kibup1234";

function createJwt(userId) {
    var token = jwt.sign({ userId: userId }, SECRET); 
    return token;
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        formattedToken = token.replace('Bearer', '');
        jwt.verify(formattedToken, SECRET, (err, decoded) => {
            if (err) return reject({ valid: false, error: err });
            resolve({ valid: true, userid: decoded.userId });
        });
    });
}

module.exports = {
    createJwt,
    verifyToken
};