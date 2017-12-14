<template>
  <div class="changeGoldSucceed">
    <div class="box-wap bg-f">
      <img src="../../assets/images/reclaim/success1@2x.png"/>
      <p>提金成功</p>
      <a>等待收货</a>
    </div>

    <ul class="conventionOrder bg-f">
      <li class="flex">
        <p>订单编号</p>
        <span>{{detail.code}}</span>
      </li>
      <li class="flex">
        <p>名称</p>
        <span>{{detail.productName}}</span>
      </li>
      <li class="flex">
        <p>规格</p>
        <span>{{detail.weight}}克</span>
      </li>
      <li class="flex">
        <p>件数</p>
        <span>{{detail.num}}个</span>
      </li>
      <li class="flex">
        <p>总克重</p>
        <span>{{detail.num*detail.weight}}克</span>
      </li>
      <li class="flex">
        <p>工费</p>
        <span>{{detail.labourFee}}元</span>
      </li>
      <li class="flex">
        <p>运费</p>
        <span>{{detail.expressFee}}元</span>
      </li>
      <li class="flex">
        <p>下单时间</p>
        <span>{{detail.time | timeStr}}</span>
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
    computed: {
      down () {
        if (true){
          return false
        } else {
          return true
        }
      }
    },
    data () {
      return {
        detail: ''
      }
    },
    mounted () {
      this.detail = JSON.parse(sessionStorage.getItem('changeGoldResults'));
    },
    methods: {
      doIt () {
        if (!this.down){
          this.$router.push({path:'/orderList/5'})
        }
      },
      /*getDetail () {
        this.service('/order/queryPhysicalOrder', {
          code: this.$route.params.id
        }, response => {
          let res = response.data;
          this.detail = res;
        });
      },*/
    }
  }
</script>
<style>

</style>
