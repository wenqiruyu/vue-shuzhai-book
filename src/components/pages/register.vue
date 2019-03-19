<template>
    <div>
        <div class="register-header">
            <login-header></login-header>
        </div>
        <div class="register" >
            <div class="register-title">
                <p>新用户注册</p>
            </div>
            <!-- 错误信息提示位置 -->
            <div class="register-remind">
                <p>错误信息提示位置</p>
                <p>{{ remindMsg }}</p>
            </div>
            <!-- 注册表单位置 -->
            <div class="register-form" >
                <!-- v-bind:show-message="isShow"是否显示错误提示 -->
                <Form ref="user" :model="user" :rules="rule">
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
                                <Icon type="ios-eye-off" slot="suffix"/>
                            </Input>
                        </FormItem>
                    </div>
                    <div>
                        <FormItem prop="phone">
                            <Input type="text" size="large" v-model="user.phone" placeholder="请输入手机号" clearable>
                                <Icon type="md-phone-portrait" slot="prefix"></Icon>
                            </Input>  
                        </FormItem>
                    </div>
                    <div>
                        <FormItem>
                            <Row>
                                <Col span="15" v-on:blur="hide()">
                                    <FormItem prop="verify">
                                        <Input type="text" size="large" v-model="user.verify" placeholder="请输入手机验证码" clearable></Input>
                                    </FormItem>
                                </Col>
                                <Col span="6" offset="1">
                                    <FormItem prop="senverify">
                                        <!-- disabled按钮为禁止状态 -->
                                        <Button type="primary" size="large" v-model="user.sendverify" @click="getVerify()" v-bind:disabled="sty" >获取验证码</Button>
                                    </FormItem>
                                </Col>
                            </Row>
                        </FormItem>
                    </div>
                    <div>
                        <FormItem>
                            <Button type="primary" size="large" @click="handleSubmit('user')" long>注册</Button>
                        </FormItem>
                    </div>
                </Form>
            </div>
        </div>
        <div class="register-footer">
            <login-footer></login-footer>
        </div>
    </div>
</template>

<script>
    import LoginHeader from "../common/login/loginHeader";
    import LoginFooter from "../common/login/loginFooter";
    export default {
        components:{
            LoginHeader,
            LoginFooter
        },
        data(){
            var regPhone=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
            const validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('用户名不能为空'));
                } else {
                    // 通过给标签添加ref，得以获取该标签
                    console.log(this.sty);
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                } else {
                    // 通过给标签添加ref，得以获取该标签
                    console.log(this.sty);
                    callback();
                }
            };
            const validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('手机号不能为空'));
                } else if (!regPhone.test(value)) {
                    callback(new Error('请输入正确手机号'));
                } else {
                    // 通过给标签添加ref，得以获取该标签
                    console.log(this.sty);
                    this.sty=false;
                    callback();
                }
            };
            const validateVerify = (rule, value, callback) => {
                if (this.isShowVerify) {
                    this.isShowVerify = false;
                    callback(new Error(remindMsg));
                } else if (!regPhone.test(this.user.phone)) {
                    callback(new Error('请输入正确手机号'));
                } else if (value = '') {
                    callback(new Error('验证码不能为空'));
                }else {
                    // 通过给标签添加ref，得以获取该标签
                    console.log(this.sty);
                    this.sty=false;
                    callback();
                }
            };
            return{
                // isShow:false,
                sty:true,
                // 验证码手机号提示信息
                remindMsg:'',
                // 用于验证码的判断
                isShowVerify: false,
                user:{
                    username:'',
                    password:'',
                    phone:'',
                    verify:'',
                    sendverify:''
                },
                rule: {
                    username: [
                        { validator: validateUser, trigger: 'blur' },
                        { type: 'string', min: 3,max:8, message: '用户名长度应在3到8之间', trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度应在6位以上才更安全哦', trigger: 'blur' }
                    ],
                    phone:[
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    verify:[
                        { validator: validateVerify, trigger: 'blur' },
                        { type: 'string', min: 6,max:6, message: '六位验证码不正确哦', trigger: 'blur' }
                    ]    
                },
            } 
        },
        methods: {
            getVerify(){
                this.$axios.get('/user/sendSms',{
                    params : { 
                        //请求参数
                        number:this.user.phone
                    }
                }).then((response)=>{
                    var data = response.data;
                    var status = data.status;
                    // 后台状态码 8 为号码已经注册过了，1成功。0失败
                if(status === 8){
                    alert(status);
                    // 显示验证码提示
                    this.isShowVerify = true;
                    this.remindMsg='* ' + data.msg;
                    // 绑定ref
                    this.$refs.ruleForm2.validateField('user');
                }else if(status === 0){
                    alert(status);
                    // 显示验证码提示
                    this.isShowVerify = true;
                    this.remindMsg='* ' + data.msg;
                    // 绑定ref
                    }
                })
            },
            handleSubmit(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/user/register',this.user).then((response) => {
                            var status = response.data;
                                if(status === 'success') {
                                    //路由跳转
                                    this.$router.push('/');
                                } else {
                                    alert(response.data);
                                }
                            }).catch((error) => {
                                console.log(response);
                        })
                    }else{

                    }
                })
            }
        }
    }
</script>

<style scoped>
    .register{
        margin-top: 10px;
        margin-left: 30px;
        margin-right: 30px;
        height: 550px;
        background-image: url('/static/img/register/register-img-1.jpg');
        outline: 4px solid #F9F9F9;
    }
    /* 标题 */
    .register-title{
        margin-left: 60px;
        margin-top:30px;
        float:left;
        color: #8A8A8A;
        font-size: 18px;
    }
    /* 错误信息提示位置 */
    .register-remind{
        width: 200px;
        height: 20px;
        float:left;
        margin-left: 450px;
        margin-top: 80px;
        outline: 4px solid #000000;
    }
    .register-form{
        width:300px;
        float:left;
        margin-left:560px;
        margin-top:30px;
    }

    Input{
        height:50px;
    }

    .register-footer{
        float:left;
    }
</style>