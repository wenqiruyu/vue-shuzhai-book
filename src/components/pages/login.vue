<!-- 这是登录页 -->
<template>
    <div>
        <!-- 登录页头部 -->
        <div class="login-header">
            <login-header></login-header>
        </div>
        <div class="login-hr">
            <hr/>
        </div>
        <div class="login-content">
            <!-- 广告图片 -->
            <div class="login-img">
                <img src="static/img/hotgoods/hotgoods-1.jpg" alt="">
            </div>
            <div class="login">
                <!-- 登录页标题 -->
                <div class="login-title">
                    <span>密码登录</span>
                </div>
                <!-- 错误提示区域 -->
                <div class="login-error-remind">
                    <span>{{remind}}</span>
                </div>
                <!-- 登录表单 -->
                <div class="login-form" >
                    <Form ref="user" :model="user" :rules="ruleInline">
                        <div>
                            <FormItem prop="username">
                                <Input type="text" size="large" v-model="user.username" placeholder="请输入用户名" clearable>
                                    <Icon type="ios-contact" slot="prefix"></Icon>
                                </Input>
                            </FormItem>
                        </div>
                        <div>
                            <FormItem prop="password">
                                <Input type="password" size="large" v-model="user.password" placeholder="请输入密码" clearable>
                                    <Icon type="ios-lock-outline" slot="prefix"></Icon>
                                </Input>
                            </FormItem>
                        </div>
                        <!-- 自动登录 忘记密码 -->
                        <div class="login-remember-forget">
                            <div class="login-form-remember">
                                <Checkbox v-model="single">
                                    <span v-if="single == false">三天内自动登录</span>
                                    <span v-if="single == true">请勿在公用电脑上勾选此选项</span>
                                </Checkbox>
                            </div>
                            <div class="login-form-forgetpwd">
                                <a href="">忘记密码？</a>
                            </div>
                        </div>
                        <div class="login-form-click">
                            <FormItem>
                                <Button type="primary" size="large" @click="login('user')" long>登录</Button>
                            </FormItem>
                        </div>
                        <!-- 注册账号 -->
                        <div class="login-form-register">
                            <a href="/register"><span>注册账号</span></a>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        <div class="login-footer">
            <login-footer></login-footer>
        </div>
    </div>
</template>

<script>
    import LoginHeader from "../common/login/loginHeader";
    import LoginFooter from "../common/login/loginFooter";
    import {setCookie, clearCookie} from '../../assets/js/cookie.js'
import { constants } from 'fs';
    export default {
        components:{
            LoginHeader,
            LoginFooter
        },
        data(){
            return {
                remind: '',
                single: false,
                formInline: true,
                user: {
                    username: '',
                    password: ''
                },
                ruleInline: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6', trigger: 'blur' }
                    ]
                },
            }
        },
        methods:{
            login(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var token = null
                        var isSetCookie = false
                        const params = new URLSearchParams()
                        params.append('username', this.user.username)
                        params.append('password', this.user.password)
                        // this.$axios.post('/user-server/user/login', params, {crossDomain:true,withCredentials:true})
                        this.$axios.post('/user-server/user/login', params).then((data) => {
                            token = data.data.data
                            console.log(token)
                            var status = data.data.status
                            if(status == 1) {
                                // 获取cookie
                                if(token != ''){
                                    // 根据sessionId查询缓存中的用户信息
                                    console.log("jashudasudhuash")
                                    this.$axios.get('/user-server/user/info',{
                                        params: {
                                            token: token
                                        }
                                    }).then((res) => {
                                        var usr = res.data.data
                                        var status = res.data.status
                                        if(status == 1){
                                            if(this.single){
                                                setCookie("login-token", data.data.data, 3)
                                                setCookie("username", usr.username, 3)
                                                setCookie("userId", usr.id, 3)
                                            }else{
                                                console.log("0000000000000")
                                                document.cookie = "login-token" + "=" + token + "; "
                                                document.cookie = "username" + "=" + usr.username + "; "
                                                document.cookie = "userId" + "=" + usr.id + "; "
                                            }
                                            // 用于在路由守卫上使用
                                            localStorage.setItem("islogin", JSON.stringify(this.formInline))
                                            //路由跳转到首页
                                            window.location.href = "/index"
                                            // this.$router.push('index')
                                        }
                                    })
                                }else{

                                }
                            } else {
                                // 提示用户名或密码错误
                                this.remind = data.data.msg
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .login-hr{
        height:1px;
        margin-bottom: 5px;
        border:none;
        border-top:3px solid  #515A6E;
    }
    .login-content{
        margin-top: 60px;
    }
    /* 广告图片 */
    .login-img{
        margin-left: 150px;
        margin-top: 15px;
        width: 800px;
        height: 400px;
        float: left;
        outline: 3px solid rgb(26, 25, 25);
    }
    .login{
        float: left;
        width: 380px;
        height: 400px;
        margin-left:100px;
        margin-top:20px;
        outline: 4px solid #F9F9F9;
    }
    /* 标题 */
    .login-title{
        margin-top: 15px;
        margin-left: 30px;
        color: #8A8A8A;
        float:left;
        font-size: 18px;
    }
    /* 错误提示区域 */
    .login-error-remind{
        text-align: left;
        margin-top: 48px;
        margin-left: 35px;
        height: 20px;
        color: red;
    }
    /* 表单 */
    .login-form{
        float: left;
        margin-top: 12px;
        margin-left: 30px;
        width:320px;
    }
    Input{
        height:50px;
    }
    /* 自动登录 忘记密码 */
    .login-remember-forget{
        float:left;
        color: #8A8A8A;
        width: 100%;
        margin-bottom: 20px;
    }
    .login-form-remember{
        float: left;
    }
    .login-form-forgetpwd{
        margin-right: 10px;
        float: right;
    }
    /* 忘记密码 */
    /* .login-form-forgetpwd{
        float: left;
        height: 30px;
        margin-top: -10px;
        margin-left: 220px;
    } */
    .login-footer{
        float:left;
        margin-top: 50px;
    }
</style>