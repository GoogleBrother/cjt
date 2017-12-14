<template>
  <div class="conventionSucceed">
    <div class="box-wap bg-f">
      <img src="../../assets/images/reclaim/success1@2x.png"/>
      <p>预约成功</p>
      <a>等待工作人员上门取金</a>
    </div>

    <ul class="conventionOrder bg-f">
      <li class="flex">
        <p>订单编号</p>
        <span>{{detail.code}}</span>
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
      this.getDetail();
    },
    methods: {
      doIt () {
        if (!this.down){
          this.$router.push({path:'/orderList/1'})
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
</style>
