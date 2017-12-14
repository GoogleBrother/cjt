<template>
  <div class="changeGoldSucceed">
    <div class="box-wap bg-f">
      <img src="../../assets/images/reclaim/success1@2x.png"/>
      <p>存入账户成功</p>
      <!--<a>等待工作人员上门取金</a>-->
    </div>

    <ul class="conventionOrder bg-f">
      <li class="flex">
        <p>订单编号</p>
        <span>{{code}}</span>
      </li>
      <li class="flex">
        <p>总克重</p>
        <span>{{detail.weight}}克</span>
      </li>
      <li class="flex">
        <p>存入时间</p>
        <span>{{detail.time | timeStr}}</span>
      </li>
    </ul>

    <btn :title="'查看黄金资产'" :isEnd="false" v-on:doIt="doIt"></btn>
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
        code: '',
        detail: ''
      }
    },
    mounted () {
      this.code = this.$route.params.id;
      this.detail = JSON.parse(sessionStorage.getItem('orderReportResults'));
    },
    methods: {
      doIt () {
        if (!this.down){
          this.$router.push({path:'/home/user'})
        }
      },
    }
  }
</script>
<style>

</style>
