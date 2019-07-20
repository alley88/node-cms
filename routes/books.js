const express = require("express");
const router = express.Router();
const authToken = require("../utils/auth.js").authToken;
const booksController = require("../controller/books")
//multer 1、引入multer
const multer = require("multer");

//multer 2、配置
var storage = multer.diskStorage({
    //将客户端的图片存放在服务器的哪个位置(在实际工作当中会有一个专门处理图片的服务器)
    destination: function (req, file, cb) {
      cb(null, './public/img')
    },
    //将客户端的图片进行名字的更改
    filename: function (req, file, cb) {
      cb(null,Date.now()+'-'+file.originalname)
    }
  })
//multer 3、将配置项应该到multer中
var upload = multer({ storage: storage })

//multer 4、设置bookslogo最多能传递多少张图片
var cpUpload = upload.fields([{ name: 'bookslogo', maxCount: 1 }])




//添加书籍
router.post("/add",authToken,cpUpload,booksController.add)

//获取书籍
router.get("/getBooks",authToken,booksController.getBooks)

//更新书籍
router.post("/update",authToken,cpUpload,booksController.update)
module.exports = router;