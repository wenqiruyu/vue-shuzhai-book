<template>
    <div class="page-address">
        <div class="address-title">
            <span>可用收货地址</span>
        </div>
        <div class="address-not" v-if="userAddress == null || userAddress.length == 0">
            <div class="address-not-msg">
                <span>您还未设置地址哦</span>
            </div>
            <div class="address-not-button">
                <Button type="primary" @click="addModal = true">添加收货地址</Button>
            </div>
        </div>
        <div v-else>
            <div class="address-all-card">
                <div class="order-address-card" v-for="(item,index) in userAddress">
                    <div v-if="chooseActive == -1" class="order-show-card" :class="{ active: item.status == 0 ? (chooseActive=index || true) : false }" 
                    @click="checkCard(index)">
                        <Card style="height: 160px;">
                            <p slot="title"><span style="color:#FF0036;">收货人：</span>{{item.consigneeName}} <span style="color:#FF0036;">手机号：</span>{{item.consigneePhone}}</p>
                            <p> <span style="color:#FF0036;">地区：</span>{{item.provinces}}</p>
                            <p> <span style="color:#FF0036;">详细地址：</span>{{item.detail}}</p>
                        </Card>
                    </div>
                    <div v-else class="order-show-card" :class="{ active: index == chooseActive }" @click="checkCard(index)">
                        <Card style="height: 160px;">
                            <p slot="title"><span style="color:#FF0036;">收货人：</span>{{item.consigneeName}} <span style="color:#FF0036;">手机号：</span>{{item.consigneePhone}}</p>
                            <p> <span style="color:#FF0036;">地区：</span>{{item.provinces}}</p>
                            <p> <span style="color:#FF0036;">详细地址：</span>{{item.detail}}</p>
                        </Card>
                    </div>
                </div>
            </div>
            <div class="address-title">
                <span>操作相关</span>
            </div>
            <div class="address-button">
                <Button @click="updateDefault"><span style="color:#FF0036">修改默认地址</span></Button>
                <Button @click="updateAddress"><span style="color:#FF0036">修改地址信息</span></Button>
                <Button @click="deleteAddress"><span style="color:#FF0036">删除收货地址</span></Button>
                <Modal v-model="remindExit" width="360" @on-ok="toDelete" @on-cancel="back">
                    <p slot="header" style="color:#f60;text-align:center">
                        <Icon type="ios-information-circle"></Icon>
                        <span>删除收货地址</span>
                    </p>
                    <div style="text-align:center">
                        <p>您确定要删除该收货地址嘛？</p>
                    </div>
                </Modal>
                <Button @click="addAddress"><span style="color:#FF0036">添加收货地址</span></Button>
            </div>
        </div>
        <div class="address-from">
            <Modal v-model="addModal" :mask-closable="false">
                <p slot="header" style="color:#f60;text-align:center">
                    <span>新增收货地址</span>
                </p>

                <div style="margin-left: 30px;font-size: 14px;">
                    <span style="color:#CCD0D7">当前配送至:</span><span style="font-weight: bold;margin-left: 20px;">中国大陆</span>
                </div>
                <div style="margin-top: 20px;margin-right: 30px;">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
                        <FormItem label="收货人姓名" prop="name">
                            <Input v-model="formValidate.name" placeholder="长度不超过18个字符哦"></Input>
                        </FormItem>
                        <FormItem prop="province" label="省份">
                            <Select v-model="formValidate.province" placeholder="请选择省份" @on-change="changeProvince">
                                <Option v-for="(item,index) in provinceArr" :key="item.value" :value="item.value" >{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem prop="city" label="城市">
                            <Select v-model="formValidate.city" placeholder="请选择城市" @on-change="changeCity">
                                <Option v-for="(item,index) in citiesArr" :key="item.value" :value="item.value" >{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem prop="county" label="区县">
                            <Select v-model="formValidate.county" placeholder="请选择区县">
                                <Option v-for="(item,index) in countyArr" :key="item.value" :value="item.value" >{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="详细地址" prop="desc">
                            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" 
                            placeholder="请输入详细地址信息，如街道，小区，门牌号，楼栋号，单元等信息"></Input>
                        </FormItem>
                        <FormItem label="手机号码" prop="mobile">
                            <Input v-model="formValidate.mobile" placeholder="请填写正确可用的手机号哦"></Input>
                        </FormItem>
                        <FormItem prop="interest">
                            <Checkbox v-model="formValidate.interest">
                                <span>设置为默认收货地址</span>
                            </Checkbox>
                        </FormItem>
                        <div style="margin-left: 60px;">
                            <Button type="primary" @click="handleSubmit('formValidate')" long style="width: 370px;">添加</Button>
                        </div>
                    </Form>
                </div>
                <!-- 对话框页脚 删除按钮 -->
                <div slot="footer">
                </div>
            </Modal>
        </div>
        <div class="address-update-from">
            <Modal v-model="updateModal" :mask-closable="false">
                <p slot="header" style="color:#f60;text-align:center">
                    <span>修改收货地址</span>
                </p>
                <div style="margin-left: 30px;font-size: 14px;">
                    <span style="color:#CCD0D7">当前配送至:</span><span style="font-weight: bold;margin-left: 20px;">中国大陆</span>
                </div>
                <div style="margin-top: 20px;margin-right: 30px;">
                    <Form ref="updateFormValidate" :model="updateFormValidate" :rules="updateRuleValidate" :label-width="90">
                        <FormItem label="收货人姓名" prop="name">
                            <Input v-model="updateFormValidate.name" placeholder="长度不超过18个字符哦"></Input>
                        </FormItem>
                        <FormItem label="省份" prop="province">
                            <Select v-model="updateFormValidate.province" placeholder="请选择省份" @on-change="updateChangeProvince">
                                <Option v-for="(item,index) in provinceArr" :key="item.value" :value="item.value" >{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="城市" prop="city">
                            <Select v-model="updateFormValidate.city" placeholder="请选择城市" @on-change="changeCity">
                                <Option v-for="(item,index) in citiesArr" :key="item.value" :value="item.value" >{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="区县" prop="county">
                            <Select v-model="updateFormValidate.county" placeholder="请选择区县">
                                <Option v-for="(item,index) in countyArr" :key="item.value" :value="item.value" >{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="详细地址" prop="desc">
                            <Input v-model="updateFormValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" 
                            placeholder="请输入详细地址信息，如街道，小区，门牌号，楼栋号，单元等信息"></Input>
                        </FormItem>
                        <FormItem label="手机号码" prop="mobile">
                            <Input v-model="updateFormValidate.mobile" placeholder="请填写正确可用的手机号哦"></Input>
                        </FormItem>
                        <div style="margin-left: 60px;">
                            <Button type="primary" @click="updateSubmit('updateFormValidate')" long style="width: 370px;">修改地址</Button>
                        </div>
                    </Form>
                </div>
                <!-- 对话框页脚 删除按钮 -->
                <div slot="footer">
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            var regPhone=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/
            const validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写手机号'));
                } else if (!regPhone.test(value)) {
                    callback(new Error('请输入正确手机号'));
                } else {
                    callback();
                }
            }
            const updateValidatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写手机号'));
                } else if (!regPhone.test(value)) {
                    callback(new Error('请输入正确手机号'));
                } else {
                    callback();
                }
            }
            return{
                remindExit: false,
                // 修改信息
                updateAddressArry: [],
                citiesArr: [],
                countyArr:[],
                updateFormValidate: {
                    province: '',
                    city: '',
                    county: '',
                    name: '',
                    mobile: '',
                    desc: ''
                },
                formValidate: {
                    name: '',
                    province: '',
                    city: '',
                    county: '',
                    // 地址是否为默认地址
                    interest: false,
                    mobile: '',
                    // 地址详情
                    desc: ''
                },
                addModal: false,
                updateModal: false,
                userAddress: [],
                provinceArr: [],
                chooseActive: -1,
                defaultAddress: -1,
                ruleValidate: {
                    name: [
                        { required: true, message: '收货人姓名不能为空哦', trigger: 'blur' },
                        { type: 'string', min: 2,max: 18, message: '收货人姓名应在2到10个字之间哦', trigger: 'blur' }
                    ],
                    province: [
                        { required: true, message: '请选择收货地所属的省份', trigger: 'change' }
                    ],
                    city: [
                        { required: true, message: '请选择收货地所属的市', trigger: 'change' }
                    ],
                    county: [
                        { required: true, message: '请选择收货地所属的区县', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写收货地的详细信息', trigger: 'blur' },
                        // { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ],
                    mobile: [
                        { validator: validatePhone, trigger: 'blur' }
                    ]
                },
                updateRuleValidate: {
                    name: [
                        { required: true, message: '收货人姓名不能为空哦', trigger: 'blur' },
                        { type: 'string', min: 2,max: 18, message: '收货人姓名应在2到10个字之间哦', trigger: 'blur' }
                    ],
                     province: [
                        { required: true, message: '请选择收货地所属的省份', trigger: 'change' }
                    ],
                    city: [
                        { required: true, message: '请选择收货地所属的市', trigger: 'change' }
                    ],
                    county: [
                        { required: true, message: '请选择收货地所属的区县', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写收货地的详细信息', trigger: 'blur' },
                    ],
                    mobile: [
                        { validator: updateValidatePhone, trigger: 'blur' }
                    ]
                }
            }
        },
        props: {
            userId: String,
            requierd: true
        },
        created(){
            // 获取用户的地址
            this.getAddress()
            this.$axios.get('http://localhost:8080/static/json/provinces.json').then((data) => {
                this.provinceArr = data.data.data
            })
        },
        methods: {
            addAddress(){
                if(this.userAddress.length >= 6){
                    this.$Notice.error({
                        title: '提示',
                        desc: '收货地址最多只能设置六个哦'
                    })
                }else{
                    this.addModal = true
                }
            },
            getAddress(){
                this.$axios.get('/user-server/user/address/' + this.userId).then((data)=>{
                    this.userAddress = data.data.data.slice()
                    for(var i = 0,len = this.userAddress.length; i<len; i++){
                        // 默认地址
                        if(this.userAddress[i].status == 0){
                            this.defaultAddress = i
                        }
                    }
                })
            },
            checkCard(item){
                this.chooseActive = item
            },
            changeProvince(val){
                for(var i=0; i<this.provinceArr.length; i++){
                    if(val == this.provinceArr[i].value ){
                        this.citiesArr = this.provinceArr[i].children
                        this.formValidate.county = ''
                        this.countyArr = []
                    }
                }
            },
            updateChangeProvince(val){
                for(var i=0; i<this.provinceArr.length; i++){
                    if(val == this.provinceArr[i].value ){
                        this.citiesArr = this.provinceArr[i].children
                        this.updateFormValidate.city = ''
                        this.updateFormValidate.county = ''
                        this.countyArr = []
                    }
                }
            },
            changeCity(val){
                for(var i=0; i<this.citiesArr.length; i++){
                    if(val == this.citiesArr[i].value ){
                        this.countyArr = this.citiesArr[i].children
                    }
                }
            },
            updateSubmit(name){
                var newForm = this.updateFormValidate
                var oldForm = this.updateAddressArry
                this.$refs[name].validate((valid) => {
                    if(valid){
                        // 判断用户是否进行了修改
                        var strProv = newForm.province + ',' + newForm.city + ',' + newForm.county
                        if(newForm.name == oldForm.consigneeName && strProv == oldForm.provinces && newForm.desc == oldForm.detail && newForm.mobile == oldForm.consigneePhone){
                            this.$Notice.error({
                                title: '提示',
                                desc: '你还没进行修改呢'
                            })
                        }else{
                            this.$axios.put('/user-server/user/addressDesc',{
                                id: oldForm.id,
                                status: oldForm.status,
                                provinces : strProv,
                                detail: newForm.desc,
                                consigneeName: newForm.name,
                                consigneePhone: newForm.mobile
                            }).then((data) => {
                                var data = data.data
                                if(data.status == 1){
                                    this.$Notice.success({
                                        title: '提示',
                                        desc: data.msg
                                    })
                                    this.updateModal = false
                                    this.getAddress()
                                }else{
                                    this.$Notice.error({
                                        title: '提示',
                                        desc: data.msg
                                    })
                                    this.updateModal = false
                                    this.getAddress()
                                }
                            })
                        }
                    }
                })
            },
            handleSubmit(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 是否为默认地址 1否0是
                        var status = 1
                        if(this.formValidate.interest){
                            status = 0
                        }
                        // 省市区
                        var prov = this.formValidate.province + ',' + this.formValidate.city + ',' + this.formValidate.county
                        this.$axios.post('/user-server/user/address',{
                                userId: this.userId,
                                consigneeName: this.formValidate.name,
                                consigneePhone: this.formValidate.mobile,
                                provinces: prov,
                                detail: this.formValidate.desc,
                                status: status
                            }).then((data)=>{
                                var data = data.data
                                if(data.status == 1){
                                    this.$Notice.success({
                                        title: '提示',
                                        desc: data.msg
                                    })
                                    this.addModal = false
                                    this.getAddress()
                            }else{
                                this.$Notice.success({
                                    title: '提示',
                                    desc: data.msg
                                })
                                this.addModal = false
                                this.getAddress()
                            }
                        })
                    } 
                })
            },
            updateDefault(){
                if(this.chooseActive == -1){
                    this.$Notice.error({
                        title: '提示',
                        desc: '请选择你要设置为默认值的地址哦'
                    })
                }else if(this.chooseActive == this.defaultAddress ){
                    this.$Notice.error({
                        title: '提示',
                        desc: '你选择的地址已经是默认地址了哦'
                    })
                }else{
                    this.$axios.put('/user-server/user/address/',{
                            id: this.userAddress[this.chooseActive].id,
                            userId: this.userAddress[this.chooseActive].userId,
                            status: 0
                        }).then((data)=>{
                            var data = data.data 
                            if(data.status == 1){
                                this.$Notice.success({
                                    title: '提示',
                                    desc: data.msg
                                })
                            }else{
                                this.$Notice.error({
                                    title: '提示',
                                    desc: data.msg
                                })
                            }
                    })
                    this.getAddress()
                }
            },
            updateAddress(){
                this.updateAddressArry = this.userAddress[this.chooseActive]
                var str = this.updateAddressArry.provinces.split(',')
                this.updateFormValidate.province = str[0]
                this.updateFormValidate.city = str[1]
                this.updateFormValidate.county = str[2]
                this.updateFormValidate.name = this.updateAddressArry.consigneeName
                this.updateFormValidate.mobile = this.updateAddressArry.consigneePhone
                this.updateFormValidate.desc = this.updateAddressArry.detail
                this.updateModal = true
                for(var i=0; i<this.provinceArr.length; i++){
                    if(this.updateFormValidate.province == this.provinceArr[i].value ){
                        this.citiesArr = this.provinceArr[i].children
                    }
                }
                for(var i=0; i<this.citiesArr.length; i++){
                    if(this.updateFormValidate.city == this.citiesArr[i].value ){
                        this.countyArr = this.citiesArr[i].children
                    }
                }
            },
            deleteAddress(){
                if(this.chooseActive == -1){
                    this.$Notice.error({
                        title: '提示',
                        desc: '请选择你要删除的地址哦'
                    })
                }else{
                    // 进行友好提示
                    this.remindExit = true
                }
            },
            toDelete(){
                this.$axios.delete('/user-server/user/address/' + this.userAddress[this.chooseActive].id).then((data)=>{
                    var data = data.data
                    if(data.status == 1){
                        this.$Notice.success({
                            title: '提示',
                            desc: data.msg
                        })
                        this.getAddress()
                    }else{
                        this.$Notice.error({
                            title: '提示',
                            desc: data.msg
                        })
                        this.getAddress()
                    }
                })
            },
            back(){
                this.remindExit = false
            }
        }
    }
</script>

<style scoped>
    .page-address{
        margin-left: 60px;
        float: left;
        width: 1160px;
    }
    .address-title{
        font-size: 18px;
        font-weight: bold;
        float: left;
        width: 100%;
        text-align: left;
        margin-top: 20px;
    }
    .address-not{
        float: left;
        margin-top: 90px;
        width: 100%;
    }
    .address-not-msg{
        font-size: 16px;
        color: #CCD0D7;
    }
    .address-not-button{
        float: left;
        margin-left: 90px;
        margin-top: 120px;
    }
    .address-all-card{
        float: left;
        width: 100%;
        margin-top: 30px;
    }
    .order-address-card{
        float: left;
    }
    .order-show-card{
        text-align: left;
        float: left;
        width: 370px;
        margin-left: 15px;
        margin-bottom: 30px;
    }
    .active{
        border-radius: 1px;
        box-shadow: 0 0 0 3px #FF0036;
    }
    .address-button{
        float: left;
        margin-top: 20px;
        margin-left: 120px;
    }
</style>

