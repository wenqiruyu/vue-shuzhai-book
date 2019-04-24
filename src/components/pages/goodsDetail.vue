<template>
    <!-- 商品详情页 -->
    <div>
        <!-- 图钉 将导航固定在顶部 -->
        <div>
            <common-header></common-header>
        </div>
        <!-- 商标，搜索框，购物车图标 -->
        <div>
            <index-header></index-header>
        </div>
        <div>
            <index-menu></index-menu>
        </div>
        <!-- 添加一个动态的面包屑 -->
        <div class="detail-breadcrumb">
            <Breadcrumb separator=">">
                <div class="detail-breadcrumb-title">
                    <BreadcrumbItem to="/">图书</BreadcrumbItem>
                </div>
                <div class="detail-breadcrumb-title">
                    <BreadcrumbItem to="/">电子书</BreadcrumbItem>
                </div>
                <div class="detail-breadcrumb-title">
                    <BreadcrumbItem to="/">网络文学</BreadcrumbItem>
                </div>
                <div class="detail-breadcrumb-title">
                    <BreadcrumbItem to="/">电子产品</BreadcrumbItem>
                </div>
                <div class="detail-breadcrumb-title">
                    <BreadcrumbItem to="/">电子产品</BreadcrumbItem>
                </div>
                <div class="detail-breadcrumb-title">
                    <BreadcrumbItem to="/">电子产品</BreadcrumbItem>
                </div>
                <div class="detail-breadcrumb-title">
                    <BreadcrumbItem to="/">电子产品</BreadcrumbItem>
                </div>
            </Breadcrumb>
        </div>
        <!-- 页面内容部分 -->
        <div class="page-centent">
            <div class="book-detail">
                <!-- 图书图片展示区 -->
                <div class="detail-img">
                    <!-- 主图展示 需要在主图上添加一个放大镜的效果 -->
                    <div class="detail-sub-img" v-for="(img,index) in book_subImg">
                        <div v-if="index==img_index" style="width:320px;height:320px;">
                            <pic-zoom v-bind:url="img" :scale="scale" scroll alt="图片被怪物吃掉啦"></pic-zoom>
                            <!-- <img v-bind:src="img" alt="图片被怪物吃掉啦" width="316px" height="316px"> -->
                        </div>
                    </div>
                    <!-- 缩略图展示  -->
                    <div class="detail-thumbnail-img">
                        <!-- 图片展示 -->
                        <div class="show-thumbnail-img" v-for="(item,index) in book_thumbnail">
                            <div :class="{ active:index==isActive }" v-on:mouseover="showSubImg(index)">
                                <img v-bind:src="item" alt="图片被怪物吃掉啦">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 图书基本信息 -->
                <div class="detail-book">
                    <!-- 热卖标志 -->
                    <div class="detail-book-isHot" v-if="book.status == 4">
                        <p>热</p>
                    </div>
                    <!-- 图书书名作者简单介绍 -->
                    <div class="detail-book-name">
                        {{book.name}}
                    </div>
                    <div class="detail-book-subTitle">
                        {{book.subtitle}}
                    </div>
                    <p style="clear: both"></p>
                    <div>
                        <hr class="hr"></hr>
                    </div>
                    <!-- 作者 出版社 出版时间 -->
                    <div class="detail-book-author-all">
                        <div class="detail-book-author">
                            <p>作者：<a href="">{{book.author}}</a></p>
                        </div>
                        <div class="detail-book-press">
                            <p>出版社：{{book.press}}</p>
                        </div>
                        <div class="detail-book-publishDate">
                            <p>出版时间：{{book.publishDate}}</p>
                        </div>
                    </div>
                    <!-- 评分 评论数 -->
                    <div class="detail-book-grade-all">
                        <div class="detail-book-grade">
                            <Rate allow-half disabled v-bind:value="book.grade">
                            </Rate>
                            <span style="color: #f5a623;font-size:14px">{{book.grade}}评分</span>
                        </div>
                        <div class="detail-book-commentNum">
                            <a href=""><span style="margin-left:20px;font-size:14px;">{{book.commentNum}}条评论</span></a>
                        </div>
                        <div class="detail-book-toWriteComment">
                            <p><a class="toWriteComment" href="">我要写评论</a></p>
                        </div>
                    </div>
                    <!-- 价格展示区 -->
                    <div class="detail-book-showPrice">
                        <div class="detail-book-price">
                            <p>书斋售价：</p>
                        </div>
                        <div class="detail-book-pricing">
                            <!-- 售价 -->
                            <span style="font-size:13px;color:red;">
                                ￥<span style="font-size:18px;">{{book.price}}</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <!-- 定价 -->
                                <span style="color:#515A6E;text-decoration: line-through;">定价 ￥{{book.pricing}}</span>
                            </span>
                        </div>
                    </div>
                    <!-- 运费 -->
                    <div class="detail-book-freight">
                        <!-- 先规定书斋网仓库在广东深圳 获取用户的收货地址-->
                        <div class="detail-book-freight-title">
                            运费
                        </div>
                        <div class="detail-book-freight-centent">
                            <span>广东深圳 至 苏州 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 快递：</span>
                        </div>
                    </div>
                    <!-- 数量 -->
                    <div class="detail-book-number">
                        <div class="detail-book-number-title">
                            数量
                        </div>
                        <div class="detail-book-freight-centent">
                            <InputNumber :max="10" :min="1" v-model="buyNum"></InputNumber>
                            <span>件 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 库存：{{book.stock}}件</span>
                        </div>
                    </div>
                    <!-- 加入购物车、立即购买 -->
                    <div class="detail-book-button">
                        <Button v-on:click="toCart(book.id)" type="primary" icon="ios-cart">加入购物车</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type="error" v-on:click="clickPay(book.id)">立即购买</Button>
                    </div>
                </div>
            </div>
            <!-- 热卖商品列表广告 -->
            <div>

            </div>
            <!-- 商品详情 详细参数信息 -->
            <div class="page-footer">
                <div class="book-menu">
                    <Menu mode="horizontal" :active-name="activeName" @on-select="menuSelect">
                       <MenuItem name="book-detail">
                            商品详情
                        </MenuItem>
                        <MenuItem name="book-garde">
                            商品评论
                        </MenuItem>
                    </Menu>
                </div>
                <div>
                    <hr class="menu-hr"></hr>
                </div>
                <!-- 商品详情 -->
                <div v-if="selectMenu == 'book-detail'">
                    <div>
                        开本：16开 纸张：轻型纸 包装：平装-胶订
                        是否套装：是    国际标准书号ISBN：9787531579427
                    </div>
                    <div>
                        <!-- 产品特色 -->
                        <!-- 编辑推荐 -->
                        <!-- 内容简介 -->
                        <!-- 作者简介 -->
                        <!-- 目录 -->
                        <!-- 前言 -->
                    </div>
                </div>
                <!-- 商品评论 -->
                <div v-else style="margin-top: 30px;">
                    <div v-if="allGarde == null || allGarde.length == 0">
                        <span>
                            该图书还没有评论哟，快来抢沙发吧！
                        </span>
                    </div>
                    <div v-else>
                        <div v-for="(item,index) in allGarde">
                            <div style="float: left;margin-left: 120px;">
                                <!-- 头像 -->
                                <div>
                                    <img style="width: 60px;height:60px;display: inline-block;border-radius: 50%;line-height: 100px;" 
                                    v-bind:src="item.user.face" alt="图片被怪物吃掉啦">
                                </div>
                                <!-- 用户名 -->
                                <div>
                                    <span>{{item.user.username}}</span>
                                </div>
                                <!-- 发布评论日期 -->
                                <div>
                                    <span>{{item.user.createTime}}</span>
                                </div>
                            </div>
                            <!-- 评论具体内容 -->
                            <div>
                                <span>{{item.detail}}</span>
                            </div>
                            <!-- 点赞 -->

                            <!-- 评中评 -->
                        </div>
                    </div>
                    <!-- 发表评论 -->
                    <div>
                        <!-- 输入框 -->
                        <Input v-model="detail" type="textarea" :rows="4" placeholder="Enter something..." />
                        <!-- 按钮 -->
                        <Button @click="addComment">发布</Button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 页面尾部信息 -->
        <div>
            <common-footer></common-footer>
        </div>
    </div>
</template>

<script>
    import {setCookie,getCookie,clearCookie} from '../../assets/js/cookie.js'
    import CommonHeader from '../common/header'
    import CommonFooter from '../common/footer'
    import IndexHeader from '../common/index/indexHeader'
    import IndexMenu from '../common/index/indexMenu'
    import PicZoom from 'vue-piczoom'
    export default {
        components:{
            CommonHeader,
            CommonFooter,
            IndexHeader,
            IndexMenu,
            PicZoom
        },
        data(){
            return{
                detail: '',
                activeName: 'book-detail',
                selectMenu: 'book-detail',
                // 主图放大镜效果
                scale: 2,
                book:{},
                // 图书所有评论
                allGarde: null,
                user:{'id':'','name':''},
                bookId: '',
                isActive: 0,
                book_subImg: [],
                book_thumbnail: [],
                img_index: 0,
                buyNum: 1,
                img:null
            }
        },
        methods:{
            menuSelect(name){
                this.selectMenu = name
                if(name == 'book-garde'){
                    // 查询商品下的所有评论
                    this.$axios.get('/product-server/product/comment/' + this.bookId).then((res) => {
                        var data = res.data
                        if(data.status == 1){
                            if(res.data.data.length != 0){
                                this.allGarde = res.data.data
                            }
                        }else{
                            this.$Notice.error({
                                title: '提示',
                                desc: data.msg
                            });
                        }
                    })
                }
            },
            showSubImg(index){
                this.img_index = index
                this.isActive = index
            },
            // 加入购物车
            toCart(bookId){
                var _this = this;
                this.$axios.post('/cart-server/cart',{
                    userId:this.user.id,
                    bookId:bookId,
                    bookNum:this.buyNum,
                    bookName: this.book.name,
                    author: this.book.author,
                    price: this.book.price
                }).then((data)=>{
                    var data = data.data
                    if(data.status == 1){
                        this.$Notice.success({
                            title: '提示',
                            desc: data.msg
                        });
                    }else{
                        this.$Notice.error({
                            title: '提示',
                            desc: data.msg
                        });
                    }
                })
            },
            // 点击立即购买
            clickPay(id){
                this.$router.push({path: '/confirmOrder', query: { bookDeail: JSON.stringify(this.book) }})
            },
            addComment(){
                const params = new URLSearchParams()
                params.append('userId', this.user.id)
                params.append('productId', this.bookId)
                params.append('detail', this.detail)
                this.$axios.post('/product-server/product/comment', params).then((res)=>{
                    var data = res.data
                    if(data.status == 1){
                    this.$Notice.success({
                            title: '提示',
                            desc: data.msg
                        });
                    }else{
                        this.$Notice.error({
                            title: '提示',
                            desc: data.msg
                        });
                    }
                })
            }
        },
        created(){
            var _this = this
            // 获取用户cookie
            _this.user.id = getCookie('userId')
            _this.user.name = getCookie('username')
            // 获取图书id
             this.bookId = this.$route.query.bookId
            // 根据图书id查询图书详情
            _this.$axios.get('/product-server/product/' + this.bookId).then((data)=>{
                _this.book = data.data.data
                _this.book.status = 4
                _this.book_subImg = _this.book.subImg.split(',')
                _this.book_thumbnail = _this.book.thumbnail.split(',')
                _this.img = _this.book_subImg[0]
            })
        }
    }
</script>

<style scoped>
    /* 动态面包屑 */
    .detail-breadcrumb{
        height: 20px;
        margin-left: 40px;
        margin-top: 20px;
    }
    .detail-breadcrumb-title{
        float: left;
        margin-left: 10px;
    }
    /* 页面中部 */
    .page-centent{
        clear: both;
        height: 1200px;
        margin: 30px;
    }
    .book-detail{
        clear: both;
    }
    /* 图片展示区域 */
    .detail-img{
        float: left;
        width: 350px;
        height: 420px;
        margin-left: 90px;
        margin-top: 20px;
        clear: both;

    }
    /* 主图 */
    .detail-sub-img{
        outline: 1px solid #F1F3F4;
        border-radius: 1px;
        /* width: 320px; */
    }
    /* 主图下面的商品缩略图 */
    .detail-thumbnail-img{
        clear: both;
        margin-top: 15px;
        margin-left: 8px;
        height: 70px;
    }
    .show-thumbnail-img{
        margin-top: 3px;
        margin-left: 15px;
        float: left;
        width: 60px;
        height: 60px;
    }
    /* 书籍简单介绍 */
    .detail-book{
        float: left;
        margin-top: 20px;
        margin-left: 90px;
        width: 900px;
    }
    /* 图书热卖标记 */
    .detail-book-isHot{
        border-radius: 50%;
        margin-top: 12px;
        float: left;
        width: 18px;
        height: 18px; 
        color: #FFFFFF;
        background-color: red;
        /* 宽度和高度需要相等 */
    }
    .detail-book-name{
        /* 文字向左显示 */
        text-align:left;
        font-weight: bold;
        font-size: 15px;
        margin-top: 10px;
        margin-left: 2px;
        float: left;
        width: 95%;
    }
    .detail-book-subTitle{
        text-align:left;
        font-size: 15px;
        float: left;
        width: 100%;
        margin-top: 15px;
        color: #969696;
    }
    /* 分割线 */
     .hr{
        margin-top: 15px;
        margin-bottom: 15px;
        margin-left: 10px;
        border:none;
        border-top:1px solid  #D9D9D9;
    }
    /* 作者 出版社 出版时间 */
    .detail-book-author-all{
        float: left;
        clear: both;
        font-size: 12px;
        width: 100%;
    }
    .detail-book-author{
        float: left;
    }
    .detail-book-press{
        margin-left: 90px;
        float: left;
    }
    .detail-book-publishDate{
        margin-left: 90px;
        float: left;
    }
    .detail-book-grade-all{
        margin-top: 10px;
        width: 100%;
        float: left;
    }
    .detail-book-grade{
        float: left;
    }
    .detail-book-commentNum{
        margin-top: 5px;
        float: left;
    }
    .detail-book-toWriteComment{
        margin-left: 15px;
        width: 80px;
        background-color: #FF6D6B;
        margin-top: 8px;
        border-radius: 3px;
        float: left;
    } 
    /* 标记 价格 */
    .detail-book-showPrice{
        margin-top: 15px;
        float: left;
        width: 100%;
        background-color: #F1F3F4;
    }
    .detail-book-price{
        margin-left: 30px;
        margin-top: 5px;
        float: left;
        width: 100%;
        text-align: left;
        color: #969696;
        font-size: 14px;
    }
    .detail-book-pricing{
        margin-bottom: 5px;
        float: left;
        margin-left: 90px;
    }
    /* 运费 */
    .detail-book-freight{
        font-size: 14px;
        float: left;
        margin-top: 20px;
        width: 100%;
    }
    .detail-book-freight-title{
        color: #969696;
        float: left;
    }
    .detail-book-freight-centent{
        float: left;
        margin-left: 60px;
    }
    /* 数量 */
    .detail-book-number{
        font-size: 14px;
        margin-top: 15px;
        float: left;
        width: 100%;
    }
    .detail-book-number-title{
        margin-top: 5px;
        color: #969696;
        float: left;
    }
    .detail-book-number-centent{
        float: left;
    }
    /* 立即购买 购物车按钮 */
    .detail-book-button{
        margin-top: 20px;
        float: left;
    }
    .page-footer{
        float: left;
        width: 97%;
    }
    .book-menu{
        margin-top: 60px;
        margin-left: 85px;
    }
    .menu-hr{
        margin-left: 85px;
        margin-bottom: 15px;
        border:none;
        border-top:1px solid  #D9D9D9;
    }
    .active{
        border: 2px solid #F1F3F4;
    }
</style>
