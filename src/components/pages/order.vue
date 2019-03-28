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
        <div>
            <!-- 待付款 -->
            <div>
                <Divider orientation="left">待付款</Divider>
                <div>

                </div>
            </div>
            <!-- 待发货(付款完成的商品) -->
            <div>
                <Divider orientation="left">待发货</Divider>
                <div>

                </div>
            </div>
            <!-- 运输中 -->
            <div>
                <Divider orientation="left">运输中</Divider>
                <div>

                </div>
            </div>
            <!-- 待收货 -->
            <div>
                <Divider orientation="left">待收货</Divider>
                <div>

                </div>
            </div>
            <!-- 确定收货，已完成的订单 -->
            <div>
                <Divider orientation="left">已完成</Divider>
                <div>

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
    export default {
        components:{
            Header,
            Footer
        },
        data(){
            return{
                // 用户使用搜索框输入的数据
                value: '',
            }
        },
        methods: {
            toIndex(){
                this.$router.push("index")
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
</style>
