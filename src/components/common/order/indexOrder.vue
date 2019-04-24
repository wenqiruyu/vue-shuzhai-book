<template>
    <div class="page-index-order">
        <!-- 头像、用户名、我的收货地址 -->
        <div class="page-header">
            <div class="user-order-face">
                <img src="/static/img/info/face.jpg" alt="图片被怪物吃辣">
            </div>
            <div class="user-order-name">
                <span>吃猫鱼</span>
            </div>
            <div class="user-order-address">
                <a @click="toAddress"><span style="">我的收货地址</span></a>
            </div>
        </div>
        <!-- 分割线 -->
        <div class="page-hr">
            <Divider></Divider>
        </div>
        <!-- 导航列表 -->
        <div class="page-order-bread">
            <Breadcrumb separator="|">
                <BreadcrumbItem to="/">待付款</BreadcrumbItem>
                <BreadcrumbItem to="/">待发货</BreadcrumbItem>
                <BreadcrumbItem to="/">待收货</BreadcrumbItem>
                <BreadcrumbItem to="/">待评价</BreadcrumbItem>
                <BreadcrumbItem></BreadcrumbItem>
            </Breadcrumb>
        </div>
        <!-- 我的物流 待收货列表 -->
        <div class="page-order-content">
            <div class="content-title">
                <div style="float: left;margin-top: 8px;margin-left: 30px;">
                    <span>我的物流</span>
                </div>
            </div>
            <div class="content-detail"  v-for="item in book">
                <Collapse v-model="value">
                    <Panel name="1" hide-arrow>
                        <div style="float: left;">
                            <!-- 订单创建时间 -->
                            <span>{{ item.rankTime }}</span>
                        </div>
                        <div slot="content">
                            <!-- 订单列表 -->
                            <div>
                                <Table ref="selection" :columns="columns" :data="item.order" @on-selection-change="selectRow">
                                    <template slot-scope="{ row, index }" slot="action">
                                        <Button @click="remindDel = true,removeIndex = index">确定收货</Button>
                                    </template>
                                </Table>
                            </div>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                value: [1,2],
                userCart: [],
                order: [],
                book: [],
                allRankTime: [],
                columns:[
                    {
                        title: '商品信息',
                        width: 600,
                        render: (h, params) => {
                            let allBook = params.row.product
                            let allSrc = ''
                            let allTit = ''
                            for(let i = 0, len = allBook.length; i<len; i++){
                                allSrc += params.row.product[i].mainImg
                                allTit += params.row.product[i].name
                            }
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        
                                    }
                                }),
                                h('div',{
                                    attrs:{
                                        style:'color:#31708f;float:left;margin-left:45px;margin-top:15px;margin-bottom:15px;height:90px;width:460px;overflow:hidden;text-overflow:ellipsis '
                                    }
                                },allTit)
                            ]);
                        }
                    },
                    {
                        title: '数量',
                        render: (h, params)=>{
                            return h('div',[
                                h('span',{
                                    attrs:{
                                        style:'color:red;'
                                    }
                                },'￥' +  + '元')
                            ])
                        }
                    },
                    {
                        title: '金额',
                        render: (h, params)=>{
                            let money = params.row.orderMoney.toFixed(2)
                            return h('span',{
                                attrs:{
                                    style:'color:red;'
                                }
                            },'￥' + money + '元')
                        }
                    },
                    {
                        title: '操作',
                        type: 'action',
                        slot: 'action'
                    }
                ]
            }
        },
        props:{
            userId: String,
            requierd: true
        },
        created(){
            this.$axios.get('/order-server/order/group/' + this.userId).then((res) => {
                if(res.data.status == 1){
                    this.order = res.data.data
                    var len = this.order.length
                    for(var i = 0; i<len; i++){
                        if(i == 0){
                            this.allRankTime.push(this.order[i].rankTime)
                        }else if(this.order[i].rankTime != this.order[i-1].rankTime){
                            this.allRankTime.push(this.order[i].rankTime)
                        }
                    }
                    for(var j = 0, tLen = this.allRankTime.length; j<tLen; j++){
                        var rank = []
                        for(var k = 0, oLen = this.order.length; k<oLen; k++){
                            if(this.allRankTime[j] == this.order[k].rankTime){
                                var str = {"orderMoney":this.order[k].orderMoney,"product":this.order[k].product}
                                rank.push(str)
                            }
                        }
                        var result = {"rankTime":this.allRankTime[j],"order":rank}
                        this.book.push(result)
                    }
                    console.log(this.book)
                }
            })
        },
        methods: {
            toAddress(){
                this.$router.push({name: 'info', params: { activeName: 'my-address' }})
            },
            selectRow(){

            }
        }
    }
</script>

<style>
    .page-index-order{
        width: 1060px;
    }
    .user-order-face{
        float: left;
        margin-left: 90px;
        margin-top: 20px;
        width: 70px;
        height: 70px;
    }
    .user-order-face img{
        border-radius: 50%;
        width: 60px;
        height: 60px;
    }
    .user-order-name{
        float: left;
        width: 300px;
        text-align: left;
        font-size: 16px;
        font-weight: bold;
        margin-left: 30px;
        margin-top: 50px;
    }
    .user-order-address{
        float: left;
        margin-top: 50px;
        margin-left: 230px;
        font-size: 14px;
    }
    .page-hr{
        margin-left: 60px;
    }
    .page-order-content{
        float: left;
        margin-top: 30px;
        margin-left: 60px;
    }
    .content-title{
        text-align: left;
        height: 40px;
        width: 1000px;
        font-size: 16px;
        font-weight: bold;
        border-radius: 5px 5px 1px 1px;
        color: #FFFFFF;
        background-color: #FF0036;
    }
    .content-detail{
        margin-top: 2px;
    }
</style>
