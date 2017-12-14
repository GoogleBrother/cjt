<template>
  <div class="homePage flex">
    <div class="home flex1">
      <keep-alive>
        <router-view v-on:viewIn="viewIn" v-if="!$route.meta.notKeepAlive"></router-view>
      </keep-alive>

      <router-view v-on:viewIn="viewIn" v-if="$route.meta.notKeepAlive"></router-view>

      <footer-guide :tabText="tabValue" ></footer-guide>
    </div>


  </div>
</template>
<script>
  import footerGuide from './footer'
  export default {
    name: 'home',
    data () {
      return {
        refresh: true,
        tabValue: 'tab1'
      }
    },
    methods: {
      viewIn: function (tabValue) {
        this.tabValue = tabValue;
      }
    },
    components: {
      footerGuide
    }
  }
</script>
<style>
  .homePage{
    width: 100%;
    height: 100%;
  }
  .home{
    width: 100%;
    height: 100%;
    overflow: scroll;
    padding-bottom: .98rem;
    -webkit-overflow-scrolling: touch;
    /*position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(245, 245, 245);*/
  }
</style>

