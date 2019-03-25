<template>
    <div class="head-div">
        <div class="show-head">
            <div id="hello-user" class="header">
                <Breadcrumb>
                    <BreadcrumbItem>hi {{ username }} 欢迎来到书斋网</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <!-- 考虑使用登录拦截，未登录才有会员登录，注册，登录的用户给显示成注销功能 -->
            <div id="header-breadcrumb" class="header">
                <Breadcrumb>
                    <BreadcrumbItem  v-if="username == null || username == ''">
                        <a href="/login"><span style="color:red;">会员登录</span></a>
                    </BreadcrumbItem>
                    <BreadcrumbItem v-else><a @click="remindExit = true" style="color:red;">注销账号</a></BreadcrumbItem>
                    <Modal v-model="remindExit" width="360">
                        <p slot="header" style="color:#f60;text-align:center">
                            <Icon type="ios-information-circle"></Icon>
                            <span>注销账号</span>
                        </p>
                        <div style="text-align:center">
                            <p>您确定退出登录更换账号吗？</p>
                        </div>
                        <div slot="footer">
                            <Button size="large" type="error" @click="exit">确定</Button>
                            <Button size="large" @click="back">返回</Button>
                        </div>
                    </Modal>
                    <BreadcrumbItem to="/register">会员注册</BreadcrumbItem>
                    <BreadcrumbItem to="/info">我的信息</BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </Breadcrumb>
            </div>
        </div>
    </div>
</template>

<script>
    import {setCookie,getCookie,clearCookie} from '../../assets/js/cookie.js'
    export default {
        data(){
            return{
                // 需要和父模块获取相对应的用户名，进行欢迎提示
                username: null,
                remindExit: false,
                modal_loading: false
            }
        },
        created(){
            // 获取cookie
            var _username = getCookie("username")
            this.username = _username
        },
        methods:{
            exit(){
                // 删除cookie
                clearCookie("username")
                clearCookie("userId")
                // 路由跳转登录页面
                this.$router.push({path: '/login'});
            },
            back(){
                this.remindExit = false
            }
        }
    }
</script>

<style scoped>
    .head-div {
        width: 100%;
        height: 40px;
        margin-top: -60px;
        background-origin: padding-box;
        background-color: #F9F9F9;
    }
    .show-head{
        padding-top: 10px;
    }
    #hello-user {
        float: left;
        margin-left: 100px;
    }
    #header-breadcrumb {
        margin-left: 1200px;
    }
</style>