<template>
  <div class="orderReport bg-f">

    <div class="reportBox bg-f">
      <h2><span>检测报告</span></h2>
      <div class="myReport">
        <img class="zhang" src="../../assets/images/user/order/zhang@2x.png">
        <div class="reportTop flex">
          <img class="reportPic" :src="detail.pic">
          <div>
            <p class="c-3">产品名称：{{detail.name}}</p>
            <p class="c-9">编号：{{detail.reportCode}}</p>
          </div>
        </div>
        <div class="reportTable">
          <table cellspacing="0" cellpadding="0">
            <tr>
              <td class="w-3 c-6">材质</td>
              <td class="w-7 c-3">{{detail.materialQuality}}</td>
            </tr>
            <tr>
              <td class="w-3 c-6">规格</td>
              <td class="w-7 c-3">{{detail.specifications}}</td>
            </tr>
            <tr>
              <td class="w-3 c-6">含量</td>
              <td class="w-7 c-3">{{detail.content}}</td>
            </tr>
            <tr>
              <td class="w-3 c-6">成色</td>
              <td class="w-7 c-3">{{detail.quality}}</td>
            </tr>
            <tr>
              <td class="w-3 c-6">损耗</td>
              <td class="w-7 c-3">{{detail.realLoss}}g</td>
            </tr>
            <tr>
              <td class="w-3 c-6">净重</td>
              <td class="w-7 c-3">{{detail.realNetWeight}}g</td>
            </tr>
          </table>
        </div>
      </div>

    </div>

    <div class="btn-three flex">
      <div class="flex1" @click="disagree">不同意</div>
      <div class="flex2" @click="takeCash">立即提现</div>
      <div class="flex2" @click="saveGold">存入帐户</div>
    </div>

  </div>
</template>
<script type="es6">
  export default {
    data () {
      return {
        code: '',
        detail: '',
        noBank: false   // 没有银行卡: 1.true没有 2.false有;
      }
    },
    mounted () {
      this.code = this.$route.params.code;
      this.getDetail();
      this.getBankList();
    },
    methods: {
      getDetail () {
        this.service('/order/queryRecycleReport', {
          code: this.code
        }, response => {
          let res = response.data;
          this.detail = res;
        });
      },
      // 不同意；
      disagree () {
        const that = this;
        this.$vux.confirm.show({
          title: '提示',
          content: '是否退回金饰',
          onCancel () {

          },
          onConfirm () {
            that.handling(1);
          }
        });
      },
      // 提现；
      takeCash () {
        const that = this;
        if (this.noBank) {
          this.$vux.confirm.show({
            title: '提示',
            content: '请先绑定银行卡',
            onCancel () {},
            onConfirm () {
              that.$router.push({path:'/addBankCard'})
            }
          });
        } else {
          this.$vux.confirm.show({
            title: '提示',
            content: '是否提现',
            onCancel () {},
            onConfirm () {
              that.handling(2);
            }
          });
        }
      },
      // 存金；
      saveGold () {
        const that = this;
        this.$vux.confirm.show({
          title: '提示',
          content: '是否存金',
          onCancel () {},
          onConfirm () {
            that.handling(3);
          }
        });
      },
      handling (type) {
        this.service('/order/handleRecycleOrder', {
          code: this.code,
          type: type
        }, response => {
          let res = response.data;
          let orderReportResults = JSON.stringify(res);
          sessionStorage.setItem('orderReportResults',orderReportResults);
          if (type === 1) {
            this.$router.push({path:'/ReturnGoldSucceed/'+this.code +'?time=' + res.time})
          } else if (type === 2) {
            this.$router.push({path:'/sellGoldSucceedSave/'+this.code})
          } else if (type === 3) {
            this.$router.push({path:'/saveMoneySucceed/'+this.code})
          }
        });
      },
      getBankList () {
        this.service('/user/queryBankCard', {}, response => {
          let res = response.data;
          if( !res[0]){
            this.noBank = true;
          }
        });
      }
    }
  }
</script>
<style>
  .orderReport{
    min-height: 100%;
    padding-bottom: 1rem;
  }
  .reportBox{
    width:100%;
    font-size: .28rem;
    padding: .24rem 0;
    box-sizing: border-box;
    box-shadow: 0 .08rem .12rem 0 rgba(225,225,225,0.50);
    text-align: center;
    position: relative;
  }
  .reportBox h2{
    font-size: .64rem;
    color: #636363;
    margin-bottom: .26rem;
  }
  .reportBox span{
    display: inline-block;
    line-height: .9rem;
    background: url("../../assets/images/user/order/logo.png")no-repeat left center;
    background-size: .72rem .64rem;
    padding-left: .82rem;
  }
  .myReport{
    width: 7.3rem;
    height: 10.36rem;
    margin: 0 auto;
    background: url("../../assets/images/user/order/Page1@2x.png")no-repeat center;
    background-size: 100%;
    position: relative;
  }
  .reportPic{
    display: block;
    width: 2.88rem;
    height: 2.52rem;
    padding: 1.54rem .16rem 0 .98rem;
    box-sizing: content-box;
  }
  .zhang{
    position: absolute;
    display: block;
    width: 5.86rem;
    height: 5.86rem;
    top: 2.7rem;
    right: .5rem;
  }
  .reportTop div{
    padding-top: 1.9rem;
  }
  .reportTop p{
    font-size: .26rem;
    line-height: .36rem;
    padding-bottom: .2rem;
    text-align: left;
    width: 2.7rem;
  }
  .reportTable{
    font-size: .28rem;
    padding: .16rem 1.04rem 0;
  }
  .reportBox table{
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    box-sizing: border-box;
  }
  .reportBox table tr th{
    height: .62rem;
  }
  .reportBox table tr td {
    border-bottom: .01rem solid #eee;
    height: .62rem;
  }
  .reportBox table tr td:first-child{
    text-align: left;
  }
  .w-3{
    width: 40%;
  }
  .w-7{
    width: 60%;
  }
  .btn-three{
    width: 100%;
    position: fixed;
    bottom: 0;
    font-size: .34rem;
    color: #333;
    height: .98rem;
    line-height: .98rem;
    text-align: center;
  }
  .btn-three div:first-child{
    font-size: .24rem;
    background-color: #fff;
  }
  .btn-three div:nth-child(2){
    background: #FFD71E;
  }
  .btn-three div:nth-child(3){
    background: #FFA739;
  }
</style>
