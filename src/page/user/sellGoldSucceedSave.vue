<template>
  <div class="sellGoldSucceed">
    <!-- 存金直接体现成功 -->
    <div class="sellProgress flex bg-f">
      <img src="../../assets/images/user/progress.png">
      <div class="sellProText flex1">
        <div class="proText">
          <h2>提现申请已提交，等待银行处理</h2>
          <p>提现金额{{detail.amount}}元</p>
          <span>{{detail.time | timeStr}}</span>
        </div>
        <div class="proText">
          <h2>预计到账时间</h2>
          <span>{{detail.dzTime | timeStr}}</span>
        </div>
      </div>
    </div>



    <btn :title="'查看黄金资产'" :isEnd="false" v-on:doIt="doIt"></btn>
    <p class="returnHome" @click="$router.push({path:'/home'})">返回首页</p>

  </div>
</template>
<script type="es6">
  import btn from '../../components/btn.vue'
  import { Flow,  FlowLine, FlowState } from 'vux'
  export default {
    components: {
      btn,
      Flow,
      FlowState,
      FlowLine
    },
    computed: {

    },
    data () {
      return {
        detail: '',
      }
    },
    mounted () {
      this.detail = JSON.parse(sessionStorage.getItem('orderReportResults'));
    },
    methods: {
      doIt () {
          this.$router.push({path:'/home/user'})
      },
    }
  }
</script>
<style>
  .sellProText{
    font-size: 0;
    padding-left: .3rem;
  }
  .sellProgress{
    padding: .74rem 0 .4rem .4rem;
  }
  .sellProgress img{
    display: block;
    width: .44rem;
    height: 2.24rem;
  }
  .proText:last-child{
    margin-top: .68rem;
  }
  .proText h2{
    font-size: .28rem;
    color: #EDA835;
    line-height: .4rem;
  }
  .proText p{
    font-size: .24rem;
    color: #333;
    line-height: .34rem;
  }
  .proText span{
    font-size: .24rem;
    color: #666;
    line-height: .34rem;
  }
</style>
