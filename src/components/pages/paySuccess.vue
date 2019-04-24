<template>
    <div>
        <span style="color: red;">支付成功哦</span>
        <Button @click="goBack">返回书斋</Button>
        <Button @click="againPay">继续购买</Button>
    </div>
</template>

<script>
    export default {
        methods:{
            goBack(){
                this.$router.push("index")
            },
            againPay(){
                this.$router.push("shoppingCart")  
            }
        }
    }
</script>

<style>

</style>
