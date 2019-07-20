class Register {
    constructor(container) {
        this.container = container;
        this.init();
    }
    init() {
        this.createPage();
        this.togglePage();
        this.registerClick();
    }
    createPage() {
        this.container.html("");
        this.container.append(Register.template)
    }
    togglePage(){
        this.container.find("#js_togglePage").on("click",this.handleToggleCb.bind(this))
    }
    handleToggleCb(){
        new Page().createPage(true);
    }
    registerClick(){
      
    
        this.container.find("#register").on("submit",this.handleRegisterCb.bind(this))
    }
    handleRegisterCb(e){
        e.preventDefault();
        let username = this.container.find("#register_username").val();
        let password = this.container.find("#register_password").val();
        
        $.ajax({
            type:"post",
            url:"/users/register",
            data:{
               username,
               password
            },
            success:this.handleRegisterSucc.bind(this)
        })
    }
    handleRegisterSucc(data){
      if(data.data.status == 1){
          alert("注册成功")
        new Page().createPage(true);
      }else{
          alert(data.data.info);
      }
    }
}

Register.template = `
<div class="logo">
    <img src="https://cas.1000phone.net/cas/images/login/logo.png"/>
    </div>
    <form id="register">
    <div class="form-group">
    <label for="register_username">用户名</label>
    <input type="text" class="form-control" id="register_username" placeholder="请输入用户名">
    </div>
    <div class="form-group">
    <label for="register_password">密码</label>
    <input type="password" class="form-control" id="register_password" placeholder="请输入密码">
    </div>
    <p class="text-primary info" id="js_togglePage">已有账号,立即登陆</p>
    <button type="submit" class="btn btn-primary userBtn">注册</button>
</form>
`