<template>
    <div class="page-index-order">
        <!-- 头像、用户名、我的收货地址 -->
        <div class="page-header">
            <div class="user-order-face">
                <img src="/static/img/info/face.jpg" alt="图片被怪物吃辣">
            </div>
            <div class="user-order-name">
                <span>吃猫鱼</span>
            </div>
            <div class="user-order-address">
                <a @click="toAddress"><span style="">我的收货地址</span></a>
            </div>
        </div>
        <!-- 分割线 -->
        <div class="page-hr">
            <Divider></Divider>
        </div>
        <!-- 导航列表 -->
        <div class="page-order-bread">
            <Breadcrumb separator="|">
                <BreadcrumbItem to="/">待付款</BreadcrumbItem>
                <BreadcrumbItem to="/">待发货</BreadcrumbItem>
                <BreadcrumbItem to="/">待收货</BreadcrumbItem>
                <BreadcrumbItem to="/">待评价</BreadcrumbItem>
                <BreadcrumbItem></BreadcrumbItem>
            </Breadcrumb>
        </div>
        <!-- 我的物流 待收货列表 -->
        <div class="page-order-content">
            <div class="content-title">
                <div style="float: left;margin-top: 8px;margin-left: 30px;">
                    <span>我的物流</span>
                </div>
            </div>
            <div class="content-detail">
                <Collapse v-model="value">
                    <Panel name="1" hide-arrow>
                        <div style="float: left;">
                            <span>2019.05.30</span>
                        </div>
                        <div slot="content">
                            <p>史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
                            <Button>确定收货</Button>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                value: [1,2]
            }
        },
        props:{

        },
        methods: {
            toAddress(){

            }
        }
    }
</script>

<style>
    .page-index-order{
        width: 1060px;
    }
    .user-order-face{
        float: left;
        margin-left: 90px;
        margin-top: 20px;
        width: 70px;
        height: 70px;
    }
    .user-order-face img{
        border-radius: 50%;
        width: 60px;
        height: 60px;
    }
    .user-order-name{
        float: left;
        width: 300px;
        text-align: left;
        font-size: 16px;
        font-weight: bold;
        margin-left: 30px;
        margin-top: 50px;
    }
    .user-order-address{
        float: left;
        margin-top: 50px;
        margin-left: 230px;
        font-size: 14px;
    }
    .page-hr{
        margin-left: 60px;
    }
    .page-order-content{
        float: left;
        margin-top: 30px;
        margin-left: 60px;
    }
    .content-title{
        text-align: left;
        height: 40px;
        width: 1000px;
        font-size: 16px;
        font-weight: bold;
        border-radius: 5px 5px 1px 1px;
        color: #FFFFFF;
        background-color: #FF0036;
    }
    .content-detail{
        margin-top: 2px;
    }
</style>
