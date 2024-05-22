const pool = require('../config/db.js');
const userQueries = require('../queries/userQueries.js');
const {hashPassword} =require('../utils/passwordHelper.js');

const createUser = async (name, uname, password) => { 
    const hashedPassword = hashPassword(password);
    return new Promise((resolve, reject) => {
        pool.query(userQueries.addUser, [name, uname, hashedPassword], (error, results) => {
            if (error) {
                reject(error);
            } else {
                console.log(results.rows);
                const userId= results.rows ? results.rows[0].id: undefined;
                resolve(userId);
            }
        });
    });
};
const getUserByUsername = (uname) => {
    return new Promise((resolve,reject) => {
        pool.query(userQueries.getUserByUsername, [uname], (error, results) => {
            if (error){
                reject(error);
            }
            else{
                resolve(results.rows);
            }
        })
    });
}
const getUserByUserId = (userid) => {
    return new Promise((resolve, reject) => {
        pool.query(userQueries.getUserById, [userid], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.rows);
            }
        });
    });
};

const getUserRolesByUserId = (userid) => {
    return new Promise((resolve, reject) => {
        pool.query(userQueries.getUserRolesByUserId, [userid], (error, results) => {
            if (error) {
                reject(error);
            } else {
                console.log(userid);
                resolve(results.rows);
            }
        });
    });
};

module.exports = {
    createUser,
    getUserByUsername,
    getUserByUserId,
    getUserRolesByUserId
};
