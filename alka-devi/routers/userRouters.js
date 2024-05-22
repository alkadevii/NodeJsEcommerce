const express = require('express');
const router = express.Router();
const {addUser,login} = require('../controllers/userController.js');


router.post('/',addUser);
router.post('/login',login);

module.exports=router;