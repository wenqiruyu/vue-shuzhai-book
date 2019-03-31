<template>
    <div class="page-info">
        <div class="info-header">
            <Header></Header>
        </div>
        <div class="info-center">
            <!-- 侧边栏 -->
            <div class="info-center-menu">
                <Menu :active-name="activeName" @on-select="menuSelect">
                        <MenuItem name="my-info">
                            <Icon type="md-document" />
                            我的信息
                        </MenuItem>
                        <MenuItem name="update-pwd">
                            <Icon type="md-chatbubbles" />
                            账号安全
                        </MenuItem>
                        <MenuItem name="my-address">
                            <Icon type="md-heart" />
                            收货地址
                        </MenuItem>
                        <MenuItem name="my-footer">
                            <Icon type="md-leaf" />
                            我的足迹
                        </MenuItem>
                </Menu>
            </div>
            <div class="info-center-content">
                <div v-if="selectMenu == 'update-pwd'">
                    <Update :userInfo="userInfo"></Update>
                </div>
                <div v-else-if="selectMenu == 'my-address'">
                    <MyAddress :userId="userId"></MyAddress>
                </div>
                <div v-else-if="selectMenu == 'my-footer'">
                    <MyFooter :userInfo="userInfo"></MyFooter>
                </div>
                <div v-else>
                    <MyInfo :userInfo="userInfo"></MyInfo>
                </div>
            </div>

        </div>
        <div class="info-footer">
            <Footer></Footer>            
        </div>
    </div>
</template>

<script>
    import Header from '../common/header'
    import Footer from '../common/footer'
    import MyInfo from '../common/info/myInfo'
    import MyAddress from '../common/info/myAddress'
    import MyFooter from '../common/info/myFooter'
    import Update from '../common/info/update'
    import {setCookie,getCookie,clearCookie} from '../../assets/js/cookie.js'
    export default {
        data(){
            return{
                activeName: 'my-info',
                selectMenu: '',
                userId: null,
                isActive: -1,
                userInfo: {
                    userSex:'',
                    userPhone: '',
                    userName: '',
                    userSignature: '',
                    user: {}
                },
            }
        },
        created(){
            var _this = this
            // 跳转到指定选项
            var chooseName = this.$route.query.activeName
            if(chooseName != null){
                this.activeName = chooseName
                this.selectMenu = chooseName
            }
            this.userId = getCookie("userId")
            if(this.userId == null || this.userId == ''){
                this.$router.push("login")
            }
            this.$axios.get('/user-server/user/' + this.userId).then((data)=>{
                _this.userInfo.user = data.data.data
                var sex = _this.userInfo.user.sex
                if(sex == 0){
                    _this.userInfo.userSex = '保密'
                }else if(sex == 1){
                    _this.userInfo.userSex = '男'
                }else{
                    _this.userInfo.userSex =  '女'
                }
                // 将手机号保密设置
                _this.userInfo.userPhone = _this.userInfo.user.phone.replace(new RegExp("(\\d{3})(\\d{4})(\\d{4})"),"$1****$3")
                _this.userInfo.userName = _this.userInfo.user.username
                _this.userInfo.userSignature = _this.userInfo.user.signature
            })
        },
        components:{
            Header,
            Footer,
            MyInfo,
            MyAddress,
            MyFooter,
            Update
        },
        methods:{
            menuSelect(name){
                this.selectMenu = name
            }
        },
        filters:{
            mobile(value){
                let start = value.slice(0, 3)
                let end = value.slice(-4)
                return '${start}****${end}'
            }
        }
    }
</script>

<style scoped>
    .info-center{
        margin-top: 20px;
        margin-bottom: 20px;
        height: 600px;
        clear: both;
    }
    /* 侧边栏 */
    .info-center-menu{
        margin-top: 20px;
        height: 600px;
        float: left;
    }
    .info-center-content{
        float: left;
    }
</style>
