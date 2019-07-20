class AddGoods {
    constructor(container) {
        this.container = container;
    }
    init() {
        this.createPage();
        this.booksSubmit();
    }
    createPage() {
        this.container.append(AddGoods.template);
    }
    booksSubmit(){
        this.container.find("#books").on("submit",this.handleBooksSubmitCb.bind(this))
    }
    handleBooksSubmitCb(e){
        e.preventDefault();
        
        var booksName = this.container.find("#booksName").val();
        var booksAuth = this.container.find("#booksAuth").val();
        var booksStatus = this.container.find("#booksStatus").val();
        var booksAddress = this.container.find("#booksAddress").val();
        var bookslogo = this.container.find("#booksLogo")[0].files[0];


        // 1、formData  模拟form表单上传
        var formData = new FormData();
        //2、存储需要传递到服务器的数据 第一个参数是一个key值  第二值是你需要传递的参数
        formData.append("booksName",booksName)
        formData.append("booksAuth",booksAuth)
        formData.append("booksStatus",booksStatus)
        formData.append("booksAddress",booksAddress)
        formData.append("bookslogo",bookslogo)


        $.ajax({
            type:"post",
            url:"/books/add",
            data:formData,
            // cache processData contentType这个三个属性如果使用formData+ajax模拟表单上传的时候必须要进行配置
            cache: false,//不读取缓存中的结果 true的话会读缓存  其实post本身就不会读取缓存中的结构
            processData: false,//默认情况下，通过data选项传递进来的数据，如果是一个对象(技术上讲只要不是字符串)，都会处理转化成一个查询字符串，以配合默认内容类型 "application/x-www-form-urlencoded"。如果要发送 DOM 树信息或其它不希望转换的信息，请设置为 false。
            contentType: false,//数据编码格式不使用jquery的方式 为了避免 JQuery 对其操作，从而失去分界符，而使服务器不能正常解析文件。
            success:this.handleBooksSubmitSucc.bind(this)
        })  
    }
    handleBooksSubmitSucc(data){
       if(data.data.status===1){
           alert('添加成功');
            new Page().handleTabBarClick(1);
       }else{
           alert(data.data.info)
       }
    }
}
AddGoods.template = `
    <div class="addGoods">
        <form id="books">
        <div class="form-group">
            <label for="booksName">书籍名称</label>
            <input type="text" class="form-control" id="booksName" placeholder="请输入书名">
        </div>
        <div class="form-group">
            <label for="booksAuth">书籍作者</label>
            <input type="text" class="form-control" id="booksAuth" placeholder="请输入作者">
        </div>
        <div class="form-group">
            <label for="booksStatus">书籍状态</label>
            <input type="text" class="form-control" id="booksStatus" placeholder="请输入状态">
        </div>
        <div class="form-group">
            <label for="booksAddress">书籍地址</label>
            <input type="text" class="form-control" id="booksAddress" placeholder="请输入地址">
        </div>
        <div class="form-group">
            <label for="booksLogo">上传图片</label>
            <input type="file" id="booksLogo">
        </div>
        <button type="submit" class="btn  btn-primary">提交</button>
        </form>
    </div>
`