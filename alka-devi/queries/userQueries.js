const addUser = "INSERT INTO users(name, uname, password) VALUES ($1, $2, $3) RETURNING id";
const getUserByUsername = "SELECT id, name, uname, password FROM users WHERE uname = $1";
const getUserById = "SELECT id, name, uname, password FROM users WHERE id = $1";
const getUserRolesByUserId = "SELECT r.name FROM role r INNER JOIN userrole ur ON ur.roleid = r.id WHERE ur.userid = $1";

module.exports = {
    addUser,
    getUserByUsername,
    getUserById,
    getUserRolesByUserId
};