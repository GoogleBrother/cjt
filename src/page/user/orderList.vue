<template>
  <div class="myOrderList">

    <div v-if="list.length > 0 && list[0] !== null" class="myOrderListWap bg-f">
      <div v-for="item in list" class="orderBox border-bottom flex" @click="gotoDetail(item.type,item.state,item.code)">
        <img v-if="item.pic" :src="item.pic">
        <img v-else="" src="../../assets/images/user/order/order_pic@2x.png">
        <div class="flex1">
          <div class="orderTitle flex flex1">
            <h2 class="flex1 text-ep">{{item.code}}</h2>
            <span>{{states(item.type,item.state)}}</span>
          </div>
          <div class="orderCont flex">
            <div>
              <p v-if="parseInt($route.params.id) !== 4">克重：{{item.weight}}g</p>
              <p v-if="parseInt($route.params.id) !== 4">件数：共{{item.num}}件</p>
            </div>
            <h4>{{item.time | timeStr}}</h4>
          </div>
        </div>
      </div>
    </div>

    <noData v-if="list.length <= 0" :content="'暂无订单喔'"></noData>

  </div>
</template>
<script type="es6">
  import noData from '../../components/noData.vue'
  export default {
    components: {
      noData
    },
    data () {
      return {
        list: [null],
      }
    },
    mounted () {
      this.getOrderList();
    },
    computed: {

    },
    methods: {
      getOrderList () {
        this.service('/order/queryOrderList', {
          type: this.$route.params.id
        }, response => {
          let res = response.data;
          this.list = res;
        });
      },
      // 1：存金订单详情 2：提现订单详情 3：卖金订单详情 4：提金订单详情 5:待确定-检测报告详情
      gotoDetail (type, state, code) {
        if (type === 1) {
          if (state === '3') {
            // 存金订单
            this.$router.push({path:'/orderReport/'+code})
          } else {
            // 检测报告
            this.$router.push({path:'/orderDetail/'+code})
          }
        } else if (type === 2) {
          // 提金变现订单
          this.$router.push({path:'/orderDetailCash/'+code})
        } else if (type === 3) {
          // 卖金订单
          this.$router.push({path:'/orderDetailMoney/'+code})
        } else if (type === 4) {
          // 提金换金订单
          this.$router.push({path:'/orderDetailExchange/'+code})
        }
      },
      states (a, b) {
        let type = parseInt(a);
        let state = parseInt(b);
        switch (type) {
          case 1:
            switch (state) {
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
            break;
          case 2:
            switch (state) {
              case 1:
                return '待收款';
                break;
              case 2:
                return '银行处理中';
                break;
              case 3:
                return '已完成';
                break;
            }
            break;
          case 3:
            switch (state) {
              case 1:
                return '已完成';
                break;
            }
            break;
          case 4:
            switch (state) {
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
            break;
        }
      }
    }
  }
</script>
<style>
  .myOrderList{
    min-height: 100%;
  }
  .myOrderListWap{
    padding-left: .2rem;
  }
  .orderBox{
    padding: .38rem .26rem .4rem 0;
    align-items: center;
  }
  .orderBox img{
    display: block;
    width: 1.32rem;
    height: 1.32rem;
    margin-right: .26rem;
  }
  .orderTitle{
    align-items: center;
    justify-content: space-between;
    padding-bottom: .28rem;
  }
  .orderTitle h2{
    font-size: .3rem;
    color: #000000;
    line-height: .42rem;
  }
  .orderTitle span{
    font-size: .24rem;
    color: #EDA835;
    line-height: .34rem;
  }
  .orderCont{
    justify-content: space-between;
    align-items: flex-end;
  }
  .orderCont p{
    font-size: .24rem;
    color: #666666;
    line-height: .34rem;
  }
  .orderCont h4{
    font-size: .24rem;
    color: #666666;
    line-height: .34rem;
  }
</style>
