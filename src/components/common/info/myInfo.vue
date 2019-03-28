<template>
    <div class="page-my-info">
        <!-- 用户头像 -->
        <div class="user-info-face">
            <Upload ref="upload" :format="['jpg','jpeg','png']" :max-size="2048" multiple
                action="//jsonplaceholder.typicode.com/posts/" style="display: inline-block;border-radius: 50%;">
                <div style="width: 100px;height:100px;line-height: 100px;float: left;">
                    <img v-bind:src="userInfo.face" alt="图片被怪物吃辣">
                </div>
            </Upload>
        </div>
        <div class="user-info-form">
            <Form :model="formItem" :label-width="110">
                <FormItem label="昵称" class="formitem">
                    <Input v-model="formItem.input" size="large" v-bind:placeholder="userInfo.username" style="width: 180px;float: left;margin-left: 15px;"></Input>
                </FormItem>
                <FormItem label="绑定手机号" class="formitem">
                    <!-- <Input v-model="formItem.input" v-bind:placeholder="user.name"></Input> -->
                    <div style="float: left;font-size: 14px;color: #CCD0D7;margin-left: 15px;">
                        <span v-if=" userInfo.phone == null ">未绑定手机号</span>
                        <span v-else>{{userInfo.phone}}</span>
                    </div>
                </FormItem>
                <FormItem label="绑定邮箱" class="formitem">
                    <!-- <Input v-model="formItem.input" v-bind:placeholder="user.name"></Input> -->
                    <div style="float: left;font-size: 14px;color: #CCD0D7;margin-left: 15px;">
                        <span v-if=" userInfo.email == null ">未绑定邮箱</span>
                        <span v-else>{{userInfo.email}}</span>
                    </div>
                </FormItem>
                <FormItem label="生日" class="formitem">
                    <Row>
                        <Col span="11">
                            <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="性别" class="formitem">
                    <RadioGroup v-model="userInfo.userSex" style="float: left;margin-left: 15px;">
                        <Radio label="男">男</Radio>
                        <Radio label="女">女</Radio>
                        <Radio label="保密">保密</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="签名" class="formitem">
                    <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 3,maxRows: 4}" v-bind:maxlength="maxLen" placeholder="说出你想说的吧" style="float: left;margin-left: 15px;width: 380px;"></Input>
                </FormItem>
                <div style="margin-left: 150px;">
                    <FormItem>
                        <Button type="primary" size="large">保存</Button>
                    </FormItem>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                maxLen: 80,
                formItem: {
                    sex: '',
                }
            }
        },
        props:{
            userInfo: {},
            requierd: true
        },
        methods:{

        }
    }
</script>


<style scoped>
    .user-info-face{
        float: left;
        margin-left: 120px;
        margin-top: 30px;
    }
    .user-info-form{
        float: left;
        margin-top: 60px;
        margin-left: 150px;
        width: 630px;
    }
    .formitem > :first-child{
        font-size: 14px;
    }
    .user-info-face img{
        border-radius: 50%;
        width: 100px;
        height: 100px;
    }
</style>