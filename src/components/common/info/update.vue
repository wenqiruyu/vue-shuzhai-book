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
                    <!-- <Modal
                        v-model="passwordModal"
                        title="修改密码"
                        @on-ok="passwordOk">
                        <Input v-model="value" placeholder="请输入旧密码" style="width: 300px" />
                    </Modal> -->
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
            return{
                passwordModal: false,
            }
        },
        props:{
            userInfo: {},
            requierd: true
        },
        methods: {
            passwordOk(){

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
</style>