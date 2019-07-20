var express = require('express');
var router = express.Router();
const userController = require("../controller/user")

//注册接口
router.post('/register', userController.register);

//登陆接口
router.post('/login', userController.login);

//验证是否登陆
router.post('/islogin', userController.islogin);
module.exports = router;
