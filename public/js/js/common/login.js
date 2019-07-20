class Login{
    constructor(container){
        this.container = container;
        this.init();
    }
    init(){
        this.createPage();
        this.togglePage();
        this.loginClick();
    }
    createPage(){
        this.container.html("");
        this.container.append(Login.template)
    }
    togglePage(){
        this.container.find("#js_togglePage").on("click",this.handleToggleCb.bind(this))
    }
    handleToggleCb(){
        new Page().createPage(false);
    }
    loginClick(){
        this.container.find("#login").on("submit",this.handleLoginCb.bind(this))
    }
    handleLoginCb(e){
        e.preventDefault();
        let username = this.container.find("#login_username").val();
        let password = this.container.find("#login_password").val();
       
        $.ajax({
            type:"post",
            url:"/users/login",
            data:{
                username,
                password
            },
            success:this.handleLoginSucc.bind(this)
        })
    }
    handleLoginSucc(data){
        if(data.data.status == 1){
            alert('登陆成功');
            location.href="http://localhost:3000/html/home.html"
        }else{
            alert(data.data.info)
        }
    }
}

Login.template = `
<div class="logo">
    <img src="https://cas.1000phone.net/cas/images/login/logo.png"/>
    </div>
    <form id="login">
    <div class="form-group">
    <label for="login_username">用户名</label>
    <input type="text" class="form-control" id="login_username" placeholder="请输入用户名">
    </div>
    <div class="form-group">
    <label for="login_password">密码</label>
    <input type="password" class="form-control" id="login_password" placeholder="请输入密码">
    </div>
    <p class="text-primary info" id="js_togglePage">还没有账号？立即注册</p>
    <button type="submit" class="btn btn-primary userBtn">登陆</button>
</form>
`
