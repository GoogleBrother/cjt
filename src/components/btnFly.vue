<template>
  <div class="btn-wap">
    <div class="btn-fly"
         :class="{'err':isEnd}"
         @click="dealWith">
      <p>{{title}}</p>
    </div>
  </div>
</template>
<script type="es6">
  export default{
    props:['title','isEnd'],
    methods:{
      dealWith(){
        this.$emit('doIt');
      }
    }
  }
</script>
<style>
  .btn-wap{
    width: 100%;
    padding-top: .42rem;
    background-color: #f5f5f5;
    position: fixed;
    bottom: 0;
  }
  .btn-fly{
    width: 100%;
    bottom: 0;
    z-index: 499;
    height: .98rem;
    line-height: .98rem;
    font-size: .34rem;
    color: #333;
    text-align: center;
    background-color: #FFD71E;
  }
  .err{
    background-color: #FFD365!important;
  }
</style>
