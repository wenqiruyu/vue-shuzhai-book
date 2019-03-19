<template>
    <div>
        <footer class="footer">
            <div class="clearfix"></div>
            <div class="service-intro">
            <div class="friend-link">
                <div class="friend-link-item">
                    <ul>
                        <li v-for="(link, index) in moreLink" :key="index">
                            <span :class="[linkItemClass, {'link-last-item': index === 9}]">{{link}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="clearfix"></div>
                <div class="copyright">
                    <p>Copyright © 2019 书斋网 by 刘应兴 让阅读成为习惯</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      linkItemClass: 'link-item',
      moreLink: [
        '关于我们', '联系我们', '联系客服', '合作招商', '商家帮助', '营销中心', '销售联盟', '校园社区', '风险监测', '隐私政策'
      ]
    };
  }
};
</script>

<style scoped>
    .footer {
        height: 150px;
        margin-top: 30px;
        background-color: #F9F9F9;
    }
    .friend-link {
        display: flex;
        align-items: center;
        width: 1516px;
        height: 30px;
        margin: 0px auto;
        color: #666;
        border-top: 1px solid #b2dfdb;
    }
    .friend-link-item {
        margin: 0px auto;
    }
    .friend-link-item ul {
    list-style: none;
    }
    .friend-link-item li {
        padding: 5px 0px;
        float: left;
    }
    .link-item {
        padding: 0px 8px;
        cursor: pointer;
        border-right: 1px solid #ccc;
    }
    .link-last-item {
        border: none;   
    }
    .copyright {
        width: 100%;
        color: #666;
        line-height: 30px;
        text-align: center;
    }
    .copyright a{
        color: #232323;
        font-size: 20px;
    }
</style>