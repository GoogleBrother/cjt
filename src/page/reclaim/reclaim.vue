<template>
  <div class="reclaim bg-f">
    <div class="reclaim-banner">
      <img src="../../assets/images/reclaim/banner.png">
    </div>
    <titleBar :title="'回收品类'"></titleBar>
    <ul class="reclaim-box flex">
      <li class="flex" @click="$router.push({path:'/order/0'})">
        <h3>多种</h3>
        <h3>品类</h3>
      </li>
      <li class="flex" @click="$router.push({path:'/order/1'})">
        <img src="../../assets/images/reclaim/dz.png">
        <p>吊坠</p>
      </li>
      <li class="flex" @click="$router.push({path:'/order/2'})">
        <img src="../../assets/images/reclaim/sl.png">
        <p>手链</p>
      </li>
      <li class="flex" @click="$router.push({path:'/order/3'})">
        <img src="../../assets/images/reclaim/xl.png">
        <p>项链</p>
      </li>
      <li class="flex" @click="$router.push({path:'/order/4'})">
        <img src="../../assets/images/reclaim/eh.png">
        <p>耳饰</p>
      </li>
      <li class="flex" @click="$router.push({path:'/order/5'})">
        <img src="../../assets/images/reclaim/jz.png">
        <p>戒指</p>
      </li>
      <li class="flex" @click="$router.push({path:'/order/6'})">
        <img src="../../assets/images/reclaim/jt.png">
        <p>金条</p>
      </li>
      <li class="flex" @click="$router.push({path:'/order/7'})">
        <img src="../../assets/images/reclaim/jb.png">
        <p>金币</p>
      </li>
      <li class="flex" @click="$router.push({path:'/order/8'})">
        <img src="../../assets/images/reclaim/zyz.png">
        <p>转运珠</p>
      </li>
      <li class="flex" @click="$router.push({path:'/order/9'})">
        <img src="../../assets/images/reclaim/jc.png">
        <p>金钞</p>
      </li>
    </ul>
  </div>
</template>
<script type="es6">
  import titleBar from '../../components/titleBar.vue'
  export default {
    components:{
      titleBar
    },
    activated () {
      this.$emit('viewIn', 'tab2');
    },
    mounted () {
      this.$emit('viewIn', 'tab2');
    }
  }
</script>
<style>
  .reclaim-banner{
    background-color: #fff;
    padding: .2rem 0;
  }
  .reclaim-banner img{
    display: block;
    width: 100%;
  }
  .reclaim-box{
    width: 100%;
    flex-wrap: wrap;
    padding-bottom: .88rem;
  }
  .reclaim-box li{
    width: 33.333%;
    height: 2.5rem;
    background-color: #fff;
    border-bottom: .01rem solid #d8d8d8;
    border-right: .01rem solid #d8d8d8;
    font-size: .28rem;
    color: #666;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .reclaim-box li h3{
    display: block;
    width: 100%;
    line-height: .4rem;
    text-align: center;
    justify-content: center;
  }
  .reclaim-box li img{
    display: block;
    width: 2rem;
    height: 1.6rem;
  }
  .reclaim-box li p{
    line-height: .4rem;
  }
</style>
