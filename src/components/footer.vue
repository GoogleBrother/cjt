<template>
  <tabbar>

    <tabbar-item  :selected="tabText === 'tab1' ? true : false" link="/home">
      <img slot="icon" src="../assets/images/footer/home@2x.png">
      <img slot="icon-active" src="../assets/images/footer/home2@2x.png">
      <span slot="label">首页</span>
    </tabbar-item>

    <tabbar-item  :selected="tabText === 'tab2' ? true : false" link="/home/reclaim">
      <img slot="icon" src="../assets/images/footer/huishou@2x.png">
      <img slot="icon-active" src="../assets/images/footer/huishou2@2x.png">
      <span slot="label">回收</span>
    </tabbar-item>

    <tabbar-item :selected="tabText === 'tab3' ? true : false" link="/home/find">
      <img slot="icon" src="../assets/images/footer/find@2x.png">
      <img slot="icon-active" src="../assets/images/footer/find2@2x.png">
      <span slot="label">发现</span>
    </tabbar-item>

    <tabbar-item :selected="tabText === 'tab4' ? true : false" link="/home/user">
      <img slot="icon" src="../assets/images/footer/user@2x.png">
      <img slot="icon-active" src="../assets/images/footer/user2@2x.png">
      <span slot="label">我的</span>
    </tabbar-item>

  </tabbar>
</template>

<script>
  import { Tabbar, TabbarItem} from 'vux'
  export default{
    props: ['tabText'],
    components:{
      Tabbar,
      TabbarItem
    }
  }
</script>

<style scoped>
  footer{
    position: fixed;
    bottom: 0;
    border: none;
  }
  .m-tabbar:after{
    border:none!important;
  }
  .highShow,.tabbar-active .show{
    display: none;
  }
  .tabbar-active .highShow{
    display: block;
  }

</style>
