<template>
    <!-- 商品详情页 -->
    <div>
        <div>
            <!-- 图钉 将导航固定在顶部 -->
            <Affix :offset-top="60">
                <div>
                    <common-header></common-header>
                </div>
            </Affix>
        </div>
        <!-- 商标，搜索框，购物车图标 -->
        <div>
            <index-header></index-header>
        </div>
        <div>
            <!-- 图书图片展示区 -->
            <div>
                <div v-for="(item,index) in goods">
                {{item.value}}
                    <div v-for="(food,foodIndex) in item.foods" class="default" :class="{'active':item.activeIndex == foodIndex}" @click="changeClass(index,foodIndex)">
                        {{food.name}}
                    </div>
                </div>
            </div>
            <!-- 图书书名作者简单介绍 -->
            <div>
                <!-- 加入购物车、立即购买 -->
            </div>
        </div>
        <!-- 热卖商品列表广告 -->
        <div>

        </div>
        <!-- 商品详情 详细参数信息 -->
        <div>

        </div>
        <!-- 页面尾部信息 -->
        <div>
            <common-footer></common-footer>
        </div>
    </div>
</template>

<script>
    import CommonHeader from '../common/header'
    import CommonFooter from '../common/footer'
    import IndexHeader from '../common/index/indexHeader'
    export default {
        components:{
            CommonHeader,
            CommonFooter,
            IndexHeader
        },
        data(){
            return{
                goods:[
                {value:'食物',foods:[{name:1},{name:2},{name:3},{name:4}],activeIndex:null},
                {value:'菜',foods:[{name:1},{name:2},{name:3},{name:4}],activeIndex:null},
                {value:'饮料',foods:[{name:1},{name:2},{name:3},{name:4}],activeIndex:null}
            ]
            }
        },
        methods:{
            changeClass:function(index,foodIndex){
                if(this.goods[index].activeIndex == foodIndex){
                    this.goods[index].activeIndex = null;
                }else{
                    this.goods[index].activeIndex = foodIndex;
                }
            }
        }
    }
</script>

<style scoped>
    .active{
        color:red;
    }
</style>
