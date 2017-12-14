<template>
  <div class="faq">
    <div class="questionBox bg-f">
      <div class="question border-bottom flex" @click="isShow = !isShow">
        <p>交易时间及点差</p>
        <i :class="{up:isShow,down:!isShow}"></i>
      </div>
      <div v-show="isShow" class="questionCont">
        <p class="txi">近期由于受到人民币汇率及黄金价格双重剧烈波动的影响，黄金管家将交易时间和点差进行如下调整：</p>
        <p class="gst"> 一、交易时间：</p>
        <p class="txi"> 周一至周五9:00至24:00为交易时段，周六0:00至周一9:00及国家法定节假日为非交易时段。交易时段内用户可以随时买卖黄金。</p>
        <p>二、非交易时段内：</p>
        <p class="txi">1.活期黄金买入和卖出交易停盘；</p>
        <p class="txi">2.现金资产买入定期黄金交易停盘，活期金转定期金正常交易；</p>
        <p class="txi"> 3.实物提金业务交易停盘，实物存金业务克正常操作；</p>
        <p class="txi">4.充值和提现可正常操作。</p>
        <p>三、点差调整如下：</p>
        <p class="txi">点差调整为交易时段内0.5元／克。</p>
        <p class="gst txi">以上调整于2017年1月14日0:00点开始实行，请大家提前做好资产配置，避免调整给您造成影响，感谢您对黄金管家的支持，我们将竭诚为您服务！</p>
      </div>
    </div>
  </div>
</template>
<script type="es6">
  export default {
    data () {
      return {
        isShow: false
      }
    }
  }
</script>
<style>
  .questionBox{
    padding-left: .48rem;
  }
  .question{
    height: 1.1rem;
    align-items: center;
    justify-content: space-between;
    padding-right: .36rem;
  }
  .question p{
    font-size: .3rem;
    color: #333333;
  }
  .question i{
    display: block;
    width: .26rem;
    height: .16rem;
  }
  .question i.up{
    background: url("../../assets/images/user/FAQ/up@2x.png")no-repeat center;
    background-size: 100%;
  }
  .question i.down{
    background: url("../../assets/images/user/FAQ/down@2x.png")no-repeat center;
    background-size: 100%;
  }
  .questionCont{
    padding: .3rem 0;
  }
  .questionCont p{
    font-size: .24rem;
    color: #999999;
    padding-right: .48rem;
  }
  .gst{
    padding-top: .4rem;
  }
  .txi{
    text-indent: 2em;
  }
</style>
