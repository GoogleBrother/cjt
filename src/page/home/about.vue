<template>
  <div class="about bg-f">
    <img class="logo" src="../../assets/images/home/logo.png">
    <ul>
      <li class="flex border-bottom">
        <span>隐私政策</span>
        <i></i>
      </li>
      <li class="flex border-bottom">
        <span>服务条款</span>
        <i></i>
      </li>
      <li class="flex border-bottom">
        <span>当前版本</span>
        <span>1.0.0</span>
      </li>
    </ul>
  </div>
</template>
<script type="es6">
  export default {

  }
</script>
<style lang="less">
  .about{
    padding-top: .6rem;
    img.logo{
      display: block;
      width: 2.07rem;
      margin: 0 auto .48rem;
    }
    ul{
      padding-left: .46rem;
      li{
        align-items: center;
        justify-content: space-between;
        padding: .34rem .4rem .34rem 0;
        span{
          font-size: .3rem;
          color: #333333;
          line-height: .42rem;
        }
        i{
          display: block;
          width: .26rem;
          height: .16rem;
          background: url("../../assets/images/home/down@2x.png")no-repeat center;
          background-size: 100%;
        }
      }
    }
  }
</style>
