const { verifyToken } = require('../utils/jwtHelper');
const { getUserRolesByUserId } = require('../repositories/user.js');

const verifyTokenHandler = async (req, res, next) => {
    try {
        // Retrieve token from HTTP header
        let token = req.headers['authorization'];
        if (token && token.includes('Bearer')) {
            // Verify if token is valid
            const result = await verifyToken(token);
            const userid = result.userid;
            req.userid = userid;
            return next();
        } else {
            res.status(401).json({ message: "No token provided" });
        }
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).json({ message: "Invalid token" });
    }
};
const verifyRoles = (roles) => {
    return async (req, res, next) => {
        try {
            const userid = req.userid;
            const userRoles = await getUserRolesByUserId(userid);
            console.log("User roles:", userRoles);
            let hasRole = false;
            for (let userRole of userRoles) {
                if (roles.includes(userRole.name)) {
                    hasRole = true;
                    break;
                }
            }
            if (hasRole) {
                next(); 
            } else {
                res.status(403).json({ message: "You don't have permission" });
            }
        } catch (error) {
            console.error("Error verifying user roles:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
};

module.exports = {
    verifyTokenHandler,
    verifyRoles
};