<template>
  <div class="changeGold">
    <ul class="flex">
      <li v-for="item in goodsList" class="bg-f" @click="$router.push({path:'/changeGoldDetail/'+item.productId})">
        <img :src="item.logo">
        <p>{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>
<script type="es6">
  export default {
    data () {
      return {
        goodsList: ''
      }
    },
    mounted () {
      this.getGoodsList();
    },
    methods: {
      getGoodsList () {
        this.service('/product/queryPhysicalProductList', {}, response => {
          let res = response.data;
          this.goodsList = res;
        });
      }
    }
  }
</script>
<style>
  .changeGold ul{
    flex-wrap: wrap;
  }
  .changeGold ul li{
    width: 50%;
    padding: .36rem 0 .44rem;
    border-bottom: .01rem solid #d8d8d8;
    border-right: .01rem solid #d8d8d8;
  }
  .changeGold ul li img{
    display: block;
    width: 3rem;
    height: 2.4rem;
    margin: 0 auto;
  }
  .changeGold ul li p{
    font-size: .28rem;
    color: #333;
    line-height: .4rem;
    text-align: center;
    padding-top: .16rem;
  }
</style>
