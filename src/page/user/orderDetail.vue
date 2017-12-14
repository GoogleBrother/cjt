<template>
  <div class="orderDetail">
    <!--回收存金订单-->
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
      <ul class="conventionOrder bg-f">
        <li class="flex">
          <p>订单编号</p>
          <span>{{code}}</span>
        </li>
        <li class="flex">
          <p>品类</p>
          <span>{{types(detail.type)}}</span>
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
          <p>预约时间</p>
          <span>{{detail.time}}</span>
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
    computed: {
    },
    methods: {
      getDetail () {
        this.service('/order/queryRecycleOrder', {
          code: this.code
        }, response => {
          let res = response.data;
          this.detail = res;
        });
      },
      // 状态;
      states (num) {
        switch (num) {
          case 1:
            return '待取货';
            break;
          case 2:
            return '待检测';
            break;
          case 3:
            return '待确认';
            break;
          case 4:
            return '待退货';
            break;
          case 5:
            return '已完成';
            break;
        }
      },
      // 品类;
      types (a) {
        let num = parseInt(a);
        switch (num) {
          case 0:
            return '多种品类';
            break;
          case 1:
            return '吊坠';
            break;
          case 2:
            return '手链';
            break;
          case 3:
            return '项链';
            break;
          case 4:
            return '耳饰';
            break;
          case 5:
            return '戒指';
            break;
          case 6:
            return '金条';
            break;
          case 7:
            return '金币';
            break;
          case 8:
            return '转运珠';
            break;
          case 9:
            return '金钞';
            break;
        }
      }
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
  .od-top h2 span{
    margin-left: .3rem;
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
