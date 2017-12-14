<template>
  <div class="contrastGold bg-f">

    <div class="con-logo border-bottom">
      <img src="../../assets/images/home/contrastGold/banner5@2x.png"/>
    </div>
    <div class="con-time">
      <!--<p>2017-11-18 19:22:46  开盘</p>-->
    </div>
    <div class="con-list bg-f">
      <ul class="f-30 c-3">
        <li class="flex">
          <span class="">商品</span>
          <span>回收价格</span>
          <!--<span>高／低</span>-->
        </li>
        <li class="flex">
          <span>黄金99.99</span>
          <span class="up">{{prices.au99Price}}</span>
          <!--<span class="up">
            <a>275.06</a>
            <a>275.06</a>
          </span>-->
        </li>
        <li class="flex">
          <span>黄金(T+D)</span>
          <span class="up">{{prices.tdPrice}}</span>
          <!--<span class="up">
            <a>275.06</a>
            <a>275.06</a>
          </span>-->
        </li>
        <li class="flex">
          <span>周大福</span>
          <span class="up">{{prices.zhoudafuPrice}}</span>
          <!--<span class="">
            <a>275.06</a>
            <a>275.06</a>
          </span>-->
        </li>
        <li class="flex">
          <span>周生生</span>
          <span class="up">{{prices.zhoushengshengPrice}}</span>
          <!--<span class="up">
            <a>275.06</a>
            <a>275.06</a>
          </span>-->
        </li>
      </ul>
    </div>

    <div class="con-sm">
      <p>声明：以上行情仅供参考</p>
    </div>

    <div class="btn-tab flex">
      <div class="flex1 on">行情</div>
      <div class="flex1" @click="$router.replace({path:'/goldTrend'})">走势</div>
    </div>

  </div>
</template>
<script type="es6">
  import echarts from '../../../static/js/echarts.min'
  export default {
    components: {

    },
    data () {
      return {
        prices: ''
       }
    },
    mounted () {
      this.handler();
    },
    methods: {
      handler () {
        this.post('/price/queryMarketPrice', {}, response => {
          let res = response.data;
          this.prices = res;
        });
      },
    }
  }

</script>
<style>
  .contrastGold{
    height: 100%;
  }
  .contrastGold .vux-slider{
    height: 100%;
  }
  .con-logo{

  }
  .con-logo img{
    display: block;
    width: 100%;
  }
  .con-list{
    margin-top: .2rem;
    padding: 0 0 .1rem;
  }
  .con-list ul{
    margin: 0 .3rem;
  }
  .con-list ul li{
    height: .96rem;
    background: #F5F5F5;
    margin-bottom: .14rem;
    padding: .04rem 0;
  }
  .con-list ul li span{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .con-list ul li span:nth-child(3) a{
    display: block;
  }
  .con-list ul li span:nth-child(3){
    justify-content: center;
    flex-direction: column;
  }
  .con-list ul li:first-child{
    height: .84rem;
    background-color: #E0E0E0;
  }
  .up{
    color: #FF6D39;;
  }
  .down{
    color: #5BC872;
  }
  .btn-tab{
    position: fixed;
    width: 100%;
    height: .98rem;
    bottom: 0;
  }
  .btn-tab div{
    text-align: center;
    line-height: .98rem;
    font-size: .34rem;
    color: #333333;
    background: #EEEEEE;
  }
  .btn-tab div.on{
    background-color: #FFD71E;
  }
  .con-time p{
    font-size: .3rem;
    color: #333333;
    padding: .26rem .3rem 0;
  }
  .con-sm p{
    font-size: .24rem;
    color: #FF3030;
    padding-left: .3rem;
  }
</style>
