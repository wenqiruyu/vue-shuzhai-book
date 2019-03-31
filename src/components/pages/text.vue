<template>
    <Form ref="formValidate" :model="formValidate" :label-width="80">
        <FormItem label="收货人姓名" prop="name">
            <Input v-model="formValidate.name" placeholder="长度不超过18个字符哦"></Input>
        </FormItem>

        <FormItem prop="province" label="省份">
            <Select v-model="formValidate.province" placeholder="请选择省份" @on-change="changeProvince" :multiple="isMultiple">
                <Option v-for="(item,index) in provinceArr" :key="item.value" :value="item.value" >{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem prop="city" label="城市">
            <Select v-model="formValidate.city" placeholder="请选择城市" @on-change="changeCity" :multiple="isMultiple">
                <Option v-for="(item,index) in citiesArr" :key="item.value" :value="item.value" >{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem prop="county" label="区县">
            <Select v-model="formValidate.county" placeholder="请选择区县" :multiple="isMultiple">
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
    </Form>
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
            };
            return{
                isMultiple: false,
                provinceArr: [],
                citiesArr: [],
                countyArr:[],
                formValidate: {
                    province: '',
                    city: '',
                    county: '',
                    // 地址是否为默认地址
                    interest: false,
                    mobile: '',
                    // 地址详情
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '收货人姓名不能为空哦', trigger: 'blur' },
                        { type: 'string', min: 2,max: 18, message: '收货人姓名应在2到18个字符哦', trigger: 'blur' }
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
                }
            }
        },
        created(){
            this.$axios.get('http://localhost:8080/static/json/provinces.json').then((data) => {
                this.provinceArr = data.data.data
            })
        },
        methods: {
            changeProvince(val){
            for(var i=0; i<this.provinceArr.length; i++){
                if(val == this.provinceArr[i].value ){
                    this.citiesArr = this.provinceArr[i].children
                    this.formValidate.county = ''
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
        }
    }
}
</script>

<style>

</style>