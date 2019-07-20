class GoodsDetail{
    constructor(container){
        this.container = container;
    }
    init(){
        this.createPage();
        this.createEditor();
    }
    createPage(){
        this.container.append(GoodsDetail.template);
    }
    createEditor(){
        var E = window.wangEditor
        var editor = new E(this.container.find('#contenteditable')[0])
        editor.customConfig.onchange = function (html) {
            
            console.log(html)
        }
        editor.create()
    }
}
GoodsDetail.template = `
    <div class="infoContainer">   
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
        <div id="contenteditable"></div>
        <button type="submit" class="btn  btn-primary">提交</button>

    </form>
   
    
    </div>
   
`