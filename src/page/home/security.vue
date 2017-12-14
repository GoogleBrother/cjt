<template>
  <div class="security">
    <swiper loop class="security-scroll" :show-dots="false">
      <swiper-item><img src="../../assets/images/common/1.png"/></swiper-item>
      <swiper-item><img src="../../assets/images/common/2.png"/></swiper-item>
      <swiper-item><img src="../../assets/images/common/3.png"/></swiper-item>
      <swiper-item><img src="../../assets/images/common/4.png"/></swiper-item>
    </swiper>
    <img class="jtr bounce" src="../../assets/images/common/jtr.png">
  </div>
</template>
<script type="es6">
  import { Swiper, SwiperItem} from 'vux'
  export default {
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>
<style>
  .security{
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: relative;
  }
  .security-scroll{
    width: 100%;
    height: 100%;
  }
  .security-scroll img{
    display: block;
    width: 100%;
  }
  .security .vux-slider{
    padding-top: 1.15rem!important;
  }
  .security .vux-swiper{
    height: 100%!important;
  }
  .jtr{
    display: block;
    width: .24rem;
    height: .24rem;
    position: absolute;
    top: 0;
    bottom: 0;
    right: .3rem;
    margin: auto;
  }
  /*@-moz-keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      -moz-transform: translateY(0);
      transform: translateY(0);
    }
    40% {
      -moz-transform: translateY(-30px);
      transform: translateY(-30px);
    }
    60% {
      -moz-transform: translateY(-15px);
      transform: translateY(-15px);
    }
  }
  @-webkit-keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    40% {
      -webkit-transform: translateX(-30px);
      transform: translateX(-30px);
    }
    60% {
      -webkit-transform: translateX(-15px);
      transform: translateX(-15px);
    }
  }*/
  @keyframes bounce {
    from{
      transform: translateX(0);
      opacity: 1;
    }
    to{
      transform: translateX(.2rem);
      opacity: .1;
    }
  }
  .bounce {
    animation: bounce 0.7s infinite;
  }
</style>
