const mongoose = require("../utils/database.js").mongoose;

let User = mongoose.model("user",{
    username:String,
    password:String
})

//查
const userFind = (userInfo,cb)=>{
    User.findOne(userInfo).then((result)=>{
        cb(result);
    })
}
//增
const userSave = (userInfo,cb)=>{
    let user = new User(userInfo);

    user.save().then((result)=>{
        cb(result);
    })
}


module.exports = {
    userFind,
    userSave
}