<template>
  <div class="changeGoldDetail bg-f">

    <!--<div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="item in logoList" class="swiper-slide"><img class="brand" :src="item"></div>
     </div>
      <div class="swiper-pagination"></div>
    </div>-->

    <div class="detailBanner">
      <swiper auto loop dots-position="center"  @on-index-change="">
        <swiper-item v-for="(item, index) in logoList" :key="index">
          <img :src="item">
        </swiper-item>
      </swiper>

    </div>

    <div class="cg-text">
      <h2>{{detail.name}}</h2>
      <!--<p><span>￥</span>100~1000</p>-->
    </div>

    <div class="detailImg">
      <img :src="detail.pic" >
    </div>


    <btnFly :title="'立即提金'" v-on:doIt="show=true"></btnFly>


      <popup v-model="show">
        <div class="popupWap">
          <div class="popTop flex border-bottom">
            <img :src="logoList[0]">
            <p>{{detail.name}}</p>
            <i @click="show = false"></i>
          </div>
          <div class="popMid">
            <h2>规格</h2>
            <ul class="flex">
              <li :class="{select: index === i}" v-for="(item,i) in list" @click="index = i">{{item}}</li>
            </ul>
            <div class="popNum flex">
              <p>数量</p>
              <div class="add-wrap flex">
                  <span class="flex1" @click='showNum("-")'>-</span>
                  <span class="flex1">{{buyNum}}</span>
                  <span class="flex1"  @click='showNum("+")'>+</span>
              </div>
            </div>

            <div class="enterWap">
              <btn :title="'确定'" :isEnd="down" v-on:doIt="doIt"></btn>
            </div>

          </div>
        </div>
      </popup>

  </div>
</template>
<script type="es6">
  import btnFly from '../../components/btnFly.vue'
  import { Swiper, Scroller, SwiperItem} from 'vux'
  import btn from '../../components/btn.vue'
  import { TransferDom, Popup, Group, XSwitch} from 'vux'
  let galleryTop;
  export default {
    name: 'main',
    components: {
      btn,
      btnFly,
      TransferDom,
      Group,
      Popup,
      XSwitch,
      Swiper,
      Scroller,
      SwiperItem
    },
    data () {
      return {
        show: false,
        showToast: '',
        list:['1.570g','1.570g','1.570g','1.570g','1.570g','1.570g'],
        index: 0,
        buyNum: 1,
        detail: '',
        logoList: []
      }
    },
    computed : {
      down () {
        if (true){
          return false
        } else {
          return true
        }
      },
    },
    mounted () {
      this.getDetail();
    },
    methods: {
      lunbo () {
        let galleryTop = new Swiper('.swiper-container', {
          pagination : '.swiper-pagination',
          loop: false,
        });
      },
      //数量加减
      showNum(flag){
        this.buyNum = Number(this.buyNum);
        if (flag === "+") {
          this.buyNum += 1;
        }
        if (flag === "-") {
          if (this.buyNum<=1) {
            return false;
          }
          this.buyNum -= 1;
        }
      },
      doIt () {
        if (!this.down){
          let changeGoldParams = {
            num: this.buyNum,
            weight: this.detail.weight,
            labourFee: this.detail.labourFee,
            expressFee: this.detail.expressFee,
            name: this.detail.name,
            productId: this.$route.params.id
          };
          changeGoldParams = JSON.stringify(changeGoldParams);
          sessionStorage.setItem('changeGoldParams',changeGoldParams);
          this.$router.push({path:'/changeGoldOrder'})
        }
      },
      getDetail (callBack) {
        this.post('/product/queryPhysicalProduct', {
          productId: this.$route.params.id
        }, response => {
          let res = response.data;
          this.detail = res;
          this.logoList = res.logo.split(',');
          this.list = [];
          this.list.push(res.weight+'g')
          console.log('1')
          if(callBack){
            callBack()
          }
        });
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '~vux/src/styles/close.less';
  .position-horizontal-demo {
    position: relative;
    height: 100%;
    .vux-close {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%) scale(4);
      color: #000;
    }
  }
</style>
<style>
  @import '../../assets/css/swiper.min.css';
  .changeGoldDetail{
    width: 100%;
    overflow: hidden;
  }
  .detailBanner{
    height: 4.16rem;
  }
  .detailBanner img{
    width: 100%;
    height: 100%;
  }
  .vux-slider{
    font-size: 0!important;
    bottom: 0!important;
    height: 100%!important;
  }
  .vux-slider > .vux-swiper{
    height: 100%!important;
  }
  .vux-slider > .vux-indicator > a > i{
    background-color: #dedede!important;
    width: .12rem!important;
    height: .04rem!important;
    border-radius: 0!important;
  }
  .vux-slider > .vux-indicator > a > i.active{
    background-color: #FFD71E!important;
  }
  .swiper-slide{

  }
  .swiper-container{
    padding-bottom: .2rem;
  }
  .swiper-slide-active{
    box-shadow: .04rem .08rem .12rem 0 rgba(213,213,213,0.50);
  }
  .swiper-pagination.swiper-pagination-bullets{
    font-size: 0;
    bottom: 0;
  }
  .swiper-pagination-bullet{
    width: .12rem;
    height: .04rem;
    border-radius: 0;
  }
  .swiper-pagination-bullet-active{
    background-color: #FFD71E;
  }
  .swiper-slide img{
    display: block;
    width: 100%;
  }
  .cg-text{
    padding: .42rem 0 0 .3rem;
  }
  .cg-text h2{
    font-size: .34rem;
    color: #333;
    line-height: .48rem;
    padding-bottom: .12rem;
  }
  .cg-text p{
    font-size: .44rem;
    color: #EDA835;
    line-height: .34rem;
  }
  .cg-text p span{
    font-size: .24rem;
  }
  .detailImg{
    font-size: 0;
    margin-bottom: 1rem;
  }
  .detailImg img{
    display: block;
    width: 100%;
  }
  .changeGoldDetail .btn-wap{
    background-color: transparent;
  }
  .popupWap{
    background-color: #fff;
  }
  .changeGoldDetail .vux-popup-dialog{
    overflow: initial;
  }
  .popTop{
    height: 1.7rem;
    padding: 0 .3rem;
    position: relative;
    justify-content: space-between;
  }
  .popTop img{
    display: block;
    width: 1.6rem;
    height: 1.6rem;
    position: absolute;
    top: -.44rem;
    box-shadow: 0 4px 6px 0 rgba(213,213,213,0.50);
  }
  .popTop p{
    font-size: .34rem;
    color: #333333;
    line-height: 1.6rem;
    padding-left: 1.9rem;
    font-weight: bold;
  }
  .popTop i{
    display: block;
    width: .28rem;
    height: .28rem;
    background: url("../../assets/images/user/changeGold/close@2x.png")no-repeat center;
    background-size: 100%;
    margin-top: .48rem;
  }
  .popMid{
    padding: .3rem 0 .3rem .3rem;
  }
  .popMid h2{
    font-size: .3rem;
    color: #333333;
  }
  .popMid ul{
    flex-wrap: wrap;
  }
  .popMid ul li{
    width: 1.5rem;
    height: .5rem;
    line-height: .5rem;
    background: #F5F5F5;
    border-radius: .04rem;
    font-size: .24rem;
    color: #333333;
    margin-right: .296rem;
    margin-top: .3rem;
    text-align: center;
  }
  .popMid ul li.select{
    background: #FFD71E;
  }
  .popNum{
    align-items: center;
    justify-content: space-between;
    padding: .72rem .3rem .3rem .3rem;
  }
  .popNum p{
    font-size: .3rem;
    color: #333333;
  }
  .add-wrap{
    width: 2.2rem;
    height: .5rem;
    background: #F5F5F5;
    border-radius: .04rem;
    align-items: center;
    justify-content: space-between;
  }
  .add-wrap span{
    display: block;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
    font-size: .28rem;
    color: #333333;
  }
  .add-wrap span:first-child,.add-wrap span:last-child{
    font-size: .4rem;
    color: #EDA835;
    padding-bottom: .1rem;
  }
  .enterWap{
    padding-right: .3rem;
  }
</style>
