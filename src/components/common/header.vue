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
                    <Modal v-model="remindExit" width="360" @on-ok="exit" @on-cancel="back">
                        <p slot="header" style="color:#f60;text-align:center">
                            <Icon type="ios-information-circle"></Icon>
                            <span>注销账号</span>
                        </p>
                        <div style="text-align:center">
                            <p>您确定退出登录更换账号吗？</p>
                        </div>
                    </Modal>
                    <BreadcrumbItem to="/register">会员注册</BreadcrumbItem>
                    <BreadcrumbItem>
                        <a  v-on:click="toInfo">我的信息</a>
                    </BreadcrumbItem>
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
                id: null,
                username: null,
                remindExit: false,
                modal_loading: false,
                formInline: false
            }
        },
        created(){
            // 获取cookie
            this.username = getCookie("username")
            this.id = getCookie("userId")
        },
        methods:{
            toInfo(){
                this.$router.push({ path: '/info' })
            },
            exit(){
                // 删除cookie
                clearCookie("username")
                clearCookie("userId")
                localStorage.setItem("islogin", JSON.stringify(this.formInline))
                // 路由跳转登录页面
                this.$router.push('login')
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