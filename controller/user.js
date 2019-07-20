const userModel = require("../model/user")
//jwt 1、引入jwt
const jwt = require("jsonwebtoken");

//加密 1、引入加密模块
const crypto = require('crypto');

const register = (req,res,next)=>{ 
    //获取客户端信息  
    let {username,password} = req.body;
    //查找用户名是否存在
    userModel.userFind({username},(result)=>{
       //如果用户名存在则告诉用户用户名重复
        if(result){
            res.json({
            code:200,
            errMsg:"",
            data:{
                status:2,
                info:"用户名重复"
            }
        })
        }else{
            //加密 2、创建sha256算法
            const hash = crypto.createHash('sha256');
            //加密 3、数据加密
            hash.update(password);

            //加密 4、得到加密后的数据
            //hash.digest('hex')

            //当用户名不存在的时候则进行数据库的保存 顺便告诉用户注册成功
        userModel.userSave({username,password:hash.digest('hex')},(result)=>{
            res.json({
            code:200,
            errMsg:"",
            data:{
                status:1,
                info:"注册成功"
            }
            })
        })
        }
    })    
}


const login = (req,res,next)=>{
    let {username,password} = req.body;
    //查用户名是否存在
    userModel.userFind({username},(result)=>{
        if(result){
             //加密 2、创建sha256算法
             const hash = crypto.createHash('sha256');
             //加密 3、数据加密
             hash.update(password);
 
             //加密 4、得到加密后的数据
             //hash.digest('hex')
            if(result.password == hash.digest('hex')){
                //jwt 2、验证成功后生成一个token值
                let token = jwt.sign({username}, 'bk1910', { expiresIn: '1h' });
                //jwt 3、发送到客户端
                res.cookie("token",token)

                res.json({
                    code:200,
                    errMsg:"",
                    data:{
                        status:1,
                        info:"登陆成功"
                    }
                })
            }else{
                //密码错误
                res.json({
                    code:200,
                    errMsg:"",
                    data:{
                        status:3,
                        info:"密码错误"
                    }
                })
            }

        }else{
            //用户名不存在
            res.json({
                code:200,
                errMsg:"",
                data:{
                    status:2,
                    info:"用户名不存在"
                }
            })
        }
    })

}



const islogin = (req,res)=>{
    let {token} = req.body;

    //验证token
    jwt.verify(token, 'bk1910', function(err, decoded) {
        if(!err){
            res.json({
                code:200,
                errMsg:"",
                data:{
                    status:1,
                    info:"OK"
                }
            })
        }else{
            res.json({
                code:200,
                errMsg:"",
                data:{
                    status:2,
                    info:"token失效"
                }
            })
        }
    });

}
module.exports = {
    register,
    login,
    islogin
}




/*
    sha256(需要加密的数据 + 时间戳 + 加盐(秘钥))

    加密的2种方式
        sha256  加密
        md5  加密  解密


*/