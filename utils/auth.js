const qs = require("querystring")
const jwt = require("jsonwebtoken");
const authToken = (req,res,next)=>{
  let token = qs.parse(req.headers.cookie).token;

  jwt.verify(token,'bk1910',(err)=>{
      console.log(err);
      if(err){
        res.json({
            code:200,
            errMsg:"",
            data:{
                status:0,
                info:"token失效,请重新登陆"
            }
        })
      }else{
          next();
      }
  })

   
}


module.exports = {
    authToken
}