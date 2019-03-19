<template>
    <div>
        <div class="index-header">
            <div class="index-menu">
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <Submenu name="1">
                        <template slot="title">
                            <span class="index-menu-title">
                                全部分类
                            </span>
                        </template>
                        <MenuItem name="1-1">童书、图书</MenuItem>
                        <MenuItem name="1-2">网络文学</MenuItem>
                        <MenuItem name="1-3">电子书</MenuItem>
                        <MenuItem name="1-4">电子产品</MenuItem>
                        <MenuItem name="1-5">流失用户</MenuItem>
                    </Submenu>
                </Menu>
            </div>
            <div class="index-menu-breadcrumb">
                <Breadcrumb separator=" ">
                    <div class="index-menu-breadcrumb-title">
                        <BreadcrumbItem to="/">图书</BreadcrumbItem>
                    </div>
                    <div class="index-menu-breadcrumb-title">
                        <BreadcrumbItem to="/">电子书</BreadcrumbItem>
                    </div>
                    <div class="index-menu-breadcrumb-title">
                        <BreadcrumbItem to="/">网络文学</BreadcrumbItem>
                    </div>
                    <div class="index-menu-breadcrumb-title">
                        <BreadcrumbItem to="/">电子产品</BreadcrumbItem>
                    </div>
                    <div class="index-menu-breadcrumb-title">
                        <BreadcrumbItem to="/">电子产品</BreadcrumbItem>
                    </div>
                    <div class="index-menu-breadcrumb-title">
                        <BreadcrumbItem to="/">电子产品</BreadcrumbItem>
                    </div>
                    <div class="index-menu-breadcrumb-title">
                        <BreadcrumbItem to="/">电子产品</BreadcrumbItem>
                    </div>
                </Breadcrumb>
            </div>
        </div>
        <p style="clear: both"></p>
        <div>
            <hr class="index-hr"></hr>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .index-menu{
        width: 195px;
        margin-left: 45px;
        float: left;
    }
    .index-menu-title{
        margin-left: 30px;
        margin-right: 30px;
        font-size: 16px;
    }
    .index-menu-breadcrumb{
        float: left;
        margin-top: 15px;
    }
    .index-menu-breadcrumb-title{
        margin-left: 50px;
        font-size: 16px;
        font-weight: bold;
        float: left;
    }
    .index-hr{
        height:1px;
        margin-top: -5px;
        margin-bottom: 5px;
        border:none;
        border-top:3px solid  #515A6E;
    }
</style>
