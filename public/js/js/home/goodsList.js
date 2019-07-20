class GoodsList{
    constructor(container){
        this.container = container;
    }
    init(){
        this.createPage();
        this.getBooks();
        this.modifyBooks();
    }
    createPage(){
        this.container.append(GoodsList.template);
    }
    getBooks(){
        $.ajax({
            type:"get",
            url:"/books/getBooks",
            data:{
                page:1,
                limit:5
            },
            success:this.handleGetBooksSucc.bind(this)
        })
    }
    handleGetBooksSucc(data){
      
        var list = data.data.list;
        var str = "";
        if(!list){
            alert(data.data.info);
            location.href="http://localhost:3000"
            return;
        }
        for(var i=0;i<list.length;i++){
            str += `
            <div class="books_item">
            <div class="thumbnail">
                <img src=${list[i].bookslogo} style="width:105px;height:130px">
                <div class="caption">
                    <h3>${list[i].booksName}</h3>
                    <p>${list[i].booksAuth}</p>
                    <p>${list[i].booksStatus}</p>
                    <p>${list[i].booksAddress?list[i].booksAddress:'起点'}</p>
                    <p>
                        <a href="#" class="btn btn-primary updateBtn" data-toggle="modal" data-target="#myModal">更新</a> 
                        <a href="#" class="btn btn-default">下架</a>
                    </p>
                </div>
            </div>
        </div>
            `
        }
        this.container.find(".books_list").html("");
        this.container.find(".books_list").append(str);
        this.updateBooks(list);
    }
    updateBooks(list){
       $.each(this.container.find(".updateBtn"),this.handleUpdateEach.bind(this,list))
    }
    handleUpdateEach(list,index){
        this.container.find(".updateBtn").eq(index).on("click",index,this.handleUpdateBooksCb.bind(this,list))
    }
    handleUpdateBooksCb(list,e){
        let index = e.data;
        let books = list[index];
       
        //赋值
       var booksName = $("#modify_booksName");
       var booksAuth = $("#modify_booksAuth");
       var booksStatus = $("#modify_booksStatus");
       var booksAddress = $("#modify_booksAddress");
       var modify_books = $("#modify_books");
        booksName.val(books.booksName);
        booksAuth.val(books.booksAuth);
        booksStatus.val(books.booksStatus);
        booksAddress.val(books.booksAddress);
        modify_books.attr("data-id",books._id);
    }
    modifyBooks(){
        $("#modifyBtn").on("click",this.handleModifyBooksCb.bind(this))
    }
    handleModifyBooksCb(e){
        e.preventDefault();
        
       var booksName = $("#modify_booksName").val();
       var booksAuth = $("#modify_booksAuth").val();
       var booksStatus = $("#modify_booksStatus").val();
       var booksAddress = $("#modify_booksAddress").val();
       var bookslogo = $("#modify_booksLogo")[0].files[0];
       var id = $("#modify_books").attr('data-id');

        
        // 1、formData  模拟form表单上传
        var formData = new FormData();
        //2、存储需要传递到服务器的数据 第一个参数是一个key值  第二值是你需要传递的参数
        formData.append("booksName",booksName)
        formData.append("booksAuth",booksAuth)
        formData.append("booksStatus",booksStatus)
        formData.append("booksAddress",booksAddress)
        formData.append("bookslogo",bookslogo)
        formData.append("id",id)

        $.ajax({
            type:"post",
            url:"/books/update",
            data:formData,
            // cache processData contentType这个三个属性如果使用formData+ajax模拟表单上传的时候必须要进行配置
            cache: false,//不读取缓存中的结果 true的话会读缓存  其实post本身就不会读取缓存中的结构
            processData: false,//默认情况下，通过data选项传递进来的数据，如果是一个对象(技术上讲只要不是字符串)，都会处理转化成一个查询字符串，以配合默认内容类型 "application/x-www-form-urlencoded"。如果要发送 DOM 树信息或其它不希望转换的信息，请设置为 false。
            contentType: false,//数据编码格式不使用jquery的方式 为了避免 JQuery 对其操作，从而失去分界符，而使服务器不能正常解析文件。
            success:this.handleBooksSubmitSucc.bind(this)
        })  

    }
    handleBooksSubmitSucc(data){
        if(data.data.status){
            alert("修改成功");
            $('#myModal').modal('hide')
            this.getBooks();
        }else{
            alert(data.data.info)
        }
    }
}
GoodsList.template = `
    <div class="row books_list">
        
    </div>
    
`