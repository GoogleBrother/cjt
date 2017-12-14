<template>
  <div class="storeList">

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

  </div>
</template>
<script type="es6">
  export default {
    data () {
      return {
        siteList: ''
      }
    },
    mounted () {
      this.getSiteList();
    },
    methods: {
      // 获取站点列表；
      getSiteList () {
        this.service('/network/queryNetwork', {}, response => {
          let res = response.data;
          this.siteList = res;
        });
      },
    }
  }
</script>
<style>

</style>
