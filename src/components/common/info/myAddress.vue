<template>
    <div>
        <div>
            <span>可用收货地址</span>
        </div>
        <div v-if="userAddress == null">
            该用户还没有设置地址
            <Button>添加收货地址</Button>
        </div>
        <div v-else>
            <div class="order-address-card" v-for="(item,index) in userAddress">
                <div v-if="chooseActive == -1" class="order-show-card" :class="{ active: item.status == 0 ? (chooseActive=index || true) : false }" @click="checkCard(index)">
                    <Card>
                        <p slot="title">收货人：{{item.consigneeName}}    手机号：{{item.consigneePhone}}</p>
                        <p>{{item.detail}}</p>
                    </Card>
                </div>
                <div v-else class="order-show-card" :class="{ active: index == chooseActive }" @click="checkCard(index)">
                    <Card>
                        <p slot="title">收货人：{{item.consigneeName}}    手机号：{{item.consigneePhone}}</p>
                        <p>{{item.detail}}</p>
                    </Card>
                </div>
            </div>
        </div>
        <div class="address-button">
            <Button>修改默认地址</Button>
            <Button>删除收货地址</Button>
            <Button>添加收货地址</Button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                address: [],
                chooseActive: -1,
            }
        },
        props: {
            userAddress: Array,
            requierd: true
        },
        methods: {
            checkCard(item){
                this.chooseActive = item
            }
        }
    }
</script>

<style scoped>
    .order-address-card{
        float: left;
        margin-top: 30px;
        margin-left: 30px;
    }
    .order-show-card{
        float: left;
    }
    .active{
        border-radius: 1px;
        box-shadow: 0 0 0 3px #FF0036;
    }
    .address-button{
        float: left;
        margin-top: 90px;
        margin-left: 90px;
    }
</style>

