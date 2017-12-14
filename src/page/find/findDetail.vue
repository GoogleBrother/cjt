<template>
  <div class="findDetail bg-f">
    <h2>{{cont.title}}</h2>
    <div class="time">{{cont.createTime | timeStr}}</div>
    <div class="jj"></div>
    <div class="findDetaiContent" v-html="cont.content"></div>
  </div>
</template>
<script type="es6">
  export default {
    mounted () {
      this.getDetail()
    },
    data () {
      return {
        cont: ''
      }
    },
    methods: {
      getDetail () {
        this.post('/content/queryContent', {
          contentId: this.$route.params.id
        }, response => {
          let res = response.data;
          this.cont = res;
        });
      }
    }
  }
</script>
<style>
  .findDetail{
    padding: .3rem .3rem 1rem;
  }
  .findDetail h2{
    font-size: .45rem;
    color: #000000;
    padding-bottom: .22rem;
    text-align: left;
  }
  .findDetail .jj{
    width: .44rem;
    height: .04rem;
    background-color: #FFD71E;
    margin: 0 auto .36rem;
  }
  .findDetail h3{
    font-size: .28rem;
    color: #151515;
    line-height: .48rem;
    padding-bottom: .4rem;
  }
  .findDetail p{
    font-size: .28rem;
    color: #666;
    line-height: .48rem;
    padding-bottom: .4rem;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }
  .findDetail .time{
    height: .34rem;
    line-height: .34rem;
    font-size: .24rem;
    color: #999999;
    background: url("../../assets/images/find/icon_time2@2x.png")no-repeat left center;
    background-size: .28rem .28rem;
    padding-left: .37rem;
    margin-bottom: .42rem;
  }
  .findDetaiContent{
    width: 100%;
    overflow: hidden;
  }
  .findDetaiContent img{
    display: block;
    width: 100%;
  }
</style>
