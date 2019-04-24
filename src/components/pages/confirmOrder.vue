<template>
    <!-- 确定订单 -->
    <div class="page-confirmorder">
        <div class="common-header">
            <common-header></common-header>
        </div>
        <div class="order-header">
            <!-- 商标 -->
            <div class="order-img">
                <a @click="toIndex">
                    <img src="/static/img/index/index-1.png" alt="图片被怪物吃掉啦">
                </a>
            </div>
            <!-- 订单确定字样 -->
            <div class="order-title">
                <span>确认订单</span>
            </div>
            <!-- 搜素框 -->
            <div class="order-search">
                <div>
                    <Input v-model="value" placeholder="请输入关键字" style="width: 300px" />
                    <Button type="primary" icon="ios-search">搜索</Button>
                </div>
            </div>
        </div>
        <div class="order-hr">
            <hr/>
        </div>
        <div class="order-content">
            <div class="order-content-step">
                <!-- 步骤条 -->
                <div class="page-content-step">
                    <Steps :current="1" v-bind:status="cartStatus">
                        <Step title="我的购物车" v-bind:content="cartErrorMsg"></Step>
                        <Step title="填写订单"></Step>
                        <Step title="完成订单" v-bind:content="orderErrorMsg"></Step>
                    </Steps>
                </div>
            </div>
            <div class="order-content-header" id="address">
                <!-- 选择收货地址 -->
                <div class="order-address-title">
                    <span>选择收货地址：</span>
                </div>
                <div class="order-address">
                    <div class="order-show-address">
                        <!-- 地址列表 -->
                        <div v-if="address == null || address.length == 0">
                            <div style="margin-left: 500px;">
                                <span style="font-size: 16px;color: #FF0036;font-weight: bold;">你还未设置收货地址哦</span>
                            </div>
                        </div>
                        <div v-else class="order-address-card" v-for="(item,index) in address">
                            <div class="order-show-card" :class="{ active:index==isActive }" @click="checkCard(index)">
                                <Card style="height: 160px;">
                                    <p slot="title"><span style="color:#FF0036;">收货人：</span>{{item.consigneeName}} <span style="color:#FF0036;">手机号：</span>{{item.consigneePhone}}</p>
                                    <p> <span style="color:#FF0036;">地区：</span>{{item.provinces}}</p>
                                    <p> <span style="color:#FF0036;">详细地址：</span>{{item.detail}}</p>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="order-new-address">
                    <div class="order-new-address-href">
                        <a @click="toAddress">管理收货地址</a>
                    </div>
                </div>
            </div>
            <!-- 确认订单信息 -->
            <div class="order-content-body-title">
                <div style="text-align:left;">
                    <span>确认订单信息:</span>
                </div>
                <div class="order-content-body">
                    <Table v-if="userCart.length < 3" ref="selection" :columns="columns" :data="userCart"></Table>
                    <Table v-else height="402" ref="selection" :columns="columns" :data="userCart"></Table>
                </div>
                <!-- 商品合计 -->
                <div class="order-content-moneySum">
                    <div style="float:left;margin-left:480px;width:180px;margin-top:18px;">
                        <span>书斋优惠：<span style="color:red;">免运费</span></span>
                    </div>
                    <div style="float:left;margin-left:230px;width:230px;margin-top:10px;">
                        <span>商品合计:<span style="color:red;font-size:22px;">￥{{sumProduct}}</span></span>
                    </div>
                </div>
            </div>
            <div class="order-content-pay">
                <div class="order-content-pay-sub">
                    <div class="order-content-pay-title" style="text-align: center;font-weight: bold;">
                        <span style="font-size:16px;">请再次确认收货信息</span>
                    </div>
                    <!-- 实付款 -->
                    <div class="order-content-pay-show" style="margin-top:5px;font-size:18px;">
                        <span style="color:#999999;">实付款：<span style="color:red;font-size:22px;font-weight: bold;">￥{{sumProduct}}</span></span>
                    </div>
                    <div v-if="address == null || address.length == 0" style="text-align: center;margin-bottom:15px;margin-top:15px;font-size:18px;">
                        <Anchor>
                            <AnchorLink href="#address" title="请设置收货地址" />
                        </Anchor>
                    </div>
                    <div v-else  style="font-size:14px;">
                        <!-- 收货地址 -->
                        <div class="order-content-pay-address" style="margin-top:8px;">
                            <div>
                                <span>寄送至：{{ chooseAddress.provinces}}</span>
                            </div>
                            <div>
                                <span> {{chooseAddress.detail}}</span>
                            </div> 
                        </div>
                        <!-- 收货人 -->
                        <div class="order-content-pay-name" style="margin-top:8px;">
                            <span>收货人：{{chooseAddress.consigneeName}} {{chooseAddress.consigneePhone}}</span>
                        </div>
                    </div>
                    <div style="margin-top:8px;">
                        <div style="float: right;"> 
                            <Button v-if="isActive == -1" v-on:click="toPay" type="error" disabled>提交订单</Button>
                            <Button v-else v-on:click="toPay" type="error">提交订单</Button>
                        </div>
                        <div style="float: right;font-size:16px;margin-top:4px;margin-right:90px;">
                            <a @click="toCart"><Icon type="ios-undo" />返回购物车</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="common-footer">
            <common-footer></common-footer>
        </div>
    </div>
</template>

<script>
    import {setCookie,getCookie,clearCookie} from '../../assets/js/cookie.js'
    import CommonHeader from '../common/header'
    import CommonFooter from '../common/footer'
    export default {
        data(){
            return{
                columns:[
                    {
                        title: '商品信息',
                        width: 630,
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: params.row.product.mainImg,
                                        style:'float:left;width:54px;height:54px;border-radius:2px;margin-top:30px;margin-bottom:10px;margin-left:30px;'
                                    }
                                }),
                                h('div',{
                                    attrs:{
                                        style:'color:#31708f;float:left;margin-left:45px;margin-top:15px;margin-bottom:15px;height:90px;width:460px;overflow:hidden;text-overflow:ellipsis '
                                    }
                                },params.row.product.name + '  -  ' + params.row.product.subtitle)
                            ]);
                        }
                    },
                    {
                        title: '单价',
                        width: 180,
                        render: (h, params)=>{
                            return h('span',{
                                attrs:{
                                    style:'color:red;'
                                }
                            },'￥' + params.row.product.price + '元')
                        }
                    },
                    {
                        title: '数量',
                        width: 150,
                        render: (h, params)=>{
                            var self = this
                            return h('span',{
                                attrs: {
                                        attrs:{
                                            style:'color:red;'
                                        }
                                    }
                            },(params.row.quantity == null ? 1 : params.row.quantity))
                        }
                    },
                    {
                        title: '小计',
                        width: 180,
                        render: (h, params)=>{
                            let money = (params.row.product.price*params.row.quantity).toFixed(2)
                            return h('span',{
                                attrs:{
                                    style:'color:red;'
                                }
                            },'￥' + (isNaN(money) ? params.row.product.price : money) + '元')
                        }
                    }
                ],
                // 用于判断是否立即购买
                isNowBuy:false,
                userCart: [],
                isActive: -1,
                value:'',
                label:'1',
                // 步骤条状态
                cartStatus:'process',
                cartErrorMsg:'',
                orderErrorMsg:'',
                user:{
                    'id':null,
                    'name':null
                },
                currentIndex:null,
                address: [],
                // 选中的地址
                chooseAddress: null,
                // 商品总额
                sumProduct: 0,
            }
        },
        components:{
            CommonHeader,
            CommonFooter
        },
        created(){
            var _this = this;
            _this.address = []
            // 获取用户cookie
            _this.user.id = getCookie('userId')
            _this.user.name = getCookie('username')
            var product = _this.$route.query.product
            if(product == null){
                this.isNowBuy = true
                // 由此判定该页面跳转不是使用购物车进行跳转过来的，是通过直接购买按钮来的，直接购买需要对用户进行是否登录拦截
                var bookDeail = _this.$route.query.bookDeail
                // 对直接购买数据进行封装成json
                var product = {"product" : JSON.parse(bookDeail)}
                _this.userCart.push(product)
                _this.sumProduct = _this.userCart[0].product.price.toFixed(2)
            }else{
                // 获取购物车页面传递的数据
                _this.userCart = JSON.parse(product)
                // 获取订单付款的总额
                let len = _this.userCart.length
                for(var i = 0; i < len; i++){
                    _this.sumProduct += _this.userCart[i].quantity*_this.userCart[i].product.price
                }
                _this.sumProduct = _this.sumProduct.toFixed(2)
            }
            _this.$axios.get('/user-server/user/address/' +  _this.user.id).then((data)=>{
                var address = data.data
                _this.address = address.data.slice()
                // 获得默认地址
                let len = _this.address.length
                for(var i = 0; i < len; i++){
                    if(_this.address[i].status == 0){
                        _this.chooseAddress =JSON.parse(JSON.stringify(_this.address[i]))
                        _this.isActive = i
                    }
                }
            })
        },
        methods: {
            toCart(){
                this.$router.push('shoppingCart')
            },
            toIndex(){
                this.$router.push({path: '/index'});
            },
            checkCard(index){
                this.isActive = index
                this.chooseAddress = JSON.parse(JSON.stringify(this.address[index]))
            },
            toAddress(){
                this.$router.push({name: 'info', params: { activeName: 'my-address' }})
            },
            toPay(){
                // 用户进行付款操作 获取商品信息 收货地址
                if(this.isNowBuy){
                    // 立即购买的商品
                    this.$axios.post('/order-server/order',{
                        userId: this.user.id,
                        productId: this.userCart[0].product.id,
                        addressId: this.chooseAddress.id,
                        quantity: 1,
                        orderMoney: this.sumProduct
                    }).then((data) => {
                        console.log(data.data)
                        var data = data.data
                        if(data.status == 1){
                            this.$Notice.success({
                                title: '提示',
                                desc: '正在跳转支付页面哦'
                            })
                            // let routeUrl = this.$router.resolve({
                            //     path: "/pay",
                            //     query: { htmls:data.msg }
                            // })
                            // window.open(routeUrl .href, '_blank')
                            const div = document.createElement('div')
                            div.innerHTML = data.msg //此处form就是后台返回接收到的数据
                            document.body.appendChild(div)
                            document.forms[0].submit()
                        }
                    })
                }else{
                    var cartId = ''
                    for(var i = 0, len = this.userCart.length; i<len; i++){
                        if(i == len-1){
                            cartId += this.userCart[i].id
                        }else{
                            // 购物车id
                            cartId += this.userCart[i].id + ','
                        }
                    }
                    this.$axios.post('/order-server/order',{
                        userId: this.user.id,
                        cartId: cartId,
                        addressId: this.chooseAddress.id,
                        orderMoney: this.sumProduct
                    }).then((data) => {
                        console.log(data.data)
                        var data = data.data
                        if(data.status == 1){
                            this.$Notice.success({
                                title: '提示',
                                desc: '正在跳转支付页面哦'
                            })
                            // let routeUrl = this.$router.resolve({
                            //     path: "/pay",
                            //     query: { htmls:data.msg }
                            // })
                            // window.open(routeUrl .href, '_blank')
                            const div = document.createElement('div')
                            div.innerHTML = data.msg //此处form就是后台返回接收到的数据
                            document.body.appendChild(div)
                            document.forms[0].submit()
                        }
                    })
                }           
            }
        }
    }
</script>

<style scoped>
    .order-header{
        clear: both;
        height: 110px;
    }
    .order-img{
        float: left;
        margin-left: 100px;
    }
    .order-title{
        font-size: 20px;
        float: left;
        font-weight: bold;
        color: #2D8CF0;
        margin-top: 35px;
        margin-left: 90px;
    }
    .order-search{
        float: left;
        margin-top: 40px;
        margin-left: 330px;
    }
    /* 分割线 */
    .order-hr{
        height:1px;
        margin-bottom: 5px;
        border:none;
        border-top:3px solid  #515A6E;
    }
    .order-content-step{
        width: 1275px;
        height: 60px;;
    }
    .page-content-step{
        float: left;
        clear: both;
        width: 800px;
        margin-left: 400px;
        margin-top: 30px;
    }
    .order-content{
        margin-top: 30px;
        margin-left: 120px;
        margin-right: 120px;
        margin-bottom: 30px;
        width: 84%;
        float: left;
        outline: 4px solid #F9F9F9;
    }
    .order-content-header{
        float: left;
        clear: both;
    }
    /* 收货地址 */
    .order-address-title{
        font-size: 16px;
        float: left;
        margin-left: 30px;
        margin-top: 15px;
        color: #999999;
    }
    .order-address{
        width: 1200px;
        clear: both;
        float: left;
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
    }
    .order-show-address{
        float: left;
    }
    .order-address-card{
        float: left;
        margin-top: 15px;
        margin-left: 40px;
        width:360px;
    }
    .order-show-card{
        float: left;
        text-align: left;
        width: 370px;
        margin-left: 15px;
    }
    .order-new-address{
        margin-top: 5px;
        margin-left: 35px;
        float: left;
        width: 95%;
    }
    .order-new-address-href{
        margin-top: 20px;
        float: right;
        margin-right: 120px;
    }
    .order-content-body-title{
        font-size: 16px;
        float: left;
        margin-left: 20px;
        margin-top: 30px;
        color: #999999;
    }
    /* 付款商品列表 */
    .order-content-body{
        margin-top: 15px;
        margin-left: 30px;
        float: left;
    }
    /* 商品合计 */
    .order-content-moneySum{
        height: 60px;
        width: 91%;
        margin-top: 3px;
        margin-left: 30px;
        border-radius: 5px;
        float: left;
        background-color: #F3FAFF;
    }
    /* 分割线 */
    /* 付款按钮区域 */
    .order-content-pay{
        border-radius: 1px;
        box-shadow: 0 0 0 3px #FF0036;
        /* outline: 2px solid #FF0036; */
        margin-top: 30px;
        margin-right: 75px;
        margin-bottom: 20px;
        float: right;
    }
    .order-content-pay-sub{
        margin: 15px;
        float:right;
        text-align: right;
    }
    .common-footer{
        clear: both;
    }
    .active{
        border-radius: 1px;
        box-shadow: 0 0 0 3px #FF0036;
    }
</style>