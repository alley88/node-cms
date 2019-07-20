class Page{
    constructor(){
        this.tabBar = $(".main_tabBar>ul>li");
        this.container = $(".main_container")
        this.init()
    }
    init(){
        this.togglePage();
        this.handleTabBarClick(0);
    }
    togglePage(){
        $.each(this.tabBar,this.handleTabBarEach.bind(this));
    }
    handleTabBarEach(index){
        this.tabBar.eq(index).on("click",index,this.handleTabBarClick.bind(this))
    }
    handleTabBarClick(params){
        var index;
        if(typeof params == 'object'){
            index = params.data;
        }else{
            index = params;
        }
        this.tabBar.eq(index).addClass("active").siblings().removeClass('active');
        this.container.html("")
        switch(index){
            case 0:
                new Home(this.container).init();
                break;
            case 1:
                new GoodsList(this.container).init();
                break;
            case 2:
                new AddGoods(this.container).init();
                break;
            case 3:
                new GoodsDetail(this.container).init();
                break;
        }
    }
}

new Page();