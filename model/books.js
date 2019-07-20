const mongoose = require("../utils/database").mongoose;

const Books = mongoose.model("book",{
    booksName:String,
    booksAuth:String,
    booksStatus:String,
    booksAddres:String,
    bookslogo:String
})

//增
const addBooks = (booksInfo,cb)=>{
    let books = new Books(booksInfo);
    books.save().then((result)=>{
        cb(result)
    })
}

//查
const booksFind = (booksInfo,cb)=>{
    let {page,limit} = booksInfo;
    Books.find().skip((page-1)*limit).limit(Number(limit)).then((result)=>{
        cb(result)
    })
}

//改
const booksUpdate = (booksId,booksInfo,cb)=>{
    Books.update(booksId,{$set:booksInfo}).then((result)=>{
        cb(result)
    })
}

module.exports = {
    addBooks,
    booksFind,
    booksUpdate
}