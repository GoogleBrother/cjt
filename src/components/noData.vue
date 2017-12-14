<template>
  <div class="nodata-wrap">
    <div class="mypic">
      <img src="../assets/images/common/nodata.png" >
    </div>
    <div class="none-data">{{text}}</div>
  </div>
</template>
<script type="es6">
  export default {
    props: ['content'],
    data () {
      return {
        text: this.content,
      }
    }
  }
</script>
<style>
  .nodata-wrap{
    width:100%;
    height: 100%;
    background-color: #fff;
    padding: 2.5rem 0 5.1rem 0;
  }
  .nodata-wrap .mypic{
    font-size: 0;
  }
  .nodata-wrap .mypic img{
    width: 100%;
  }
  .none-data{
    font-size: .3rem;
    color: #999;
    text-align: center;
    padding-top: .25rem;
  }
</style>
