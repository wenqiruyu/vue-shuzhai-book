<template>
    <div class="page-order">
        <div class="page-order-first">
            <Header></Header>
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
                <span>我的订单</span>
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
        <div class="page-center">
            <!-- 侧边栏 -->
            <div class="order-center-menu">
                <Menu active-name="my-info" @on-select="menuSelect">
                    <MenuItem name="index-order">
                        <Icon type="md-document" />
                        全部功能
                    </MenuItem>
                    <MenuItem name="my-cart">
                        <Icon type="md-document" />
                        我的购物车
                    </MenuItem>
                    <MenuItem name="all-order">
                        <Icon type="md-document" />
                        订单详情
                    </MenuItem>
                    <MenuItem name="end-order">
                        <Icon type="md-heart" />
                        已完成订单
                    </MenuItem>
                </Menu>
            </div>
            <div class="order-content">
                <div v-if="selectMenu == 'end-order'">
                    <EndOrder></EndOrder>
                </div>
                <div v-else-if="selectMenu == 'not-confirm-order'">
                    <NotOrder></NotOrder>
                </div>
                <div v-else-if="selectMenu == 'all-order'">
                    <AllOrder></AllOrder>
                </div>
                <div v-else>
                    <IndexOrder :userId="userId"></IndexOrder>
                </div>
            </div>
        </div>
        <div>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
    import Header from '../common/header'
    import Footer from '../common/footer'
    import IndexOrder from '../common/order/indexOrder.vue'
    import AllOrder from '../common/order/allOrder'
    import NotOrder from '../common/order/notOrder.vue'
    import EndOrder from '../common/order/endOrder.vue'
    import {setCookie,getCookie,clearCookie} from '../../assets/js/cookie.js'
    export default {
        components:{
            Header,
            Footer,
            IndexOrder,
            AllOrder,
            NotOrder,
            EndOrder
        },
        data(){
            return{
                // 用户使用搜索框输入的数据
                userId: null,
                value: '',
                selectMenu: '',
            }
        },
        created(){
            this.userId = getCookie("userId")
        },
        methods: {
            toIndex(){
                this.$router.push("index")
            },
            menuSelect(name){
                this.selectMenu = name
                if(name == 'my-cart'){
                    this.$router.push("shoppingCart")
                }
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
        margin-left: 70px;
    }
    /* 搜索框 */
    .page-header-search{
        float: left;
        margin-left: 360px;
        margin-top: 35px;
    }
    /* 分割线 */
    .cart-hr{
        height:1px;
        margin-bottom: 5px;
        border:none;
        border-top:3px solid  #515A6E;
    }

    .page-center{
        margin-top: 60px;
        height: 900px;
    }
    .order-center-menu{
        float: left;
        height: 850px;
        margin-left: 30px;
    }
    .order-content{
        float: left;
        margin-left: 30px;
        width: 1120px;
    }
</style>
