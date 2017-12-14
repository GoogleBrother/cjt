<template>
  <div class="conventionSucceed">
    <div class="box-wap bg-f">
      <img src="../../assets/images/reclaim/success1@2x.png"/>
      <p>已提交退金申请</p>
      <a>请等待收货</a>
    </div>

    <ul class="conventionOrder bg-f">
      <li class="flex">
        <p>订单编号</p>
        <span>{{detail.code}}</span>
      </li>
      <!--<li class="flex">
        <p>品类</p>
        <span></span>
      </li>-->
      <li class="flex">
        <p>件数</p>
        <span>{{detail.num}}件</span>
      </li>
      <li class="flex">
        <p>克重</p>
        <span>{{detail.weight}}克</span>
      </li>
      <li class="flex">
        <p>申请退货时间</p>
        <span>{{parseInt($route.query.time) |timeStr}}</span>
      </li>
    </ul>

    <btn :title="'查看我的订单'" :isEnd="false" v-on:doIt="doIt"></btn>
    <p class="returnHome" @click="$router.push({path:'/home'})">返回首页</p>

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
        detail: ''
      }
    },
    mounted () {
      this.getDetail();
    },
    computed: {
      down () {
        if (true){
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      doIt () {
        if (!this.down){
          this.$router.push({path:'/orderList/5'})
        }
      },
      getDetail () {
        this.service('/order/queryRecycleOrder', {
          code: this.$route.params.id
        }, response => {
          let res = response.data;
          this.detail = res;
        });
      },
    }
  }
</script>
<style>
</style>
