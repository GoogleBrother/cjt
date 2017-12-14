<template>
    <div class="btn-bottom"
         :class="{'err':isEnd}"
         @click="dealWith">
      <p>{{title}}</p>
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
<style scoped>
    .btn-bottom{
        width: 92%;
        bottom: 0;
        z-index: 499;
        height: .88rem;
        line-height: .88rem;
        font-size: .34rem;
        color: #333;
        text-align: center;
        background-color: #FFD71E;
        margin: 0.8rem auto 0;
      border-radius: .04rem;
    }
    .err{
        background-color: #FFD365!important;
    }
</style>
