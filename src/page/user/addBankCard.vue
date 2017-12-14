<template>
  <div class="addBankCard myInput">

    <div class="inputWap flex bg-f">

      <popup-picker
        class="border-bottom"
        :title="'银行'"
        :data="bankList"
        v-model="bankValue"
        @on-show="onShow"
        @on-hide="onHide"
        @on-change="onChange"
        :placeholder="'please select'">
      </popup-picker>

      <div class="c-input border-bottom flex">
        <x-input class="flex1" placeholder="请输入有效银行卡号"  v-model="bankCard" :max="19"></x-input>
      </div>

      <!--<div class="bankType">
        <p>信用卡／中国工商银行</p>
      </div>-->

      <div class="c-input border-bottom flex">
        <x-input class="flex1" placeholder="请输入真实姓名"  v-model="name" :max="18"></x-input>
      </div>

      <div class="c-input border-bottom flex">
        <x-input class="flex1" placeholder="请输入身份证号码"  v-model="idCard" :max="18"></x-input>
      </div>

      <div class="c-input border-bottom flex">
        <x-input class="flex1" placeholder="请输入您的注册手机号" mask="999 9999 9999" v-model="phoneNum" :max="11" ></x-input>
        <a v-show="isClick" class="c-yzm" @click="getCode">获取验证码</a>
        <a v-show="!isClick" class="c-djs" >{{tipMsg}}S</a>
      </div>

      <div class="c-input border-bottom flex">
        <x-input class="flex1" placeholder="请输入验证码"  v-model="code" :max="13"></x-input>
      </div>

    </div>

    <btn :title="'确认'" :isEnd="down" v-on:doIt="validation"></btn>

  </div>
</template>
<script type="es6">
  import { XInput, Group, PopupPicker } from 'vux'
  import btn from '../../components/btn.vue'
  export default {
    components: {
      btn,
      Group,
      XInput,
      PopupPicker
    },
    data () {
      return {
        phoneNum: '',
        code: '',
        resBankList: [],
        bankList: [[1,2,3]],
        bankValue: ['请选择'],
        bankCard: '',
        bankId: 1,
        name: '',
        idCard: '',
        isClick: true,
        tipMsg: 59
      }
    },
    mounted () {
      this.getBankList();
    },
    beforeUpdate () {

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
      // 获取银行列表
      getBankList () {
        const that = this;
        this.service('/user/queryBank', {}, response => {
          let res = response.data;
          this.resBankList = res;
          that.bankList = [];
          let arr = []
          res.map((item) => {
            arr.push(item.bankName);
          });
          that.bankList.push(arr);
          console.log(that.bankList);
        });
      },
      // 添加银行卡；
      addBank () {
        const that = this;
        this.service('/user/addBankCard', {
          bankNo: this.bankCard,
          bankId: this.bankId,
          mobile: this.phoneNum,
          code: this.code,
          actualName: this.name,
          idCard: this.idCard,
        }, response => {
          let res = response.data;
          if( res.addState === 1 ){
            this.$vux.alert.show({
              content: "添加成功",
              onHide () {
                that.$router.replace({path:'/bankList'})
              }
            });
          } else {
            this.$vux.alert.show({
              content: "添加失败",
              onHide () {}
            });
          }
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
      // 点击获取验证码；
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
      // 表单校验；
      validation (func) {
        /*if(this.bankValue[0] === '请选择'){
          this.$vux.alert.show({
            content: "请选择银行"
          });
          return false;
        }*/
        if(!this.bankCard){
          this.$vux.alert.show({
            content: "请填写银行卡"
          });
          return false;
        } else if (!this.bankCheck(this.bankCard)) {
          this.$vux.alert.show({
            content: "银行卡格式有误"
          });
          return false;
        }


        if(!this.name){
          this.$vux.alert.show({
            content: "请填写姓名"
          });
          return false;
        }

        if(!this.idCard){
          this.$vux.alert.show({
            content: "请填写身份证"
          });
          return false;
        } else if(!this.reg.idCard.test(this.idCard)){
          this.$vux.alert.show({
            content: "身份证格式错误"
          });
          return false;
        }

        if(!this.phoneNum){
          this.$vux.alert.show({
            content: "请填写手机号码"
          });
          return false;
        }
        if(!this.reg.phone.test(this.phoneNum)){
          this.$vux.alert.show({
            content: "手机号格式错误"
          });
          return false;
        }
        if(!this.code){
          this.$vux.alert.show({
            content: "请填写验证码"
          });
          return false;
        }
        this.addBank()
      },
      bankCheck (bankno) {
        let lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhn进行比较）
        let first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
        let newArr = new Array();
        for (let i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
          newArr.push(first15Num.substr(i, 1));
        }
        let arrJiShu = new Array(); //奇数位*2的积 <9
        let arrJiShu2 = new Array(); //奇数位*2的积 >9
        let arrOuShu = new Array(); //偶数位数组
        for (let j = 0; j < newArr.length; j++) {
          if ((j + 1) % 2 == 1) { //奇数位
            if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
            else arrJiShu2.push(parseInt(newArr[j]) * 2);
          } else //偶数位
            arrOuShu.push(newArr[j]);
        }
        let jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
        let jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
        for (let h = 0; h < arrJiShu2.length; h++) {
          jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
          jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
        }
        let sumJiShu = 0; //奇数位*2 < 9 的数组之和
        let sumOuShu = 0; //偶数位数组之和
        let sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
        let sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
        let sumTotal = 0;
        for (let m = 0; m < arrJiShu.length; m++) {
          sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
        }

        for (let n = 0; n < arrOuShu.length; n++) {
          sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
        }

        for (let p = 0; p < jishu_child1.length; p++) {
          sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
          sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
        }
        //计算总和
        sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

        //计算luhn值
        let k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
        let luhn = 10 - k;

        if (lastNum == luhn) {
          return true;
        } else {
          return false;
        }
      },
      onChange (val) {
        this.bankList[0].map((item,i) => {
          if(item == val){
            this.bankId = this.resBankList[i].bankId;
            console.log(this.bankId);
          }
        });
      },
      onShow () {
        console.log('on show')
      },
      onHide (type) {
        console.log('on hide', type)
      },
      // 倒计时；
      timeDown () {
        let _this = this;
        _this.isClick = false;
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
        if (arguments.length >=0) {
          callBack();
        }
      },
    }
  }
</script>
<style>
  .bankType{
    background-color: #f5f5f5;
    font-size: .24rem;
    color: #666666;
    padding-left: .36rem;
    width: 100%;
    height: .6rem;
    line-height: .6rem;
  }
  .addBankCard .vux-cell-box{
    width: 100%;
  }
  .addBankCard .weui-label,.addBankCard .vux-popup-picker-value{
    color: #999;
  }
</style>
