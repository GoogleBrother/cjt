<template>
<div class="find">

  <div v-if="contentList.length > 0 && contentList[0] !== null"  class="bg-f">

    <div v-for="item in contentList">
      <div v-if="item.picType === 0" class="newsList bg-f border-bottom flex" @click="$router.push({path:'/findDetail/'+item.contentId})">
        <div class="text-box">
          <h2 class="text-ep2">{{item.title}}</h2>
          <p><span>{{item.source}}</span><i>{{item.clickNum}}</i></p>
        </div>
        <img :src="item.pic">
      </div>

      <div v-if="item.picType === 1" class="newsList bg-f border-bottom bigNews" @click="$router.push({path:'/findDetail/'+item.contentId})">
        <h2 class="text-ep">{{item.title}}</h2>
        <img :src="item.pic">
        <p><span>{{item.source}}</span><i>{{item.clickNum}}</i></p>
      </div>

    </div>



  </div>

  <noData v-if="contentList.length <= 0" :content="'暂无数据喔'"></noData>

</div>
</template>
<script type="es6">
  import noData from '../../components/noData.vue'
  export default {
    components: {
      noData
    },
    activated () {
      this.$emit('viewIn', 'tab3');
    },
    mounted () {
      this.getContentList();
    },
    data () {
      return {
        contentList: [null]
      }
    },
    methods: {
      getContentList () {
        this.post('/content/queryContentList', {}, response => {
          let res = response.data;
          this.contentList = res;
        });
      }
    }
  }
</script>
<style>
  .newsList{
    height: 1.8rem;
    margin-left: .34rem;
    padding: .18rem .2rem .2rem 0;
    justify-content: space-between;
    align-items: center;
  }
  .newsList.bigNews{
    justify-content: flex-start;
    height: auto;
  }
  .newsList .text-box{
    width: 52.8%;
  }
  .newsList h2{
    height: .84rem;
    margin-bottom: .26rem;
    font-size: .3rem;
    line-height: .42rem;
    color: #333;
  }
  .newsList.bigNews h2{
    height: auto;
  }
  .newsList p{
    font-size: .24rem;
    color: #666;
  }
  .newsList p i{
    font-size: .2rem;
    color: #999;
    margin-left: .64rem;
    background: url("../../assets/images/find/yan.png")no-repeat left center;
    background-size: .2rem .16rem;
    padding-left: .286rem;
  }
  .newsList img{
    display: block;
    width: 2.24rem;
    height: 1.28rem;
  }
  .newsList.bigNews img{
    width: 100%;
    height: auto;
    margin-bottom: .32rem;
  }
</style>
