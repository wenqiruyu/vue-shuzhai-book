<template>
    <div class="page-update">
        <div class="update-title">
            <span style="font-size: 20px; ">账号安全</span>
        </div>
        <!-- 设置密码 -->
        <div class="update-password" style="margin-top: 60px;margin-bottom: 30px;clear: both;height: 50px;">
            <div style="float:left; margin-left:90px;width: 210px;">
                <div style="float: left;">
                    <Icon type="ios-checkmark-circle" color="#45B72A"/>
                    <span>设置密码</span>
                </div>
            </div>
            <div style="float:left; margin-left:180px;width: 210px;">
                <div style="float: left;">
                    <Icon type="ios-checkmark-circle" color="#45B72A"/>
                    <span>已设置</span>
                </div>
            </div>
            <div style="float: left;margin-left:180px;width: 210px;">
                <div style="float: left;">
                    <a @click="passwordModal = true"><span>更改密码</span></a>
                    <Modal v-model="passwordModal" :mask-closable="false">
                        <p slot="header" style="color:#f60;text-align:center">
                            <span style="color:#FF0036;">修改密码</span>
                        </p>
                        <!-- 步骤条 -->
                        <div class="update-pwd-step">
                            <Steps :current="current">
                                <Step title="验证身份" :content="verifyRemind"></Step>
                                <Step title="设置密码" :content="updatePwdRemind"></Step>
                                <Step title="改密成功" :content="successRemind"></Step>
                            </Steps>
                        </div>
                        <div class="update-verify-phone">
                            <Form :label-width="90" ref="mobile" :model="updatePwd" :rules="rule">
                                <div v-if="nowStep == 'phoneVerify'">
                                    <div>
                                        <FormItem prop="phone" label="绑定的手机号">
                                            <Input type="text" size="large" v-model="updatePwd.phone" disabled :placeholder="userInfo.userPhone" style="width:315px;">
                                                <Icon type="md-phone-portrait" slot="prefix"></Icon>
                                            </Input>  
                                        </FormItem>
                                    </div>
                                    <div>
                                        <FormItem label="验证码">
                                            <Row>
                                                <Col span="13" v-on:blur="hide()">
                                                    <FormItem prop="verify">
                                                        <Input type="text" size="large" v-model="updatePwd.verify" placeholder="请输入手机验证码" clearable></Input>
                                                    </FormItem>
                                                </Col>
                                                <Col span="7" offset="1">
                                                    <FormItem prop="senverify">
                                                        <!-- disabled按钮为禁止状态 -->
                                                        <Button type="primary" size="large" v-model="updatePwd.sendverify" @click="getVerify" :disabled="sendVerify">获取验证码</Button>
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </FormItem>
                                    </div>
                                    <div>
                                        <div style="margin-left: 60px">
                                            <Button @click="toNext" long type="primary" style="width: 120px;margin-left: 30px;">下一步</Button>
                                        </div>
                                        <div style="float: left;margin-left:300px;">
                                            <span>手机无法使用？<a><span style="color: #FF0036">更换验证方式</span></a></span>
                                        </div>
                                    </div>
                                </div>

                                <div v-else-if="nowStep == 'setPassword'">
                                    <FormItem prop="password" label="设置新密码">
                                        <Input v-bind:type="pwdType" size="large" v-model="updatePwd.password" placeholder="请输入新密码" style="width:315px;">
                                            <Icon type="ios-lock-outline" slot="prefix"></Icon>
                                            <Icon v-if="showPwd" type="md-eye" slot="suffix" @click="showPassword"/>
                                            <Icon v-else type="md-eye-off" slot="suffix" @click="showPassword"/>
                                        </Input>
                                    </FormItem>
                                    <div style="margin-left: 60px">
                                        <Button @click="toSuccess" long type="primary" style="width: 120px;margin-left: 30px;">下一步</Button>
                                    </div>
                                </div>

                                <div v-else-if="nowStep == 'setSuccess'">
                                    <div style="color:#FF0036; margin-top: 30px;margin-right: 30px;text-align: center;font-size: 16px;">
                                        <span>修改密码操作完成了哦(*^_^*)</span>
                                    </div>
                                    <div>
                                        <Button @click="passwordModal = false" type="primary" long style="width: 120px;margin-top: 60px;margin-left: 150px;">返回</Button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        
                        <!-- 对话框页脚 删除按钮 -->
                        <div slot="footer" style="margin-top: 30px;">
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
        <div>
            <hr class="hr"></hr>
        </div>
        <!-- 绑定邮箱 -->
        <div class="update-email" style="margin-top: 60px;margin-bottom: 30px;clear: both;height: 50px;">
            <div style="float:left; margin-left:90px;width: 210px;">
                <div style="float: left;">
                    <Icon v-if="userInfo.eamil == null || userInfo.eamil == ''" type="ios-information-circle" color="#FFD230" />
                    <Icon v-else type="ios-checkmark-circle" color="#45B72A"/>
                    <span>绑定邮箱</span>
                </div>   
            </div>
            <div style="float:left;margin-left:180px;width: 210px;" v-if="userInfo.eamil == null || userInfo.eamil == ''">
                <div style="float: left;">
                    <Icon type="ios-close-circle" color="#FF0404" />
                    <span>未绑定邮箱</span>
                </div>
            </div>
            <div style="float:left; margin-left:180px;width: 210px;" v-else>
                <div style="float: left;">
                    <Icon type="ios-checkmark-circle" color="#45B72A"/>
                    <span>已绑定邮箱</span>
                </div>
            </div>
            <div style="float: left;margin-left:180px;width: 210px;">
                <div style="float: left;">
                    <a href=""><span>绑定邮箱</span></a>
                </div>
            </div>
        </div>
        <div>
            <hr class="hr"></hr>
        </div>
        <!-- 绑定手机号 -->
        <div class="update-phone" style="margin-top: 60px;margin-bottom: 30px;clear: both;height: 50px;">
            <div style="float:left; margin-left:90px;width: 210px;">
                <div style="float: left;">
                    <Icon type="ios-checkmark-circle" color="#45B72A"/>
                    <span>绑定手机</span>
                </div>
            </div>
            <div style="float:left;margin-left:180px;width: 210px;">
                <div style="float: left;">
                    <Icon type="ios-checkmark-circle" color="#45B72A"/>
                    <span>157****4838</span>
                </div>
            </div>
            <div style="float: left;margin-left:180px;width: 210px;">
                <div style="float: left;">
                    <a href=""><span>更换手机号</span></a>
                </div>
            </div>
        </div>
        <div>
            <hr class="hr"></hr>
        </div>
        <!-- 绑定QQ账号 -->
        <div class="update-qq" style="margin-top: 60px;margin-bottom: 30px;clear: both;height: 50px;">
            <div style="float:left; margin-left:90px;width: 210px;">
                <div style="float: left;">
                    <Icon type="ios-checkmark-circle" color="#45B72A"/>
                    <span>绑定QQ账号</span>
                </div>
            </div>
            <div style="float:left;margin-left:180px;width: 210px;">
                <div style="float: left;">
                    <Icon type="ios-checkmark-circle" color="#45B72A"/>
                    <span>已授权绑定QQ账号</span>
                </div>
            </div>
            <div style="float: left;margin-left:180px;width: 210px;">
                <div style="float: left;">
                    <a href=""><span>解除绑定</span></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            const validatePass = (rule, value, callback) => {
                if (value === '' || value === undefined) {
                    callback(new Error('密码不能为空'));
                } else {
                    // 通过给标签添加ref，得以获取该标签
                    callback();
                }
            }
            const validateVerify = (rule, value, callback) => {
                if(this.sendVerify){
                    callback(new Error('验证短信发送成功，请查收'))
                } else if (value === '' || value === undefined) {
                    callback(new Error('验证码不能为空'))
                }else if(this.isTrueVerify){
                    callback(new Error('验证码不正确哦'))
                }else{
                    callback()
                }
            }
            return{
                // 当前的步骤
                nowStep: 'phoneVerify',
                current: 0,
                // 显示密码
                showPwd: false,
                pwdType: 'password',
                verifyRemind: '',
                updatePwdRemind: '',
                successRemind: '',
                sendVerify: false,
                passwordModal: false,
                isTrueVerify: false,
                updatePwd: {},
                rule: {
                    password: [
                        { validator: validatePass, trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度应在6位以上才更安全哦', trigger: 'blur' }
                    ],
                    verify:[
                        { validator: validateVerify, trigger: 'blur' },
                        { type: 'string', min: 6,max:6, message: '验证码为六位哦', trigger: 'blur' }
                    ]    
                }
            }
        },
        props:{
            userId: String,
            userInfo: {},
            requierd: true
        },
        methods: {
            getVerify(){
                var mobile = this.userInfo.user.phone
                this.$axios.get('/user-server/user/sms/updatePwd',{
                    params:{
                        phone: mobile
                    }
                }).then((data) => {
                    var data = data.data
                    if(data.status == 1){
                        this.sendVerify = true
                        this.$refs.mobile.validateField('verify')
                    }else{
                        this.verifyRemind = data.msg
                    }
                })
            },
            toNext(){
                this.sendVerify = false
                var verify = this.updatePwd.verify
                this.$refs.mobile.validateField('verify',(verifyError) => {
                    if(!verifyError){
                        this.$axios.get("/user-server/user/updatePwd",{
                            params:{
                                phone: this.userInfo.user.phone,
                                verify: verify
                            }
                        }).then((data) => {
                            var data = data.data
                            if(data.status == 1){
                                // 验证码验证正确，进行消息提示
                                this.verifyRemind = data.msg
                                // 进行下一步操作
                                this.nowStep = 'setPassword'
                                this.current = 1
                            }else{
                                this.isTrueVerify = true
                                this.$refs.mobile.validateField('verify')
                            }
                        })
                    }
                })
            },
            toSuccess(){
                this.$refs.mobile.validateField('password',(passwordError) => {
                    if(!passwordError){
                        this.$axios.put('/user-server/user/password',{
                                id: this.userId,
                                password: this.updatePwd.password
                        }).then((data) => {
                            var data = data.data 
                            if(data.status == 1){
                                this.nowStep = 'setSuccess'
                                this.updatePwdRemind = "新密码合适"
                                this.current = 2
                                // 验证码验证正确，进行消息提示
                                this.successRemind = data.data
                            }else{
                                this.successRemind = data.data
                            }
                        })
                    }
                })
                
                
            },
            showPassword(){
                if(this.showPwd){
                    this.showPwd = false
                    this.pwdType = 'password'
                }else{
                    this.showPwd = true
                    this.pwdType = 'text'
                }
            }
        }
    }
</script>

<style scoped>
    .page-update{
        font-size: 16px;
        margin-left: 60px;
        margin-top: 20px;
        width: 1100px;
    }
    /* 分割线 */
     .hr{
        margin-left: 10px;
        border:none;
        border-top:1px solid  #D9D9D9;
    }
    .update-pwd-step{
        margin-top: 20px;
    }
    .update-verify-phone{
        margin-top: 40px;
        margin-left: 30px;
        margin-bottom: 20px;
    }
    
</style>