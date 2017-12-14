<template>
  <div class="orderDetail">
    <!--卖金订单-->
    <div class="odCont bg-f">
      <div class="odType border-bottom">
        <p>订单状态</p>
        <span>已完成</span>
      </div>
      <ul class="conventionOrder bg-f">
        <li class="flex">
          <p>订单编号</p>
          <span>{{detail.code}}</span>
        </li>
        <li class="flex">
          <p>成交克重</p>
          <span>{{detail.weight}}克</span>
        </li>
        <li class="flex">
          <p>成交金价</p>
          <span>{{detail.price}}元</span>
        </li>
        <li class="flex">
          <p>成交金额</p>
          <span class="c-y">{{detail.amount}}元</span>
        </li>
        <li class="flex">
          <p>交易时间</p>
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
        this.service('/order/queryCurrentOrder', {
          code: this.code
        }, response => {
          let res = response.data;
          this.detail = res;
        });
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
</style>
