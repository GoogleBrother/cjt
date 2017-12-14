<template>
  <div class="name border-bottom">
    <label class="flex">
      <span>{{name}}</span>
      <input class="flex1" v-if="types" type="password" :placeholder="'请输入'+name" :maxlength="max" v-model="inputValue" @input="changeValue" />
      <input class="flex1" v-else type="text" :placeholder="'请输入'+name"  :maxlength="max" v-model="inputValue" @input="changeValue" />
      <img src="../assets/images/user/set/btn_guanbi@2x.png" class="phone-img-close"  v-show="inputValue.length > 0" @click="close"/>
      <img src="../assets/images/user/set/btn_yicang@2x.png" class="eye" v-show="open" @click="changes" />
      <img src="../assets/images/user/set/btn_dakai@2x.png" class="eye" v-show="!open" @click="changes" />
    </label>
  </div>

</template>
<script type="es6">
  import {numOnly} from  '../config/mUtils'
  export default{
    props: ['name','value','max','type'],
    data() {
      return{
        inputValue: this.value,
        open: true,
        types: true
      }
    },
    methods: {
      changeValue: function (event) {
        let myValue = event.target.value;
        if(this.type=='trading'){
          this.inputValue = numOnly(this.inputValue);
        }
        this.$emit('input', myValue)
      },
      changes: function () {
        this.open = !this.open;
        this.types = !this.types;
      },
      close(){
        this.inputValue = '';
        this.$emit('input', this.inputValue);
      }
    }
  }
</script>
<style scoped="true">
  input{
    font-size: 0.3rem;
  }
  .lock{
    padding:0.3rem 0.21rem;
    border-radius:0.08rem;
    border:1px solid #d8d8d8;
    margin-bottom:0.18rem;
  }
  .phone-img{
    width:0.32rem;
    height:0.37rem;
    margin-right:0.3rem;
  }
  .phone-img-close{
    width:0.32rem;
    height:0.32rem;
    margin-top:0.05rem;
  }
  .eye{
    width:0.38rem;
    height:0.28rem;
    margin-left:0.17rem;
    margin-top: 0.06rem;
  }
  .notice{
    color:#999;
  }
  .btn{
    text-align:center;
    margin-top:1rem;
    background-color:#c1c1c1;
    padding:0.34rem 0;
    border-radius:0.08rem;
    color:#fff;
  }
  .changeColor{
    background-color:#01b9e9;
  }
</style>
