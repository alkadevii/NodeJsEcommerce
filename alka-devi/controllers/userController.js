const userRepository = require("../repositories/user.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncHandler = require("../middleware/asynHandler.js"); 
const {createJwt}=require('../utils/jwtHelper.js');
const {compareWithHashedPassword}=require('../utils/passwordHelper.js')

//@desc Create new users
// @route POST/api/v1/users
//@access public
const addUser = asyncHandler(async (req, res, next) => {
    const { name, uname, password } = req.body;
  
    let userNameAlreadyExists=false;
    const users=await userRepository.getUserByUsername(uname);
    if(users && users.length>0){
      return next(new ErrorResponse("Username already taken",404));
    }

    const userId=await userRepository.createUser(name, uname, password); 
    const token= createJwt(userId);
    console.log("userId",userId);
    if (userId){
      res
      .status(201)
      .json({ success: true, message: "Successfully created user",name:name,token: token });
    }
    
});


//@desc user login
// @route POST/api/v1/users/login
//@access public
const login = asyncHandler(async (req, res, next) => {
  const { uname, password } = req.body;

  const users = await userRepository.getUserByUsername(uname);
  if (users && users.length === 0) {
    return next(new ErrorResponse("Invalid Credentials", 400));
  }

  const user = users[0];
  const isValid = compareWithHashedPassword(password, user.password);

  if (isValid) {
    let id = user.id; 
    const token = createJwt(id);
    res.status(200).json({
      message: "Successfully logged in",
      user: { name: user.name, id: user.id },
      token: token
    });
  } else {
    return next(new ErrorResponse("Invalid Credentials", 400));
  }
});



module.exports = {
    addUser,
    login
};