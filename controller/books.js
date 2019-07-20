const booksModel = require("../model/books")
const path = require("path");
const add = (req,res)=>{
    //通过formData提交的数据 其中文本信息存放在body中  文件信息存放在files中
    let img_url ='http://localhost:3000/img/'+path.parse( req.files.bookslogo[0].path).base;
    let {booksName,booksAuth,booksStatus,booksAddress} = req.body;

    //存
    booksModel.addBooks({booksName,booksAuth,booksStatus,booksAddress,bookslogo:img_url},(data)=>{
        if(data){
            res.json({
                code:200,
                errMsg:"",
                data:{
                    status:1,
                    info:"添加成功"
                }
            })
        }else{
            res.json({
                code:200,
                errMsg:"",
                data:{
                    status:0,
                    info:"添加失败"
                }
            })
        }
    })
    
}


const getBooks = (req,res)=>{
    let {page,limit} = req.query;
    booksModel.booksFind({page,limit},(result)=>{
        if(result.length>0){
            res.json({
                code:200,
                errMsg:"",
                data:{
                    status:1,
                    info:"OK",
                    list:result
                }
            })
        }else{
            res.json({
                code:200,
                errMsg:"",
                data:{
                    status:0,
                    info:"暂无数据"
                }
            })
        }
    })

}


const update = (req,res,next)=>{
     //通过formData提交的数据 其中文本信息存放在body中  文件信息存放在files中
     let img_url ='http://localhost:3000/img/'+path.parse( req.files.bookslogo[0].path).base;
     let {booksName,booksAuth,booksStatus,booksAddress,id} = req.body;
     console.log(booksName,booksAuth,booksStatus,booksAddress,id,img_url)


     booksModel.booksUpdate({_id:id},{booksName,booksAuth,booksStatus,booksAddress,bookslogo:img_url},(data)=>{
         
         if(data.nModified){
            res.json({
                code:200,
                errMsg:"",
                data:{
                    status:1,
                    info:"修改成功"
                }
            })
         }else{
            res.json({
                code:200,
                errMsg:"",
                data:{
                    status:0,
                    info:"修改失败"
                }
            })
         }
     })
}

module.exports = {
    add,
    getBooks,
    update
}


//http://localhost:3000/img/1.jpg