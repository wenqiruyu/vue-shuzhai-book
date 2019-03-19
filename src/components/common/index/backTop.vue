<template>
    <!-- 返回顶部公共组件 -->
    <div>
        <BackTop :height="100" :bottom="200">
            <div class="top">
                <Icon type="ios-arrow-up" />
                <p>返回顶端</p>
            </div>
        </BackTop>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .top{
        padding: 10px;
        background: rgba(65, 68, 70, 0.7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
</style>
