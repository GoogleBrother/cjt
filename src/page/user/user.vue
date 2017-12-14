<template>
  <div class="user">
    <div class="user-top bg-f flex" @click="$router.push({path:'/myInfo'})">
      <div class="user-topWap flex1 flex">
        <div class="user-header">
          <img v-if="userInfo.pic" :src="userInfo.pic">
        </div>
        <div v-if="logins">
          <h2>{{userInfo.name}}</h2>
          <p>{{userInfo.phone}}</p>
        </div>
        <div v-else="">
          <h2>未登录</h2>
          <p>请先登录账号</p>
        </div>
      </div>
      <i class="icon" style="font-size: .3rem"></i>
    </div>

    <titleBar :title="'我的黄金'" :gold="weight"></titleBar>

    <div class="user-btn flex bg-f">
      <div class="user-btnItem flex flex1 border-right" @click="sellGold">
        <img src="../../assets/images/user/sale@2x.png" >
        <div>
          <h2>卖金提现</h2>
          <p>把黄金换钱</p>
        </div>
      </div>
      <div class="user-btnItem flex flex1" @click="$router.push({path:'/changeGold'})">
        <img src="../../assets/images/user/buy@2x.png" >
        <div>
          <h2>提金兑换</h2>
          <p>兑换新首饰</p>
        </div>
      </div>
    </div>

    <titleBar :title="'我的订单'" :links="true" v-on:goto="$router.push({path:'/orderList/0'})"></titleBar>

    <ul class="orderList flex bg-f">
      <li class="flex1" @click="$router.push({path:'/orderList/1'})">
        <em class="dqh"><!--<i>9</i>--></em>
        <p>待取货</p>
      </li>
      <li class="flex1" @click="$router.push({path:'/orderList/2'})">
        <em class="djc"><!--<i>8</i>--></em>
        <p>待检测</p>
      </li>
      <li class="flex1" @click="$router.push({path:'/orderList/3'})">
        <em class="dqr"><!--<i>6</i>--></em>
        <p>待确认</p>
      </li>
      <li class="flex1" @click="$router.push({path:'/orderList/4'})">
        <em class="dsk"><!--<i>2</i>--></em>
        <p>待收款</p>
      </li>
      <li class="flex1" @click="$router.push({path:'/orderList/5'})">
        <em class="dsh"><!--<i>1</i>--></em>
        <p>待收货</p>
      </li>
    </ul>

    <div class="mt3 bg-f">
      <div class="titleBar userBar flex bg-f border-bottom" @click="$router.push({path:'/bankList'})">
        <div class="titleWarp">
          <em class="yhk"></em>
          <span>银行卡</span>
        </div>
        <i class="icon" @click=""></i>
      </div>
      <div class="titleBar userBar flex bg-f border-bottom" @click="$router.push({path:'/addressList'})">
        <div class="titleWarp">
          <em class="cydz"></em>
          <span>常用地址</span>
        </div>
        <i class="icon" @click=""></i>
      </div>
      <div class="titleBar userBar flex bg-f border-bottom" @click="$router.push({path:'/FAQ'})">
        <div class="titleWarp">
          <em class="cjwt"></em>
          <span>常见问题</span>
        </div>
        <i class="icon" @click=""></i>
      </div>
      <div class="titleBar userBar flex bg-f border-bottom" @click="$router.push({path:'/about'})">
        <div class="titleWarp">
          <em class="gywm"></em>
          <span>关于我们</span>
        </div>
        <i class="icon" @click=""></i>
      </div>
    </div>

  </div>
</template>
<script type="es6">
  import titleBar from '../../components/titleBar.vue'
  export default {
    components:{
      titleBar
    },
    mounted () {
      this.$emit('viewIn', 'tab4');
    },
    activated () {
      this.$emit('viewIn', 'tab4');
      // 判断是否登录;
      if (!sessionStorage.getItem('Authorization')) {
        this.logins = false;
      } else {
        this.logins = true;
        this.getUserInfo();
        this.getUserGold();
        this.getBankList();
      }
    },
    data () {
      return {
        weight: '',
        noBank: false,
        logins: '',
        userInfo: ''
      }
    },
    methods: {
      // 获取用户黄金克数；
      getUserGold () {
        this.service('/user/queryCurrentAccount', {}, response => {
          let res = response.data;
          this.weight = (res.weight).toFixed(3);
        });
      },
      sellGold () {
        if (this.noBank) {
          const that = this;
          this.$vux.confirm.show({
            title: '提示',
            content: '请先绑定银行卡',
            onCancel () {

            },
            onConfirm () {
              that.$router.push({path:'/addBankCard'})
            }
          });
        } else {
          this.$router.push({path:'/sellGold'})
        }
      },
      getBankList () {
        this.service('/user/queryBankCard', {}, response => {
          let res = response.data;
          if( !res[0]){
            this.noBank = true;
          }
        });
      },
      getUserInfo () {
        this.service('/user/queryUserInfo', {}, response => {
          let res = response.data;
            this.userInfo = res;
        });
      },
    }
  }
</script>
<style>
  .user-top{
    padding: .4rem .36rem .4rem .44rem;
    justify-content: space-between;
    align-items: center;
  }
  .user-topWap{
    align-items: center;
  }
  .user-header{
    width: 1.28rem;
    height: 1.28rem;
    border-radius: 50%;
    margin-right: .32rem;
    overflow: hidden;
    background: url("../../assets/images/user/defaul.png")no-repeat center;
    background-size: 100%;
  }
  .user-header img{
    display: block;
    width: 1.28rem;
    height: 1.28rem;
  }
  .user-top h2{
    font-size: .3rem;
    color: #333;
    line-height: .42rem;
  }
  .user-top p{
    font-size: .24rem;
    color: #999;
    line-height: .42rem;
  }
  .user-top i{
    font-size: .3rem;
  }
  .user-btn{
    height: 1.46rem;
    font-size: .34rem;
    color: #333;
    text-align: center;
  }
  .user-btnItem{
    align-items: center;
    text-align: left;
  }
  .user-btnItem img{
    display: block;
    width: .72rem;
    height: .72rem;
    margin-right: .32rem;
    margin-left: .48rem;
  }
  .user-btnItem h2{
    font-size: .34rem;
  }
  .user-btnItem p{
    font-size: .24rem;
    color: #999;
  }
  .orderList{
    padding: .27rem .3rem;
  }
  .orderList li{
    font-size: .24rem;
    color: #333;
    line-height: .34rem;
    /*margin-right: .72rem;*/
    width: 1.12rem;
    position: relative;
    text-align: center;
  }
  .orderList li img{
    display: block;
    width: 1.12rem;
    height: .79rem;
    margin: 0 auto;
  }
  .orderList li em {
    display: block;
    width: .72rem;
    height: .72rem;
    margin: 0 auto .14rem;
    position: relative;
  }
  .orderList li em.dqh {
    background: url("../../assets/images/user/dqh.png")no-repeat center;
    background-size: 100%;
  }
  .orderList li em.djc{
    background: url("../../assets/images/user/djy.png")no-repeat center;
    background-size: 100%;
  }
  .orderList li em.dqr{
    background: url("../../assets/images/user/dqr.png")no-repeat center;
    background-size: 100%;
  }
  .orderList li em.dsk{
    background: url("../../assets/images/user/dsk.png")no-repeat center;
    background-size: 100%;
  }
  .orderList li em.dsh{
    background: url("../../assets/images/user/dsh.png")no-repeat center;
    background-size: 100%;
  }
  .orderList li i{
    display: block;
    width: .32rem;
    height: .32rem;
    border-radius: 50%;
    background-color: #FF6D39;
    font-size: .28rem;
    color: #FFF;
    text-align: center;
    line-height: .32rem;
    position: absolute;
    top: -0.05rem;
    right: 0rem;
  }
  .titleBar.userBar{
    padding: .32rem 0 .3rem 0;
    margin-left: .38rem;
  }
  .titleBar em{
    display: inline-block;
    width: .48rem;
    height: .48rem;
    background-color: #EFAE41;
    margin-right: .26rem;
  }
  .titleBar em.yhk{
    background: url("../../assets/images/user/yhk.png")no-repeat center;
    background-size: 100%;
  }
  .titleBar em.cydz{
    background: url("../../assets/images/user/cydz.png")no-repeat center;
    background-size: 100%;
  }
  .titleBar em.cjwt{
    background: url("../../assets/images/user/cjwt.png")no-repeat center;
    background-size: 100%;
  }
  .titleBar em.gywm{
    background: url("../../assets/images/user/gy.png")no-repeat center;
    background-size: 100%;
  }
  .user-top i.icon{
    display: block;
    margin-left: .3rem;
    width: .12rem;
    height: .24rem;
    background: url("../../assets/images/common/jt.png")no-repeat center;
    background-size: 100%;
  }
</style>
