<template>
    <!-- 分类商品展示页面 -->
    <div class="markets">
        <!-- 页面头部 -->
        <div class="markets-header">
            <common-header></common-header>
        </div>
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
                    <Input v-model="searchValue" placeholder="请输入关键字" style="width: 300px" />
                    <Button @click="toSearch" type="primary" icon="ios-search">搜索</Button>
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
                <Button v-if="user.name == null || user.name == ''" type="primary" icon="ios-cart-outline" to="/shoppingCart">购物车</Button>
                <Button v-else type="primary" icon="ios-cart-outline" to="/shoppingCart">购物车( {{num}} )</Button>
                <Button style="margin-left: 20px;" to="/order">我的订单</Button>
            </div>
        </div>
        <div>
            <index-menu></index-menu>
        </div>
        <!-- 添加一个动态的面包屑 -->
        <div class="markets-breadcrumb">
            <Breadcrumb separator=">">
                <div class="markets-breadcrumb-title">
                    <BreadcrumbItem to="/">图书</BreadcrumbItem>
                </div>
                <div class="markets-breadcrumb-title">
                    <BreadcrumbItem to="/">电子书</BreadcrumbItem>
                </div>
                <div class="markets-breadcrumb-title">
                    <BreadcrumbItem to="/">网络文学</BreadcrumbItem>
                </div>
                <div class="markets-breadcrumb-title">
                    <BreadcrumbItem to="/">电子产品</BreadcrumbItem>
                </div>
                <div class="markets-breadcrumb-title">
                    <BreadcrumbItem to="/">电子产品</BreadcrumbItem>
                </div>
                <div class="markets-breadcrumb-title">
                    <BreadcrumbItem to="/">电子产品</BreadcrumbItem>
                </div>
                <div class="markets-breadcrumb-title">
                    <BreadcrumbItem to="/">电子产品</BreadcrumbItem>
                </div>
            </Breadcrumb>
        </div>
        <!-- 分类商品展示区 -->
        <div class="markets-content" v-for="(book,index) in books">
            <div class="markets-content-book" :class="{ active:index==isActive }" v-on:mouseover="showBack(index)" v-on:mouseout="hideBack(index)">
                <!-- 商品主图展示 -->
                <div class="book-img">
                    <a @click="clickBookName(book.id)"><img v-bind:src="book.mainImg" alt="图片被怪物吃掉啦"></a>
                </div>
                <div class="book-content">
                    <!-- 图书书名及副标题 -->
                    <div class="book-name">
                        <div class="book-name-title">
                            <span><a @click="clickBookName(book.id)">{{book.name}} {{book.subtitle}}</a></span>
                        </div>
                    </div>
                    <p style="clear: both;"></p>
                    <!-- 作者 -->
                    <div class="book-author">
                        <span><a @click="clickBookAuthor(book.author)">{{book.author}}</a></span>
                        <span>/{{book.publishDate}}/{{book.press}}</span>
                    </div>
                    <p style="clear: both;"></p>
                    <!-- 价格 -->
                    <div class="book-price">
                        <span class="book-price-new">￥{{book.price}}</span>
                        <span class="book-price-old">定价：￥{{book.pricing}}</span>
                    </div>
                    <p style="clear: both;"></p>
                    <!-- 评分 图书评论数 -->
                    <div class="book-grade">
                        <Rate show-text allow-half disabled v-bind:value="book.grade">
                            <span style="color: #f5a623;font-size:14px">{{book.grade}}</span>
                        </Rate>
                        <span style="color: #f5a623;font-size:14px">{{book.grade}}评分</span>
                        <a href=""><span style="margin-left:20px;font-size:14px;">{{book.commentNum}}条评论</span></a>
                    </div>
                    <p style="clear: both;"></p>
                    <!-- 介绍 -->
                    <div class="book-detail">
                        <span>{{book.detail}}</span>
                    </div>
                    <p style="clear: both;"></p>
                    <!-- 加入购物车按钮 -->
                    <div class="book-button">
                        <Button v-on:click="toCart(book)">加入购物车</Button>
                        <Button v-on:click="clickPay(book.id)">立即购买</Button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 图书分页 -->
        <div class="markets-page">
            <page :total="100" show-elevator/>
        </div>
        <!-- 页面尾部 -->
        <div class="markets-footer">
            <common-footer></common-footer>
        </div>
    </div>
</template>

<script>
    import {setCookie,getCookie,clearCookie} from '../../assets/js/cookie.js'
    import CommonHeader from '../common/header'
    import CommonFooter from '../common/footer'
    import IndexMenu from '../common/index/indexMenu'
    export default {
        data(){
            return{
                // 搜索框部分等的使用的data
                searchValue: '',
                num: 0,
                // 热搜
                nav:[
                    '流浪地球',
                    '言念君子',
                    '温其如玉'
                ],
                // 页面上使用的data
                isActive: -1,
                background:{"background-color":"#FFFFFF"},
                // 评分
                valueCustomText:'3.8',
                user:{'id':null,'name':null},
                books:[],
            }
        },
        components:{
            CommonHeader,
            CommonFooter,
            IndexMenu
        },
        created(){
            var _this = this
            // 获取用户cookie
            _this.user.id = getCookie('userId')
            _this.user.name = getCookie('username')
            // 获取分类id   
            var search = this.$route.query.search
            if(search == undefined){
                search = ''
            }
            // 根据cookie中用户名查询用户的购物车数
            if(!(_this.user.id == '' || _this.user.id == null)){
                this.$axios.get('/cart-server/cart/sum/' + _this.user.id).then((data)=>{
                    _this.num = data.data.data
                })
            }
            _this.$axios.get('/product-server/product/search', {
                params:{
                    search: search
                }
            }).then((data)=>{
                var books = data.data;
                // 数组拷贝
                _this.books = books.data.slice();
            })
        },
        methods:{
            // 跳转图书详情页
            clickBookName(id){
                this.$router.push({path: '/goodsDetail', query: { bookId: id }});
            },
            // 跳转根据作者分类页面
            clickBookAuthor(author){

            },
            showBack(index){
                this.isActive = index
            },
            hideBack(index){
                this.isActive = -1
            },
            // 加入购物车
            toCart(book){
                var _this = this;
                // 判断用户cookie是否存在，不存在跳转登录页面
                if(_this.user.id == '' || _this.user.id == null || _this.user.name == '' || _this.user.name == null){
                    this.$router.push({path:'/login'});
                }else{
                    this.$axios.post('/cart-server/cart',{
                        userId:_this.user.id,
                        bookId:book.id,
                        // 添加购物车本数
                        bookNum:1,
                        bookName: book.name,
                        author: book.author,
                        price: book.price

                    }).then((data)=>{
                        var data = data.data
                        if(data.status == 1){
                            // 进行购物车数更新
                            // this.num += 1
                            this.$Notice.success({
                                title: '提示',
                                desc: data.msg
                            })
                        }else{
                            this.$Notice.error({
                                title: '提示',
                                desc: data.msg
                            });
                        }
                    })
                }
            },
            // 点击立即购买
            clickPay(id){
                this.$router.push({path: '/confirmOrder', query: { bookDeail: JSON.stringify(this.books[id]) }});
            },
            // 点击图标跳转主页 后期考虑cookie是否需要传用户信息
            toIndex(){
                this.$router.push({path: '/index'});
            },
            toSearch(){
                this.$axios.get('/product-server/product/search', {
                    params:{
                        search: this.searchValue
                    }
                }).then((data)=>{
                    var books = data.data;
                    // 数组拷贝
                    this.books = books.data.slice();
                })
                if(this.searchValue == null || this.searchValue == ''){
                    this.$router.push({name: 'search'})
                }else{
                    this.$router.push({path: '/search',query: {search : this.searchValue}})
                }
            }
        }
    }
</script>

<style scoped>
    /* 动态面包屑 */
    .markets-breadcrumb{
        height: 20px;
        margin-left: 40px;
        margin-top: 20px;
    }
    .markets-breadcrumb-title{
        float: left;
        margin-left: 10px;

    }
    /* 商品展示 */
    .markets-content{
        width: 1459px;
        margin-right: 30px;
        margin-left: 30px;
        float: left;
        clear: both;
    }
    .markets-content-book{
        height: 240px;
        margin-top: 30px;
    }
    .book-img{
        float: left;
        margin-left: 30px;
        margin-top: 30px;
    }
    /* 作者名简介等内容区 */
    .book-content{
        width: 1219px;
        float: left;
        margin-left: 30px;
        margin-top: 30xp;
    }
    .book-name{
        float: left;
        margin-top: 30px;
        font-size: 15px;
        clear: both;
        width: 85%;
    }
    .book-name-title{
        /* 文字向左显示 */
        text-align:left;
        font-weight: bold;
        /* 超出的内容进行隐藏 */
        overflow: hidden;
        /* 设置内容不换行 */
        white-space: nowrap;
        /* 设置超出内容为省略号 */
        text-overflow: ellipsis;
    }
    .book-author{
        float: left;
        margin-top: 5px;
    }
    .book-price{
        margin-top: 5px;
        margin-left: 5px;
        float: left;
    }
    .book-price-new{
        font-size: 16px;
        font-weight: bold;
        color: #FF2832;
    }
    .book-price-old{
        margin-left: 20px;
        /* 删除线 */
        text-decoration: line-through;
        color: #969696;
    }
    /* 评分 */
    .book-grade{
        float: left;
        margin-left: 5px;
    }
    /* 详情 */
    .book-detail{
        float: left;
        height: 50px;
        font-size: 16px;
    }
    .book-button{
        margin-top: 5px;
        float: left;
    }
    /* 图书分页 */
    .markets-page{
        float: left;
        margin-top:30px;
        margin-left: 550px;
    }
    /* 尾部 */
    .markets-footer{
        padding-top: 30px;
        clear: both;
    }
    .active{
        background-color: #F1F3F4;
    }

    /* 搜索部分 */
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
