<template>
  <div class="bankList">

    <div class="bankBox bg-f" v-for="item in bankList">
      <div  class="bankLogo flex">
        <div class="bankIcon flex flex1">
          <img :src="item.pic"/>
          <div>
            <h2>{{item.bankName}}</h2>
            <p>储蓄卡</p>
          </div>
        </div>
        <i @click="deletes(item.bankCardId)">删除</i>
      </div>
      <h3 class="bankCard">{{item.bankNo | hideStr(0,4)}}</h3>
    </div>

  </div>
</template>
<script type="es6">
  export default {
    data () {
      return {
        bankList: ''
      }
    },
    created () {
      this.service('/user/queryBankCard', {}, response => {
        let res = response.data;
        if( !res[0]){
          this.$router.replace({path:'/addBankCard'})
        }
      });
    },
    mounted () {
      this.getBankList();
    },
    methods: {
      deletes (bankId) {
        const that = this;
        this.$vux.confirm.show({
          title: '提示',
          content: '是否确认删除银行卡',
          onCancel () {

          },
          onConfirm () {
            that.deleteBank(bankId)
          }
        });
      },
      getBankList () {
        this.service('/user/queryBankCard', {}, response => {
          let res = response.data;
          this.bankList = res;
        });
      },
      deleteBank (bankId) {
        const that = this;
        this.service('/user/deleteBankCard', {
          bankCardId: bankId
        }, response => {
          let res = response.data;
          if(res.deleteState === 1) {
            this.$vux.alert.show({
              content: "删除成功",
              onShow () {
                that.getBankList()
              }
            });
          } else {
            console.log(res.deleteState)
          }
        });
      }
    }
  }
</script>
<style>
  .bankList{
    padding-top: .2rem;
  }
  .bankBox{
    margin: 0 .2rem 0 .2rem;
    padding: .3rem .38rem .6rem .5rem;
    box-shadow: 0 .08rem .12rem 0 rgba(225,225,225,0.50);
    border-radius: .04rem;
  }
  .bankLogo img{
    display: block;
    width: 1rem;
    height: 1rem;
    margin-right: .34rem;
  }
  .bankLogo h2{
    font-size: .36rem;
    color: #333333;
    line-height: .5rem;
  }
  .bankLogo p{
    line-height: .42rem;
    font-size: .3rem;
    color: #999999;
  }
  .bankLogo i{
    display: block;
    width: 1.08rem;
    height: .56rem;
    line-height: .56rem;
    text-align: center;
    font-size: .3rem;
    color: #999999;
    border: .01rem solid #999999;
    border-radius: .04rem;
  }
  .bankIcon{
    margin-top: .34rem;
    align-items: center;
  }
  .bankCard{
    font-size: .56rem;
    color: #333333;
    line-height: .8rem;
    margin-top: .68rem;
    text-align: center;
  }
</style>
