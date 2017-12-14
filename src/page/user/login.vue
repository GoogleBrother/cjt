<template>
  <div class="login myInput">
    <div class="inputWap flex bg-f">

      <div class="c-input border-bottom flex">
        <x-input class="flex1" placeholder="请输入您的注册手机号" mask="999 9999 9999" v-model="phoneNum" :max="11"></x-input>
        <a v-show="isClick" class="c-yzm" @click="getCode">获取验证码</a>
        <a v-show="!isClick" class="c-djs" >{{tipMsg}}S</a>
      </div>

      <div class="c-input border-bottom flex">
        <x-input class="flex1" placeholder="请输入验证码"  v-model="code" :max="13"></x-input>
      </div>

    </div>

    <btn :title="'确认'" :isEnd="down" v-on:doIt="goLogin"></btn>

  </div>
</template>
<script type="es6">
  import { XInput, Group } from 'vux'
  import btn from '../../components/btn.vue'
  let fromPath = '';
  export default {
    components: {
      btn,
      Group,
      XInput
    },
    data () {
      return {
        phoneNum: '',
        code: '',
        isClick: true,
        tipMsg: '60',
        toPath: ''
      }
    },
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    beforeRouteEnter (to, from, next) {
      /*console.log(from);*/
      fromPath = from.path;
      next()
    },
    // 导航离开该组件的对应路由时调用，可以访问组件实例 `this`;
    beforeRouteLeave (to, from, next) {
      if (fromPath === '/') {
        next({ path: '/home' })
      } else {
        next()
      }
    },
    computed: {
      down () {
        if (this.phoneNum && this.code){
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      // 点击获取验证码按钮；
      getCode () {
        const that = this;
        function callBack() {
          if(that.isClick){
            that.isClick = false;
            that.sendCode(() => {
              that.timeDown()
            })
          }
        };
        this.textPhone(() =>{
          callBack()
        });
      },
      // 发送验证码；
      sendCode (callBack) {
        this.post('/user/sendSmsCode', {
          token: this.phoneNum
        }, response => {
          let res = response;
          if (res.status === 1) {
            this.$vux.toast.text('发送成功', 'middle');
            if(callBack){
              callBack()
            }
          } else {
            this.isClick = true;
          }
        });
      },
      // 点击登录按钮。
      goLogin () {
        let that = this;
        // 清除除可能已存在的token；
        sessionStorage.removeItem('Authorization');
        // 验证是否填写；
        this.textPhone(() => {
          this.textCode(() => {
            this.loginPost();
          })
        });
      },
      // 调取登录接口；
      loginPost () {
        this.post('/user/register', {
          name: this.phoneNum,
          code: this.code
        }, response => {
          let res = response.data;
          sessionStorage.setItem('Authorization', res.token);
          // 回退回原来的路由
          this.$router.go(-1);
        });
      },
      // 倒计时；
      timeDown () {
        let _this = this;
        _this.tipMsg = 59;
        let time = setInterval(function () {
          _this.tipMsg--;
          if (_this.tipMsg === 0) {
            _this.tipMsg = 59;
            _this.isClick = true;
            clearInterval(time)
          }
        }, 1000)
      },
      // 验证手机号码；
      textPhone (callBack) {
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
        callBack();
      },
      // 验证验证码；
      textCode (callBack) {
        if(!this.code){
          this.$vux.alert.show({
            content: "验证码不能为空"
          });
          return false;
        }
        callBack();
      }
    }
  }
</script>
<style>
  .c-relative{
    position: relative;
  }
  .c-yzm{
    width: 1.8rem;
    font-size: .28rem;
    color: #EDA835;
    line-height: 1.1rem;
    padding-right: .36rem;
  }
  .c-djs{
    width: 1.8rem;
    font-size: .24rem;
    color: #999999;
    line-height: 1.1rem;
    padding-right: .36rem;
    text-align: center;
  }
  .myInput .weui-cells{
    width: 100%;
  }
  .myInput .vux-x-input{
    width: 100%;
  }
  .myInput .weui-cell__ft .weui_icon_clear{
    display: block;
  }
</style>
