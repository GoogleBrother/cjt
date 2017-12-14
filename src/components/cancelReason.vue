<template>
  <div>
    <div v-transfer-dom>
      <popup v-model="show">
        <group>
          <div class="reason-wrap f-28">
            <i class="close fr" @click="close"></i>
            <picker :data='reasons' v-model='reason'>{{reason}}</picker>
          </div>
          <btn @operate="save">确认</btn>
        </group>
      </popup>
    </div>
  </div>
</template>
<script type="es6">
  import {Group, Popup, TransferDom, Picker } from 'vux'
  import btn from './btn.vue'
  export default{
    props:['isEnd'],
    components:{
      Group, Popup, btn, Picker
    },
    directives: {
      TransferDom
    },
    data(){
      return {
        reasons: [['我不想买了','卖家缺货','同城见面交易','信息填写错误，重新拍','其他原因']],
        reason: ['同城见面交易']
      }
    },
    mounted(){

    },
    computed:{
        show(){
            return this.isEnd == 1 ? true : false;
        }
    },
    methods:{
      save(){
        this.$emit('operate',this.reason,true);
      },
      close(){
        this.show = false;
        this.$emit('operate','',false);
      }
    }
  }
</script>
<style scoped="">
  .reason-wrap{
    width:100%;
    height:4.66rem;
  }
  .close{
    width: .3rem;
    height: .3rem;
    display: inline-block;
    background: url(../assets/images/mall/btn_gb@2x.png) no-repeat center;
    background-size: .3rem;
    margin-top: .2rem;
    margin-right: .2rem;
    position: relative;
    z-index: 5;
  }
</style>
