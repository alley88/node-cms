class Home{
    constructor(container){
        this.container = container;
    }
    init(){
        this.createPage();
    }
    createPage(){
        this.container.append(Home.template);
        this.echartsInit();
    }
    echartsInit(){
         // 基于准备好的dom，初始化echarts实例
         var myChart = echarts.init(this.container.find("#echarts")[0]);

         // 指定图表的配置项和数据
         var option = {
            title : {
                text: '1910后台管理系统',
                subtext: '访客访问信息'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['访问量','订单量','评论数']
            },
            toolbox: {
                show : true,
                feature : {
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['1月','2月','3月','4月','5月']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'访问量',
                    type:'bar',
                    data:[99,87,109,333,675],
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    
                },
                {
                    name:'订单量',
                    type:'bar',
                    data:[1000,897,567,342,1190],
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    }
                },
                {
                    name:'评论数',
                    type:'bar',
                    data:[1088,564,443,876,632],
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    }
                }
            ]
        };
 
         // 使用刚指定的配置项和数据显示图表。
         myChart.setOption(option);
    }
}
Home.template = `
   <div class="echarts_container">
   <div class="home_info">
        <div>
            <h2>访问量</h2>
            <span>899</span>
        </div>
        <div>
             <h2>订单量</h2>
             <span>765</span>
        </div>
        <div>
            <h2>评论数</h2>
            <span>1799</span>
        </div>
    </div>
        <div id="echarts" style="width: 960px;height:400px;"></div>
   </div>
`