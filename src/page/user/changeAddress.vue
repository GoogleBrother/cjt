<template>
  <div class="addAddress flex">
    <div class="inputWap flex bg-f">
      <div class="c-input border-bottom flex">
        <input v-model="name" placeholder="请输入您的真实姓名">
      </div>
      <div class="c-input border-bottom flex">
        <input v-model="phoneNum" placeholder="请输入11位手机号" maxlength="11">
      </div>
      <div class="c-input border-bottom flex">
        <input v-model="address" placeholder="请输入详细地址">
      </div>
    </div>

    <btn :title="'保存'" :isEnd="down" v-on:doIt="doIt"></btn>

  </div>
</template>
<script type="es6">
  import btn from '../../components/btn.vue'
  export default {
    mounted () {
      this.addressCont =JSON.parse(sessionStorage.getItem('editAddress'));
      this.name = this.addressCont.contact;
      this.phoneNum = this.addressCont.telephone;
      this.address = this.addressCont.address;
      this.id = this.addressCont.id;
    },
    components: {
      btn
    },
    data () {
      return {
        addressCont: '',
        name: '',
        phoneNum: '',
        address: '',
        id: ''
      }
    },
    computed: {
      down () {
        if (true){
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      doIt () {
        this.validation(() => {
          this.changeAddress();
        })
      },
      // 调取修改地址接口；
      changeAddress () {
        const that = this;
        this.service('/user/modifyAddress', {
          contact: this.name,
          telephone: this.phoneNum,
          address: this.address,
          addressId: this.id,
        }, response => {
          let res = response.data;
          if(res.modifyState === 1){
            this.$vux.alert.show({
              content: "修改地址成功",
              onHide () {
                that.$router.go(-1)
              }
            });
          } else {
            console.log(res.modifyState)
          }
        });
      },
      // 前端校验；
      validation (callBack) {
        if(!this.name){
          this.$vux.alert.show({
            content: "姓名不能为空"
          });
          return false;
        }
        if(!this.phoneNum){
          this.$vux.alert.show({
            content: "手机号不能为空"
          });
          return false;
        }
        if(!this.reg.phone.test(this.phoneNum)){
          this.$vux.alert.show({
            content: "手机号格式错误"
          });
          return false;
        }
        if(!this.address){
          this.$vux.alert.show({
            content: "地址不能为空"
          });
          return false;
        }
        callBack();
      },
    }
  }
</script>
<style>

</style>
