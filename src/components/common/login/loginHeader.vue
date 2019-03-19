<template>
    <div class="page-header">
        <!-- 商标 -->
        <div class="page-header-img">
            <div>
                <a @click="toIndex">
                    <img src="static/img/index/index-1.png" alt="图片被怪物吃掉啦">
                </a>
            </div>
        </div>
        <!-- 让阅读成为习惯 -->
        <div class="page-header-src">
            <img src="static/img/img-1.png" alt="图片被怪物吃掉啦">
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            // 点击图标跳转主页 后期考虑cookie是否需要传用户信息
            toIndex(){
                this.$router.push({path: '/index'});
            }
        }
    }
</script>

<style scoped>
    .page-header{
        margin-top: -50px;
        height: 110px;
        /* background-color: #F9F9F9; */
    }
    .page-header-img{
        float: left;
        width: 200px;
        margin-left: 120px;
    }
    .page-header-src{
        padding-top: 30px;
        margin-left: 30px;
    }
</style>