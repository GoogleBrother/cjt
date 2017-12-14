<template>
  <div class="orderDetail">

    <div class="odTopWap bg-f">
      <div class="od-top flex border-bottom">
        <p>取金地址</p>
        <div class="flex1">
          <h2>{{detail.name}}<span>{{detail.phone}}</span></h2>
          <h3>{{detail.address}}</h3>
        </div>
      </div>
    </div>


    <div class="odCont bg-f">
      <div class="odType border-bottom">
        <p>订单状态</p>
        <span>{{states(detail.state)}}</span>
      </div>
      <div class="odImage flex">
        <img :src="detail.pic">
        <div class="flex1">
          <h2>{{detail.productName}}</h2>
          <p>规格：{{detail.weight}}g</p>
        </div>
      </div>
      <ul class="conventionOrder bg-f">
        <li class="flex">
          <p>订单编号</p>
          <span>{{detail.code}}</span>
        </li>
        <li class="flex">
          <p>件数</p>
          <span>{{detail.num}}件</span>
        </li>
        <li class="flex">
          <p>克重</p>
          <span>{{detail.weight}}克</span>
        </li>
        <li class="flex">
          <p>运费</p>
          <span>{{detail.labourFee}}元</span>
        </li>
        <li class="flex">
          <p>工费</p>
          <span>{{detail.expressFee}}元</span>
        </li>
        <li class="flex">
          <p>预约时间</p>
          <span>{{detail.time | timeStr}}</span>
        </li>
      </ul>
    </div>

    <btn :title="'返回首页'" :isEnd="false" v-on:doIt="$router.push({path:'/home'})"></btn>


  </div>
</template>
<script type="es6">
  import btn from '../../components/btn.vue'
  export default {
    components: {
      btn
    },
    data () {
      return {
        code: '',
        detail: ''
      }
    },
    mounted () {
      this.code = this.$route.params.code;
      this.getDetail();
    },
    methods: {
      getDetail () {
        this.service('/order/queryPhysicalOrder', {
          code: this.code
        }, response => {
          let res = response.data;
          this.detail = res;
        });
      },
      states (a) {
        let num = parseInt(a);
        switch (num) {
          case 1:
            return '待发货';
            break;
          case 2:
            return '待收货';
            break;
          case 3:
            return '已完成';
            break;
        }
      },
    }
  }
</script>
<style>
  .odTopWap{
    padding-left: .26rem;
  }
  .od-top{
    align-items: center;
    padding: .24rem .18rem .28rem 0;
  }
  .od-top p{
    font-size: .28rem;
    color: #333333;
    margin-right: .3rem;
  }
  .od-top h2{
    font-size: .28rem;
    color: #333333;
    line-height: .4rem;
    padding-bottom: .14rem;
  }
  .od-top h3{
    font-size: .24rem;
    color: #666;
    line-height: .34rem;
  }
  .odCont{
    margin-top: .2rem;
  }
  .odType{
    display: flex;
    height: 1.1rem;
    align-items: center;
    justify-content: space-between;
    margin-left: .3rem;
    padding: 0 .3rem 0 0;
  }
  .odType p{
    font-size: .28rem;
    color: #333333
  }
  .odType span{
    font-size: .24rem;
    color: #EDA835;
  }
  .orderDetail .conventionOrder{
    padding-top: .26rem;
  }
  .odImage{
    padding-left: .3rem;
    padding-top: .32rem;
  }
  .odImage img{
    display: block;
    width: 1.8rem;
    height: 1.8rem;
    margin-right: .38rem;
  }
  .odImage h2{
    font-size: .32rem;
    color: #333333;
    padding-bottom: .28rem;
  }
  .odImage p{
    font-size: .24rem;
    color: #999999;
  }
</style>
