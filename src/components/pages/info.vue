<template>
    <div class="page-info">
        <div class="info-header">
            <Header></Header>
        </div>
        <div class="info-center">
            <!-- 侧边栏 -->
            <div class="info-center-menu">
                <Menu active-name="my-info" @on-select="menuSelect">
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
                    <UpdatePwd :userInfo="user"></UpdatePwd>
                </div>
                <div v-else-if="selectMenu == 'my-address'">
                    <MyAddress :userAddress="address"></MyAddress>
                </div>
                <div v-else-if="selectMenu == 'my-footer'">
                    <MyFooter :userInfo="user"></MyFooter>
                </div>
                <div v-else>
                    <MyInfo :userInfo="user"></MyInfo>
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
    import UpdatePwd from '../common/info/updatePwd'
    import {setCookie,getCookie,clearCookie} from '../../assets/js/cookie.js'
    export default {
        data(){
            return{
                selectMenu: '',
                userId: null,
                address: [],
                isActive: -1,
                user: {
                    userSex:'',
                },
            }
        },
        created(){
            var _this = this
            this.userId = getCookie("userId")
            if(this.userId == null || this.userId == ''){
                this.$router.push("login")
            }
            this.$axios.get('/user-server/user/' + this.userId).then((data)=>{
                _this.user = data.data.data
                var sex = _this.user.sex
                if(sex == 0){
                    _this.user.userSex = '保密'
                }else if(sex == 1){
                    _this.user.userSex = '男'
                }else{
                    _this.user.userSex =  '女'
                }
            })
        },
        components:{
            Header,
            Footer,
            MyInfo,
            MyAddress,
            MyFooter,
            UpdatePwd
        },
        methods:{
            menuSelect(name){
                this.selectMenu = name
                // 如果用户点的是我的地址
                if(name == 'my-address'){
                    // 获取用户的地址
                    this.$axios.get('/user-server/user/address/' + this.userId).then((data)=>{
                        this.address = data.data.data.slice()
                    })
                }
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
        float: left;
    }
    .info-center-content{
        float: left;
    }
</style>
