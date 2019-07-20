class Page{
    constructor(){
        this.el = $("#userContainer");
    }
    init(){
        this.createPage();
    }
    createPage(flag){
        if(flag){
            this.Login = new Login(this.el);
        }else{
            this.Register = new Register(this.el);
        }
    }
}

new Page().init();