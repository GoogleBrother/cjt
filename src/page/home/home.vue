<template>
  <div class="pages">
    <div class="banner">
      <swiper :list="imgList" auto loop dots-position="center" :index="index" @on-index-change="" v-if="imgList.length"></swiper>
      <img src="" v-else>
    </div>

    <div class="showList bg-f">
      <ul class="flex">
        <li class="flex1">金价评估</li>
        <li class="flex1">权威检测</li>
        <li class="flex1">即刻变现</li>
        <li class="flex1">上门服务</li>
      </ul>
    </div>

    <titleBar :title="'回收金价'" :links="true" v-on:goto="$router.push({path:'/contrastGold'})"></titleBar>

    <div class="recycling-price flex bg-f">
      <p @click="$router.push({path:'/contrastGold'})">{{price}}<span>元/克</span></p>
      <div class="home-reclaim">
        <b @click="$router.push({path:'home/reclaim'})"><i class="Rotation"></i></b>
      </div>
    </div>

    <titleBar :title="'服务网点'" :links="true" v-on:goto="$router.push({path:'/storeList'})"></titleBar>

    <div class="store-list bg-f">
      <ul>
        <li class="flex border-bottom" v-for="item in siteList">
          <img :src="item.logoUrl" />
          <div class="text flex1">
            <h2 class="text-ep">{{item.name}}</h2>
            <h3><span class="jian">检测</span><span class="shou">回收</span></h3>
            <p>{{item.address}}</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="home-other flex">
      <div class="flex1 bg-f"  @click="$router.push({path:'/security'})">
        <img src="../../assets/images/home/aqbz@2x.png"/>
        安全保障
      </div>
      <div class="flex1 bg-f" @click="$router.push({path:'/about'})">
        <img src="../../assets/images/home/ljwm@2x.png"/>
        了解我们
      </div>
    </div>

    <div class="home-total">
      <p>已累计回收黄金</p>
      <div class="num">
        <span v-for="item in TonsList">{{item}}</span>
        <i>吨</i>
        <span v-for="item in kilogramList">{{item}}</span>
        <i>千克</i>
        <span v-for="item in keList">{{item}}</span>
        <i>克</i>
      </div>
    </div>

  </div>
</template>
<script>
  import { Swiper, Scroller} from 'vux'
  import titleBar from '../../components/titleBar.vue'
  import a1 from '../../assets/images/home/banner1.png'
  import a2 from '../../assets/images/home/banner2.png'
  export default {
    components: {
      Swiper,
      Scroller,
      titleBar
    },
    activated () {
      this.$emit('viewIn', 'tab1');
      this.loops();
    },
    mounted () {
      this.$emit('viewIn', 'tab1');
      this.getSiteList();
      this.getTotalWeight();
    },
    deactivated () {
      this.clearLoops();
    },
    data () {
      return {
        index: 0,
        imgList: [
          {
            price: '',
            url: 'javascript:',
            img: a1,
            title: ''
          },
          {
            price: '',
            url: 'javascript:',
            img: a2,
            title: ''
          }
        ],
        myInterval: '',
        siteList: '',
        totalWeight: '',
        price: ''
      }
    },
    computed: {
      Tons () {
        return parseInt(this.totalWeight / 1000000);
      },
      kilogram () {
        return parseInt((this.totalWeight - this.Tons * 1000000) / 1000)
      },
      ke () {
        return this.totalWeight - this.Tons * 1000000 - this.kilogram * 1000
      },
      TonsList () {
        if (this.Tons === 0) {
          return [0]
        } else {
          return this.Tons.toString().split('')
        }
      },
      kilogramList () {
        if (this.kilogram === 0) {
          return [0]
        } else {
          return this.kilogram.toString().split('')
        }
      },
      keList () {
        if (this.ke === 0) {
          return [0]
        } else {
          return this.ke.toString().split('')
        }
      }
    },
    methods: {
      // 循环获取；
      loops () {
        this.getPrice();
        this.myInterval = setInterval(() => {
          this.getPrice();
        },5000);
      },
      // 清除循环；
      clearLoops () {
        clearInterval(this.myInterval);
      },
      // 获取金价；
      getPrice () {
        const that = this;
        this.service('/price/queryGoldPrice', {}, response => {
          let res = response.data;
          that.price = res.goldPrice;
          console.log(res)
        });
      },
      // 获取站点列表；
      getSiteList () {
        this.service('/network/queryNetwork', {}, response => {
          let res = response.data;
          this.siteList = res;
        });
      },
      // 获取总回收黄金克数；
      getTotalWeight () {
        this.service('/product/queryTotalWeight', {}, response => {
          let res = response.data;
          this.totalWeight = parseInt(res.totalWeiht);
           console.log(this.Tons + ' ' + this.kilogram + ' ' + this.ke)
        });
      }
    }
  }
</script>
<style>
  .pages{
  }
  .banner {
    height: 3rem;
  }
  .banner .vux-swiper{
    height: 3rem!important;
  }
  .banner img{
    width:100%;
    height:100%;
  }
  .showList{
    font-size: 0.24rem;
    padding: .16rem 0;
    align-items: center;
  }
  .showList ul{
    width: 89%;
    margin: 0 auto;
  }
  @media all and (max-width: 340px) {
    .showList ul{
      width: 95%;
      margin: 0 auto;
    }
  }
  .showList ul li{
    background: url("../../assets/images/home/showlist@2x.png")no-repeat;
    background-size: .24rem .24rem;
    background-position: 0 .03rem;
    padding-left: .28rem;
    margin-right: .44rem;
    color: #EFAE41;
    height: .34rem;
    line-height: .34rem;
  }
  .showList ul li:last-child{
    margin-right: 0;
  }
  .recycling-price{
    height: 1.88rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 .72rem 0 .6rem;
  }
  .recycling-price p{
    font-size: .8rem;
    color: #EFAD33;
  }
  .recycling-price p span{
    font-size: .24rem;
    color: #3F3F3F;
    margin-left: .2rem;
  }
  .home-reclaim{
    display: flex;
    align-items: center;
  }
  .home-reclaim b{
    display: inline-block;
    width: 1.49rem;
    height: 1.49rem;
    background: url("../../assets/images/home/buttom.png")no-repeat center;
    background-size: 1.17rem 1.17rem;
  }
  .home-reclaim i{
    display: inline-block;
    width: 1.49rem;
    height: 1.49rem;
    background: url("../../assets/images/home/buttom1.png")no-repeat center;
    background-size: 100%;
  }
  @-webkit-keyframes rotation{
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(-360deg);}
  }
  .Rotation{
    -webkit-transform: rotate(-360deg);
    animation: rotation 2s linear infinite;
    -moz-animation: rotation 2s linear infinite;
    -webkit-animation: rotation 2s linear infinite;
    -o-animation: rotation 2s linear infinite;
  }
  .store-list{
    padding-left: .34rem;
  }
  .store-list .text{
    margin-left: .5rem;
    padding-right: .36rem;
  }
  .store-list ul li{
    box-sizing: border-box;
    height: 1.88rem;
    font-size: .24rem;
    align-items: center;
    padding: .32rem 0 .31rem;
  }
  .store-list ul li img{
    display: block;
    width: 1.2rem;
    height: 1.26rem;
  }
  .store-list ul li h2{
    font-size: .3rem;
    color: #666;
    line-height: .42rem;
    line-height: .42rem;
  }
  .store-list ul li h3{
    font-size: .24rem;
    color: #999;
    padding: .1rem 0 .14rem;
    line-height: .34rem;
  }
  .store-list ul li h3 span{
    margin-right: .44rem;
    padding-left: .42rem;
  }
  .store-list ul li h3 span.jian{
    background: url("../../assets/images/home/jian.png")no-repeat left center;
    background-size: .32rem .32rem;
  }
  .store-list ul li h3 span.shou{
    background: url("../../assets/images/home/hui.png")no-repeat left center;
    background-size: .32rem .32rem;
  }
  .store-list ul li p{
    font-size: .26rem;
    color: #999;
    line-height: .36rem;
  }
  .home-other{
    height: 1.24rem;
    padding: 0 .3rem;
    margin-top: .24rem;
  }
  .home-other .flex1{
    display: flex;
    height: 100%;
    font-size: .28rem;
    color: #333333;
    align-items: center;
    justify-content: center;
  }
  .home-other img{
    display: inline-block;
    width: .64rem;
    height: .64rem;
    margin-right: .42rem;
  }
  .home-other .flex1:first-child{
    margin-right: .4rem;
  }
  .home-total{
    padding: .56rem 0 .8rem;
  }
  .home-total p{
    font-size: .28rem;
    line-height: .4rem;
    color: #999;
    text-align: center;
    margin-bottom: .14rem;
  }
  .home-total .num{
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .home-total .num span{
    font-size: .36rem;
    display: inline-block;
    width: .48rem;
    height: .68rem;
    line-height: .68rem;
    background-color: #fff;
    margin-right: .06rem;
    color: #202020;
    text-align: center;
    border-radius: .04rem;
  }
  .home-total .num i{
    font-size: .2rem;
    color: #9D9D9D;
    vertical-align: bottom;
    margin: 0 .08rem 0 .02rem;
    padding-bottom: .02rem;
  }
</style>
