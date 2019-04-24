<template>
    <!-- 购物车页 -->
    <div class="page-cart">
        <div class="common-header">
            <common-header></common-header>
        </div>
        <div class="page-header">
            <!-- 商标 -->
            <div class="page-header-img">
                <div>
                    <a @click="toIndex">
                        <img src="static/img/index/index-1.png" alt="图片被怪物吃掉啦">
                    </a>
                </div>
            </div>
            <div class="page-header-title">
                <span>购物车</span>
            </div>
            <!-- 搜索框 -->
            <div class="page-header-search">
                <div>
                    <Input v-model="value" placeholder="请输入关键字" style="width: 300px" />
                    <Button type="primary" icon="ios-search">搜索</Button>
                </div>
            </div>
        </div>
        <div class="cart-hr">
            <hr></hr>
        </div>
        <div class="page-content">
            <!-- 步骤条 -->
            <div class="page-content-step">
                <Steps :current="0" v-bind:status="cartStatus">
                    <Step title="我的购物车" v-bind:content="cartErrorMsg"></Step>
                    <Step title="填写订单"></Step>
                    <Step title="完成订单" v-bind:content="orderErrorMsg"></Step>
                </Steps>
            </div>
            <!-- 购物车商品展示 -->
            <div class="page-content-books">
                <!-- 判断购物车是否有数据 -->
                <div v-if="userCart.length == 0" class="page-content-msg">
                    <!-- 判断用户是否登录 -->
                    <div v-if="user.name == '' || user.name == null">
                        <div class="page-content-msg-img">
                            <!-- 空购物车图片 -->
                            <img src="static/img/cart/empty-cart.png" alt="图片被怪物吃掉啦">
                        </div>
                        <div class="page-content-msg-title">
                            <div>
                                <span>您的购物车是空的，您可以：</span>
                            </div>
                            <div class="page-content-msg-title-button">
                                <Button to="/login">登录</Button>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="page-content-msg-img">
                            <!-- 空购物车图片 -->
                            <img src="static/img/cart/empty-cart.png" alt="图片被怪物吃掉啦">
                        </div>
                        <div class="page-content-msg-title">
                            <div>
                                <span>您的购物车是空的，您可以：</span>
                            </div>
                            <div class="page-content-msg-title-button">
                                <Button to="/index">去逛逛</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="page-content-books">
                    <!-- 购物车数少于三个商品 -->
                    <div class="content-book-table">
                        <Table v-if="userCart.length < 3" ref="selection" :columns="columns" :data="userCart" @on-selection-change="selectRow">
                            <template slot-scope="{ row, index }" slot="action">
                                <Button @click="remindDel = true,removeIndex = index">删除</Button>
                                <Modal v-model="remindDel" width="360">
                                    <p slot="header" style="color:#f60;text-align:center">
                                        <Icon type="ios-information-circle"></Icon>
                                        <span>删除购物车</span>
                                    </p>
                                    <div style="text-align:center">
                                        <p>您确定要删除该商品吗？</p>
                                    </div>
                                    <div slot="footer">
                                        <Button size="large" type="error" @click="remove">确定</Button>
                                        <Button size="large" @click="back">返回</Button>
                                    </div>
                                </Modal>
                            </template>
                        </Table>
                        <Table v-else height="402" ref="selection" :columns="columns" :data="userCart" @on-selection-change="selectRow">
                            <template slot-scope="{ row, index }" slot="action">
                                <Button @click="remindDel = true,removeIndex = index">删除</Button>
                                <Modal v-model="remindDel" width="360">
                                    <p slot="header" style="color:#f60;text-align:center">
                                        <Icon type="ios-information-circle"></Icon>
                                        <span>删除购物车</span>
                                    </p>
                                    <div style="text-align:center">
                                        <p>您确定要删除该商品吗？</p>
                                    </div>
                                    <div slot="footer">
                                        <Button size="large" type="error" @click="remove">确定</Button>
                                        <Button size="large" @click="back">返回</Button>
                                    </div>
                                </Modal>
                            </template>
                        </Table>
                    </div>
                    <!-- 结算区域 -->
                    <div class="page-content-pay">
                        <div class="page-content-pay-sub">
                            <div class="page-content-pay-allRemove">
                                <Button @click="isShowAllRemove">批量删除</Button>
                            </div>
                            <Modal v-model="remindAllDel" width="360">
                                <p slot="header" style="color:#f60;text-align:center">
                                    <Icon type="ios-information-circle"></Icon>
                                    <span>批量删除购物车</span>
                                </p>
                                <div style="text-align:center">
                                    <p>您确定要删除这些商品吗？</p>
                                </div>
                                <div slot="footer">
                                    <Button size="large" type="error" @click="allRemove">确定</Button>
                                    <Button size="large" @click="back">返回</Button>
                                </div>
                            </Modal>
                            <div class="page-content-pay-remind">
                                <span>您已经选择了<span style="color:red;">{{bookNum}}</span>件商品</span>
                            </div>
                            <div class="page-content-pay-moneyNum">
                                <span>总计：<span style="color:red;font-size:18px;">￥{{priceNum}}</span></span>
                            </div>
                            <div class="page-content-pay-topay">
                                <Button type="primary" @click="topay">结算</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-footer">
            <common-footer></common-footer>
        </div>
        <div>
            <back-top></back-top>
        </div>
    </div>
</template>

<script>
    import {setCookie,getCookie,clearCookie} from '../../assets/js/cookie.js'
    import CommonHeader from '../common/header'
    import CommonFooter from '../common/footer'
    import BackTop from '../common/index/backTop'
    export default {
        data(){
            return{
                columns:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '商品信息',
                        width: 600,
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: params.row.product.mainImg,
                                        style:'float:left;width:54px;height:54px;border-radius:2px;margin-top:30px;margin-bottom:10px;'
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
                        render: (h, params)=>{
                            var self = this
                            return h('div',[
                                h('InputNumber',{
                                    props: {
                                        value:params.row.quantity,
                                        max:10,
                                        min:1
                                    },
                                    on:{
                                        'on-change':(event)=>{
                                            params.row.quantity = event
                                            self.updateQuantity(params.index,event)
                                        }
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: '金额',
                        render: (h, params)=>{
                            let money = (params.row.product.price*params.row.quantity).toFixed(2)
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
                ],
                value:'',
                // 步骤条状态
                cartStatus:'process',
                cartErrorMsg:'',
                orderErrorMsg:'',
                user:{'id':null,'name':null},
                // 用户购物车商品数量
                userCart:[],
                showCart:true,
                // 提示用户购物件数
                bookNum: 0,
                // 用户勾选书本的总价
                priceNum: 0,
                // 删除
                remindDel: false,
                // 删除的索引
                removeIndex: -1,
                // 批量删除
                remindAllDel:false
            }
        },
        components:{
            CommonHeader,
            CommonFooter,
            BackTop
        },
        created(){
            var _this = this;
            // 获取用户cookie
            _this.user.id = getCookie('userId')
            _this.user.name = getCookie('username')
            _this.priceNum = _this.priceNum.toFixed(2)
            if(_this.user.id != null && _this.user.id != ''){
                _this.$axios.get('/cart-server/cart/' + _this.user.id).then((data)=>{
                var data = data.data
                // 判断是否返回错误
                if(data.status == 0){
                    _this.cartErrorMsg = data.msg;
                    _this.cartStatus = 'error'
                }else if(data == null){
                    // 判断购物车是否为空
                    _this.showCart = false
                }else{
                    _this.userCart = data.data
                }
            })
            }
        },
        methods:{
            // 比较函数
            sortNumbers(a,b){
                return b-a;
            },
            // 数组降序
            sortArray(arr){
                return arr.sort(this.sortNumbers);
            },
            // 点击图标跳转主页 后期考虑cookie是否需要传用户信息
            toIndex(){
                this.$router.push({path: '/index'});
            },
            remove(){
                // 用户删除，进行友好提示
                this.remindDel = false
                var item = this.removeIndex
                var id = this.userCart[item].id
                // 用户删除，进行对后台的更新
                this.$axios.delete('/cart-server/cart/' + id).then((data)=>{
                    var data = data.data
                    if(data.status = 1){
                        // 成功删除，进行对购物车数据进行更新
                        this.$Notice.success({
                            title: '提示',
                            desc: data.msg
                        })
                        this.userCart.splice(item,1)
                    }else{
                        this.$Notice.error({
                            title: '提示',
                            desc: data.msg
                        })
                    }
                })
            },
            isShowAllRemove(){
                // 用户进行批量删除操作,进行提示
                var arr = this.$refs.selection.getSelection()
                // 判断用户是否进行勾选
                if(arr.length == 0){
                    this.$Notice.error({
                        title: '请勾选您想删除的商品',
                        // desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
                    });
                    return 
                }
                this.remindAllDel = true
            },
            allRemove(){
                this.remindAllDel = false
                var arr = this.$refs.selection.getSelection()
                var idArr = ''
                for(var i = 0,len = arr.length; i < len; i++){
                    if(i == len -1){
                        idArr += arr[i].id
                    }else{
                        idArr += arr[i].id + ',' 
                    }
                }
                // 将id数组进行给后台
                this.$axios.delete('/cart-server/cart',{
                    params:{
                        allId:idArr
                    }
                }).then((data)=>{
                    var data = data.data
                    // 删除成功
                    if(data.status == 1){
                        this.bookNum = 0
                        this.priceNum = 0
                        // 根据id进行批量删除
                        var removeAllIndex = []
                        for(var i = 0, len = arr.length; i < len; i++){
                            // 将购物车id和userCart的id进行比对，确定勾选的索引
                            for(var j = 0, item = this.userCart.length; j < item; j++){
                                if(arr[i].id == this.userCart[j].id){
                                    removeAllIndex.push(j)
                                }
                            }
                        }
                        this.sortArray(removeAllIndex)
                        // 将勾选的购物车进行删除
                        for(var k = 0,ind = removeAllIndex.length;k < ind;k++){
                            this.userCart.splice(removeAllIndex[k],1)
                        }
                        this.$Notice.success({
                            title: '提示',
                            desc: data.msg
                        })
                    }else{
                        this.$Notice.error({
                            title: '提示',
                            desc: data.msg
                        })
                    }
                })
            },
            // 结算
            topay(){
                // 判断用户是否进行勾选商品
                // 用户进行批量删除操作,进行提示
                var arr = this.$refs.selection.getSelection()
                // 判断用户是否进行勾选
                if(arr.length == 0){
                    this.$Notice.error({
                        title: '请勾选您要购买的商品',
                        // desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
                    });
                    return 
                }
                // localStorage.setItem('product-to-order' , arr)
                // 跳转填写订单
                this.$router.push({path: 'confirmOrder', query:{product:JSON.stringify(arr)}})
                // this.$router.push({name: 'confirmOrder', params:{product:arr}})
            },
            selectRow(selection){
                // selection表示已选项 遍历
                this.bookNum = 0
                this.priceNum = 0
                for(var i = 0, len = selection.length; i < len; i++){
                    this.bookNum += selection[i].quantity
                    this.priceNum += selection[i].quantity*selection[i].product.price
                }
                this.priceNum = this.priceNum.toFixed(2)
            },
            updateQuantity(item, value){
                var chooseCart = this.userCart[item]
                // 用户对书本数量进行了更新，需要对后台数据库进行更新
                this.$axios.put('/cart-server/cart',{
                    id: chooseCart.id,
                    quantity: value
                }).then((data)=>{
                    var data = data.data
                    if(data.status == 0){
                        // 进行错误提示
                        this.$Notice.error({
                            title: '提示',
                            desc: data.msg
                        });
                    }
                })
                this.userCart[item].quantity = value
            },
            back(){
                this.remindDel = false
            }
        }
    }
</script>

<style scoped>
    .page-header{
        clear: both;
        height: 110px;
    }
    .page-header-img{
        float: left;
        margin-left: 100px;
    }
    .page-header-title{
        font-size: 20px;
        float: left;
        font-weight: bold;
        color: #2D8CF0;
        margin-top: 35px;
        margin-left: 90px;
    }
    /* 搜索框 */
    .page-header-search{
        margin-top: 10px;
    }
    /* 分割线 */
    .cart-hr{
        height:1px;
        margin-bottom: 5px;
        border:none;
        border-top:3px solid  #515A6E;
    }
    /* 购物车商品展示 */
    .page-content-books{
        float: left;
        margin-top: 10px;
    }
    /* 购物车表格 */
    .content-book-table{
        float: left;
        margin-top: 15px;
        margin-left: 60px;
        width: 1150px;
    }
    /* 商品结算区域 */
    .page-content-pay{
        float: left;
        margin-top: 10px;
        margin-left: 60px;
        width: 1150px;
        height: 55px;
        background-color: #F9F9F9;
        border-radius: 4px;
    }
    .page-content-pay-sub{
        margin-top: 11px;
    }
    /* 批量删除按钮 */
    .page-content-pay-allRemove{
        float: left;
        margin-left: 10px;
    }
    /* 用户购买数量进行提示 */
    .page-content-pay-remind{
        float: left;
        margin-left: 180px;
        width: 200px;
        margin-top: 5px;
        font-size: 14px;
    }
    /* 用户购买商品所需总价格 */
    .page-content-pay-moneyNum{
        float: left;
        width: 240px;
        margin-left: 240px;
        font-size: 14px;
    }
    /* 付款按钮 */
    .page-content-pay-topay{
        float: left;
        margin-left: 90px;
    }
    /* 数据为空 提示信息 */
    .page-content-msg{
        margin-top: 60px;
    }
    .page-content-msg-img{
        height: 200px;
        width: 200px;
        margin-left: 350px;
        float: left;
    }
    .page-content-msg-title{
        margin-left: 120px;
        margin-top: 30px;
        font-size: 15px;
        color: #999999;
        float: left;
    }
    .page-content-msg-title-button{
        margin-top: 15px;
        float: left;
    }
    /* 步骤条等正文 */
    .page-content{
        clear: both;
        height: 600px;
        outline: 4px solid #F9F9F9;
        margin-top: 30px;
        margin-left: 120px;
        margin-right: 120px;
    }
    .page-content-step{
        float: left;
        clear: both;
        width: 800px;
        margin-left: 400px;
        margin-top: 30px;
    }
    /* 底部 */
    .page-footer{
        clear: both;
        margin-top: 30px;
    }
</style>
