<template>
  <div class="titleBar flex bg-f mt3 border-bottom">
    <div class="titleWarp">
      <b></b>
      <span>{{title}}</span>
    </div>
    <i class="icon flex1" v-show="links" @click="goto"></i>
    <i class="user-myGold" v-if="gold">{{gold}}克</i>
  </div>
</template>
<script type="es6">
  export default {
    props: ['title','links','gold'],
    data () {
      return {

      }
    },
    methods: {
      goto () {
        this.$emit('goto')
      }
    }
  }
</script>
<style>
  .titleBar{
    height: 1.1rem;
    align-items: center;
    justify-content: space-between;
    font-size: .3rem;
    line-height: .42rem;
    color: #333333;
    letter-spacing: -0.54px;
    padding: .34rem 0 .34rem .2rem;
  }
  .titleWarp{
    display: flex;
    align-items: center;
  }
  .titleBar b{
    display: inline-block;
    width: .04rem;
    height: .2rem;
    background-color: rgb(254, 216, 73);
    margin-right: .1rem;
  }
  .titleBar span{
    display: inline-block;
  }
  .titleBar i.icon{
    display: inline-block;
    padding: .4rem 0;
    margin-right: .36rem;
    width: .36rem;
    height: .24rem;
    background: url("../assets/images/common/jt.png")no-repeat right center;
    background-size: .12rem .24rem;
    box-sizing: content-box;
  }
  .user-myGold{
    font-size: .36rem;
    color: #F99225;
    padding-right: .36rem;
  }
</style>
