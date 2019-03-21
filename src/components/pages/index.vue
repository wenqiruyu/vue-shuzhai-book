<template>
    <div class="page-index">
        <div class="page-nav">
        <!-- 图钉 将导航固定在顶部 -->
            <common-header></common-header>
        </div>
        <!-- 商标，搜索框，购物车图标 -->
        <div class="page-index-header">
            <index-header></index-header>
        </div>
        <!-- 分类导航 -->
        <div class="page-index-menu">
            <index-menu></index-menu>
        </div>
        <!-- 商品分类，轮播图广告 热卖商品 考虑使用layout 抛弃使用layout-->
        <div class="nav-body">
            <!-- 侧边导航 -->
            <div class="nav-side" ref="navSide">
                <!-- 导航标题 -->
                <div class="nav-side-title">
                    <span>图书分类</span>
                </div>
                <div v-for="nav in allNav" class="nav-side-content">
                    <!-- 父分类 -->
                    <span class="nav-side-content-title"> {{nav.name}}</span>
                    <!-- 分割线 -->
                    <Divider />
                    <!-- 子分类 -->
                    <Breadcrumb separator="|" v-for="(child,index) in nav.childcategory" :key="index">
                        <div class="nav-side-content-childcategory">
                            <BreadcrumbItem>
                                <span class="nav-side-content-nav">
                                    <a @click="clickcategory(child.id)">{{child.name}}</a>
                                </span>
                            </BreadcrumbItem>
                        </div>
                    </Breadcrumb>
                    <p style="clear:both"></p>
                </div>
            </div>
            <!-- 轮播图广告 热卖商品 -->
            <div class="nav-carousel">
                <!-- 轮播图广告 -->
                <div class="nav-carousel-ad">
                    <Carousel autoplay v-model="carousel" loop>
                        <!-- <CarouselItem v-for="img in hotImg">
                            <div class="demo-carousel">
                                <img src="+ {{img}} +" alt="">
                            </div>
                        </CarouselItem> -->
                        <CarouselItem>
                            <div class="demo-carousel">
                                <img src="static/img/hotgoods/hotgoods-1.jpg" alt="图片被怪物吃掉啦">
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">
                                <img src="static/img/hotgoods/hotgoods-2.jpg" alt="图片被怪物吃掉啦">
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">
                                <img src="static/img/hotgoods/hotgoods-3.jpg" alt="图片被怪物吃掉啦">
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div class="demo-carousel">
                                <img src="static/img/hotgoods/hotgoods-4.jpg" alt="图片被怪物吃掉啦">
                            </div>
                        </CarouselItem>
                    </Carousel>
                </div>
                <!-- 热卖商品区 -->
                <div class="nav-carousel-hotGoods">
                    <!-- 热卖商品 -->
                    <Divider orientation="left"><span class="nav-carousel-hosGoods-title">热卖图书</span></Divider>
                    <div class="hot-goods-show">
                        <!-- 热卖商品列表 热卖图书前16 -->
                        <Carousel v-model="hotGoods" :autoplay="autoplay" :radius-dot="radiusDot" dots="outside" arrow="always" trigger="hover">
                            <CarouselItem>
                                <div v-for="(item,index) in hotBooks">
                                    <div v-if="index<4">
                                        <div class="hot-goods-list">
                                            <!-- 图片展示 -->
                                            <div class="hot-goods-img">
                                                <img v-bind:src="item.mainImg" alt="图片被怪物吃掉啦">
                                            </div>
                                            <!-- 书名 -->
                                            <div class="hot-goods-name">
                                                <span>{{item.name}}</span>
                                            </div>
                                            <!-- 作者 -->
                                            <div class="hot-goods-author">
                                                <span>{{item.author}}</span>
                                            </div>
                                            <!-- 价格 -->
                                            <div class="hot-goods-price">
                                                <span>￥{{item.price}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <div v-for="(item,index) in hotBooks">
                                    <div v-if="index>4 && index<8">
                                        <div class="hot-goods-list">
                                            <!-- 图片展示 -->
                                            <div class="hot-goods-img">
                                                <img v-bind:src="item.mainImg" alt="图片被怪物吃掉啦">
                                            </div>
                                            <!-- 书名 -->
                                            <div class="hot-goods-name">
                                                <span>{{item.name}}</span>
                                            </div>
                                            <!-- 作者 -->
                                            <div class="hot-goods-author">
                                                <span>{{item.author}}</span>
                                            </div>
                                            <!-- 价格 -->
                                            <div class="hot-goods-price">
                                                <span>￥{{item.price}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <div v-for="(item,index) in hotBooks">
                                    <div v-if="index>8 && index<12">
                                        <div class="hot-goods-list">
                                            <!-- 图片展示 -->
                                            <div class="hot-goods-img">
                                                <img v-bind:src="item.mainImg" alt="图片被怪物吃掉啦">
                                            </div>
                                            <!-- 书名 -->
                                            <div class="hot-goods-name">
                                                <span>{{item.name}}</span>
                                            </div>
                                            <!-- 作者 -->
                                            <div class="hot-goods-author">
                                                <span>{{item.author}}</span>
                                            </div>
                                            <!-- 价格 -->
                                            <div class="hot-goods-price">
                                                <span>￥{{item.price}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <div v-for="(item,index) in hotBooks">
                                    <div v-if="index>12">
                                        <div class="hot-goods-list">
                                            <!-- 图片展示 -->
                                            <div class="hot-goods-img">
                                                <img v-bind:src="item.mainImg" alt="图片被怪物吃掉啦">
                                            </div>
                                            <!-- 书名 -->
                                            <div class="hot-goods-name">
                                                <span>{{item.name}}</span>
                                            </div>
                                            <!-- 作者 -->
                                            <div class="hot-goods-author">
                                                <span>{{item.author}}</span>
                                            </div>
                                            <!-- 价格 -->
                                            <div class="hot-goods-price">
                                                <span>￥{{item.price}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        </Carousel>
                    </div>
                </div>
            </div>
            <!-- 热门作者排行榜 -->
            <div class="nav-rank">
                <Tabs value="author">
                    <TabPane label="作者搜索热度" name="author">标签一的内容</TabPane>
                    <TabPane label="图书搜索热度" name="book">标签二的内容</TabPane>
                </Tabs>
            </div>
        </div>
        <!-- 限时秒抢 -->
        <div>
            <Divider orientation="left">限时秒抢</Divider>
        </div>
        <!-- 店长推荐 -->
        <div>
            <Divider orientation="left">店长推荐</Divider>
        </div>
        <div>
            <common-footer></common-footer>    
        </div> 
    </div>
</template>

<script>
    import CommonHeader from '../common/header'
    import CommonFooter from '../common/footer'
    import IndexHeader from '../common/index/indexHeader'
    import IndexMenu from '../common/index/indexMenu'
    export default {
        data(){
            return{
                carousel: 0,
                // 热卖商品
                hotBooks:[],
                hotGoods: 0,
                autoplay: false,
                radiusDot: true,
                // 存储父分类和相对应的子分类
                allNav:[],
                user:{
                    id:'',
                    username:''
                }
            }
        },
        components:{
            CommonHeader,
            CommonFooter,
            IndexHeader,
            IndexMenu
        },
        created(){
            var _this = this;
            // 获取用户登录信息
            _this.user = this.$route.query.user;
            // 侧边导航 分类
            _this.$axios.get('/category-server/category').then((data)=>{
                // 获取图书分类列表
                var category = data.data;
                // 数组类型
                var categoryArray = category.data;
                _this.allcategory = categoryArray;
                var parentcategory = [];
                var hasChild = [];
                // 获得根分类
                for(var i = 0 ;i < categoryArray.length; i++){
                    var parentId = categoryArray[i].parentId;
                    // 根分类
                    if(parentId == 0){
                        // 存储根分类name和id
                        var str = {"name":categoryArray[i].name,"id":categoryArray[i].id};
                        parentcategory.push(str);
                    }
                }
                // 获得子分类
                for(var j = 0;j < parentcategory.length; j++){
                    var childcategory = [];
                    for(var k = 0 ;k < categoryArray.length; k++){
                        if(parentcategory[j].id == categoryArray[k].parentId){
                            var subStr = {"id":categoryArray[k].id,"name":categoryArray[k].name};
                            childcategory.push(subStr);
                        }
                    }
                    // 存储根分类name和id和子分类
                    var str = {"name":parentcategory[j].name,"id":parentcategory[j].id,"childcategory":childcategory};
                    hasChild.push(str);
                }
                _this.allNav = hasChild;
            })
            // 获得热卖商品
            _this.$axios.get('/product-server/product').then((data)=>{
                var book = data.data;
                _this.hotBooks = book.data;
            })
        },
        mounted(){
            
        },
        methods:{
            // 点击分类标签跳转
            clickcategory(id){
                this.$router.push({path: '/markets', query: { categoryId: id }});
            }
        }
    }
</script>

<style scoped> 
    .page-index{
        clear: both;
    }
    /* 侧边导航、广告轮播、排行榜 */
    .nav-body{
        height: 680px;
        clear: both;
    }

    /* 侧边导航 */
    .nav-side{
        margin-left: 30px;
        width: 15%;
        float: left;
        outline: 1px solid #F9F9F9;
        /* -moz-outline-radius: 5px 5px 0 0; */
        /* border-radius: 5px 5px 0 0; */
        border-radius: 1px;
        box-shadow: 0 0 0 3px #F9F9F9;
    }
    /* 侧边导航标题 */
    .nav-side-title{
        height: 50px;
        background-color: #F9F9F9;
    }
    .nav-side-title span{
        font-size: 20px;
        font-weight: bold;
        /* 字体居中 */
        float: left;
        margin-top: 10px;
        margin-left: 70px;
    }
    .nav-side-content{
        margin-left: 5px;
        margin-right: 5px;
        margin-top: 15px;
        margin-bottom: 20px;
    }
    .nav-side-content-title{
        font-size: 15px;
        font-weight: bold;
        float: left;
        margin-left: 5px;
    }
    .nav-side-content-nav{
        font-size: 12px;
    }
    /* 子分类 */
    .nav-side-content-childcategory{
        float: left;
    }
    /* 广告轮播 热卖商品 */
    .nav-carousel{
        margin-left: 50px;
        width: 54%;
        float: left;
    }
    /* 广告轮播 */
    /* .nav-carousel-ad{

    } */
    /* 热卖商品 */
    /* .nav-carousel-hotGoods{
        
    } */
    /* 热卖商品图片区 */
    .hot-goods-img{
        width: 190px;
        height: 190px;
    }
    /* 热卖商品书名 */
    .hot-goods-name{
        margin-top: 5px;
        font-size: 13px;
    }
    .hot-goods-author{
        margin-top: 5px;
        color: #AAAAAA;
    }
    .hot-goods-price{
        margin-top: 5px;
        font-weight: bold;
        font-size: 13px;
    }
    /* 标题 */
    .nav-carousel-hosGoods-title{
        font-weight: bold;
        font-size: 18px;
    }
    .hot-goods-list{
        float: left;
        width: 25%;
    }
    /* 排行榜 */
    .nav-rank{
        margin-left: 50px;
        width: 20%;
        float: left;
        border-radius: 1px;
        box-shadow: 0 0 0 2px #F9F9F9;
    }
</style>