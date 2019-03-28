<template>
    <!-- 商标，搜索框，购物车图标 -->
    <div class="page-header">
        <!-- 商标 -->
        <div class="page-header-img">
            <div>
                <a @click="toIndex">
                    <img src="static/img/index/index-1.png" alt="图片被怪物吃掉啦">
                </a>
            </div>
        </div>
        <!-- 搜索框 -->
        <div class="page-header-search">
            <div>
                <Input v-model="value" placeholder="请输入关键字" style="width: 300px" />
                <Button type="primary" icon="ios-search">搜索</Button>
            </div>
            <div class="page-header-search-hot">
                <span>热搜：</span>
            </div>
            <div class="nav-item">
                <ul>
                    <li v-for="(item,index) in nav" :key="index">
                        <a href="#">{{item}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="page-header-car">
            <Button v-if="name == null || name == ''" type="primary" icon="ios-cart-outline" to="/shoppingCart">购物车</Button>
            <Button v-else type="primary" icon="ios-cart-outline" to="/shoppingCart">购物车( {{num}} )</Button>
            <Button style="margin-left: 20px;" to="/order">我的订单</Button>
        </div>
    </div>
</template>

<script scoped>
    import {setCookie,getCookie,clearCookie} from '../../../assets/js/cookie.js'
    export default {
        data(){
            return{
                value: '',
                num: 0,
                name: null,
                // 热搜
                nav:[
                    '流浪地球',
                    '言念君子',
                    '温其如玉'
                ],
            }
        },
        created(){
            var _this = this
            var userId = getCookie('userId')
            var username = getCookie('username')
            _this.name = username
            if(!(userId == '' || userId == null)){
                this.$axios.get('/cart-server/cart/sum/' + userId).then((data)=>{
                    _this.num = data.data.data
                })
            }
            // 根据cookie中用户名查询用户的购物车数
        },
        methods:{
            // 点击图标跳转主页 后期考虑cookie是否需要传用户信息
            toIndex(){
                this.$router.push({path: '/index'});
            }
        }
    }
</script>

<style scoped>
    /* 商标搜索框购物车 */
    .page-header{
        height: 110px;
    }
    /* 商标 */
    .page-header-img{
        float: left;
        margin-left: 100px;
    }
    /* 搜索框 */
    .page-header-search{
        float: left;
        margin-left: 350px;
        padding-top: 30px;
    }
    /* 热搜 */
    .page-header-search-hot{
        height: 30x;
        width: 50px;
        padding-top: 10px;
        float: left;
    }
    .nav-item {
        padding-top: 10px;
        margin: 0px auto;
    }
    .nav-item ul {
        list-style: none;
    }
    .nav-item li {
        float: left;
        margin-left: 5px;
    }
    .nav-item a {
        text-decoration: none;
        color: #555555;
    }
    .nav-item a:hover {
        color: #ff0000;
    }
    /* 购物车 */
    .page-header-car{
        float: left;
        margin-left: 250px;
        padding-top: 30px;
    }
</style>
