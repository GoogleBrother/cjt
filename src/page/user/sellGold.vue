<template>
  <div class="sellGold">
    <div class="sellBox bg-f">
      <p class="sellText f-28 c-3 txc"><span>实时金价(元/克)</span></p>
      <h2 class="sellTitle txc">{{price}}</h2>
      <div class="sellMoney">
        <h4 class="sellProm f-24 c-y">可卖出黄金{{myWeight}}克</h4>
        <div class="sellPrice flex border-bottom">
          <p class=""><input v-model="weight" @input="inputValidate()" maxLength="9" placeholder="请输入克重(g)" /></p>
          <span @click="sellAll">全部卖出</span>
        </div>
        <div class="sellPopup" v-show="weight >= 0 && weight !== ''">
          <i class="triangle-up"></i>
          <span class="sellPopup-text">预估金额：{{(price*weight).toFixed(3)}}元  手续费：0.00元</span>
        </div>
      </div>
    </div>

    <div class="sellPriceBox bg-f">
      <div class="sellMinPrice flex">
        <h2>最低卖出价格</h2>
        <div class="sellComputations flex">
          <a @click="reduce" class="c-9">-</a>
          <span class="f-28 c-y">{{minPrice}}元/克</span>
          <a @click="add" class="c-9">+</a>
        </div>
      </div>
      <p class="f-24 c-9">最终成交价格≥{{minPrice}}元/克</p>
    </div>

    <div class="consent">
      <p  @click="select = !select"><i :class="{agree: select, disagree: !select }"></i>已阅读并同意<a @click.stop="$router.push({path:'/protocol'})">《黄金消费服务协议》</a></p>
    </div>

    <btnFly :title="'立即提现'" v-on:doIt="doIt"></btnFly>

  </div>
</template>
<script type="es6">
  import btnFly from '../../components/btnFly.vue'
  export default {
    name: 'sell',
    components: {
      btnFly
    },
    data () {
      return {
        select: false,
        minPrice: '',
        weight: '',
        myWeight: '',
        price: ''
      }
    },
    computed : {
    },
    mounted () {
      this.getPrice();
      this.getUserGold();
    },
    methods: {
      reduce () {
        if(this.minPrice){
          let price = (parseFloat(this.minPrice)-0.1).toFixed(2);
          if (price > 0) {
            this.minPrice = price;
          }
        }
      },
      add () {
        if(this.minPrice){
          let price = (parseFloat(this.minPrice)+0.1).toFixed(2);
          if (price > 0) {
            this.minPrice = price;
          }
        }
      },
      sellAll () {
        this.weight = this.myWeight;
      },
      inputValidate () {
        this.weight = this.validate(this.weight,false);
      },
      // 获取金价；
      getPrice () {
        const that = this;
        this.service('/price/queryGoldPrice', {}, response => {
          let res = response.data;
          that.price = res.goldPrice;
          that.minPrice = res.goldPrice - 0.5;
        });
      },
      // 获取用户黄金克数；
      getUserGold () {
        this.service('/user/queryCurrentAccount', {}, response => {
          let res = response.data;
          this.myWeight = res.weight;
        });
      },
      // 点击卖金;
      doIt () {
        if (this.weight <= 0) {
          this.$vux.alert.show({
            content: '请输入卖金克重'
          });
        }else if(this.myWeight < this.weight) {
          this.$vux.alert.show({
            content: '卖金克重不能高于可卖克重'
          });
        } else {
          this.addCurrentOrder();
        }
      },
      // 生成卖金订单；
      addCurrentOrder () {
        this.service('/order/addCurrentOrder', {
          weight: this.weight,
          minPrice: this.minPrice
        }, response => {
          let res = response.data;
          /*this.weight = res.weight;*/
          let sellGoldResults = JSON.stringify(res);
          sessionStorage.setItem('sellGoldResults',sellGoldResults);
          this.$router.push({path:'/sellGoldSucceed/' + res.code})
        });
      },
      validate (val,isMoney) {
        if(val.length >= 0){
          let n = isMoney ? 2 : 3;
          let _val = val.replace(/[^\d\.]/g,"").replace(/^[\.]/g,'').replace(/^0+[1-9]/,'');
          if(_val.split(".").length >= 2){
            let _vals = _val.split(".");
            let integer = _vals[0],
              decimal = _vals[1];
            _val = integer+"."+decimal.substring(0,n);
          }
          return _val;
        } else {
          return 0
        }
      },
    }
  }
</script>
<style>
  .sellGold{
    padding-top: .2rem;
  }
  .sellBox{
    margin: 0 .2rem .2rem .2rem;
    padding: .32rem 0 .42rem;
    border-radius: .04rem;
    box-shadow: 0 .08rem .12rem 0 rgba(225,225,225,0.50);
  }
  .sellTitle{
    font-size: .9rem;
    line-height: 1.26rem;
    color: #EDA835;
    font-weight: bold;
  }
  .sellText{
    line-height: .4rem;
    margin-top: .06rem;
  }
  .sellText span{
    background: url("../../assets/images/user/sellGold/na.png")no-repeat left center;
    background-size: .24rem .24rem;
    padding-left: .3rem;
  }
  .sellMoney{
    margin-top: .42rem;
    padding: 0 .32rem;
    position: relative;
  }
  .sellPrice{
    align-items: center;
    justify-content: space-between;
    padding: .44rem 0 .2rem ;
  }
  .sellPrice p{
    font-size: .36rem;
    color: #333333;
    font-weight: bold;
  }
  .sellPrice p input{
    width: 100%;
    height: 100%;
  }
  .sellPrice span{
    font-size: .28rem;
    color: #EDA835;
  }
  .sellPopup{
    font-size: 0;
    position: absolute;
    bottom: -.2rem;
  }
  .sellPopup .triangle-up{
    display: block;
    margin-left: .2rem;
    font-size: 0;
    width: 0;
    height: 0;
    border-left: .15rem solid transparent;
    border-right: .15rem solid transparent;
    border-bottom: .15rem solid #FFD71E;
  }
  .sellPopup .sellPopup-text{
    background-color: #FFD71E;
    border-radius: .04rem;
    height: .3rem;
    line-height: .3rem;
    font-size: .22rem;
    color: #666666;
    padding: .05rem .15rem;
  }
  .sellPriceBox{
    padding: .24rem .4rem;
  }
  .sellPriceBox h2{
    font-size: .3rem;
    color: #333333;
    line-height: .42rem;
  }
  .sellMinPrice{
    justify-content: space-between;
  }
  .sellComputations{
    align-items: center;
    padding-top: .24rem;
  }
  .sellComputations a{
    font-size: .34rem;
  }
  .sellComputations a:first-child{
    padding-right: .2rem;
  }
  .sellComputations a:last-child{
    padding-left: .2rem;
  }
  .consent{
    padding-left: .4rem;
    margin-top: .16rem;
  }
  .consent p{
    font-size: .22rem;
    color: #999999;
    display: flex;
    align-items: center;
  }
  .consent p i{
    display: inline-block;
    width: .24rem;
    height: .24rem;
    margin-right: .08rem;
  }
  .consent p i.agree{
    background: url("../../assets/images/user/address/rb_nor@2x.png")no-repeat left center;
    background-size: .24rem .24rem;
  }
  .consent p i.disagree{
    background: url("../../assets/images/user/address/rb_pre@2x.png")no-repeat left center;
    background-size: .24rem .24rem;
  }
</style>
