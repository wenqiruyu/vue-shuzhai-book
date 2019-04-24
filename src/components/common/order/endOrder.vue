<template>
    <div>
        <div class="end-order-title">
            <div class="content-title">
                <div style="float: left;margin-top: 8px;margin-left: 30px;">
                    <span>已完成订单</span>
                </div>
            </div>
            <div>
                <Table ref="selection" :columns="columns" :data="userCart" @on-selection-change="selectRow">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button @click="remindDel = true,removeIndex = index">确定收货</Button>
                    </template>
                </Table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                userCart: [],
                columns:[
                    {
                        title: '商品信息',
                        width: 600,
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: params.row.product.mainImg,
                                        style:'float:left;width:54px;height:54px;border-radius:2px;margin-top:30px;margin-bottom:10px;'
                                    }
                                }),
                                h('div',{
                                    attrs:{
                                        style:'color:#31708f;float:left;margin-left:45px;margin-top:15px;margin-bottom:15px;height:90px;width:460px;overflow:hidden;text-overflow:ellipsis '
                                    }
                                },params.row.product.name + '  -  ' + params.row.product.subtitle)
                            ]);
                        }
                    },
                    {
                        title: '单价',
                        render: (h, params)=>{
                            return h('span',{
                                attrs:{
                                    style:'color:red;'
                                }
                            },'￥' + params.row.product.price + '元')
                        }
                    },
                    {
                        title: '数量',
                        render: (h, params)=>{
                            var self = this
                            return h('div',[
                                h('InputNumber',{
                                    props: {
                                        value:params.row.quantity,
                                        max:10,
                                        min:1
                                    },
                                    on:{
                                        'on-change':(event)=>{
                                            params.row.quantity = event
                                            self.updateQuantity(params.index,event)
                                        }
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: '金额',
                        render: (h, params)=>{
                            let money = (params.row.product.price*params.row.quantity).toFixed(2)
                            return h('span',{
                                attrs:{
                                    style:'color:red;'
                                }
                            },'￥' + money + '元')
                        }
                    },
                    {
                        title: '操作',
                        type: 'action',
                        slot: 'action'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .end-order-title{
        margin-left: 60px;
        margin-top: 10px;
        text-align: left;
        height: 40px;
        width: 1000px;
        font-size: 16px;
        font-weight: bold;
        border-radius: 5px 5px 1px 1px;
        color: #FFFFFF;
        background-color: #FF0036;
    }
</style>
