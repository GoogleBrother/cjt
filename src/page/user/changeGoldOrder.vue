<template>
  <div class="changeGoldOrder bg-f">
    <div class="cgo-box flex border-bottom">
      <img class="cgo-img" src="../../assets/images/user/changeGold/jzz.png"/>
      <div class="cgo-text">
        <h2>{{name}}</h2>
        <!--<p><span>￥</span>100.00~1000.00</p>-->
      </div>
    </div>

    <div class="cgo-list bg-f border-bottom">

      <div class="cgo-item flex al-c border-bottom">
        <h2>规格</h2>
        <p>{{weight}}g</p>
      </div>
      <div class="cgo-item flex al-c border-bottom">
        <h2>数量</h2>
        <p>{{num}}件</p>
      </div>
      <div class="cgo-item flex al-c border-bottom">
        <h2>工费</h2>
        <p class="c-y">{{labourFee}}元/克</p>
      </div>
      <div class="cgo-item flex al-c border-bottom">
        <h2>运费</h2>
        <p class="c-y">{{expressFee}}元</p>
      </div>

      <div v-if="!setAddress" class="bigBar titleBar userBar flex bg-f" @click="$router.push({path:'/chooseAddressList/2'})">
        <div class="titleWarp">
          <span class="c-3 f-28">收货地址</span>
        </div>
        <div class="flex myAddress">
          <div>
            <h2><span>{{defaultAddress.contact}}</span><span>{{defaultAddress.telephone}}</span></h2>
            <p>{{defaultAddress.address}}</p>
          </div>
          <i class="icon"></i>
        </div>
      </div>

      <div v-show="setAddress" class="titleBar userBar flex bg-f" @click="$router.push({path:'/chooseAddressList/2'})">
        <div class="titleWarp">
          <span class="c-3 f-28">收货地址</span>
        </div>
        <div class="flex al-c">
          <i>去设置</i>
          <i class="icon"></i>
        </div>
      </div>


    </div>

    <div class="btn-between flex">
      <div class="btn-left flex">
        <i>合计</i>
        <div>
          <p>总克重：<span>{{((labourFee*weight*num+expressFee*num+weight*price*num)/price).toFixed(4)}}g</span></p>
          <p>费用：<span>{{(labourFee*weight*num+expressFee*num+weight*price*num).toFixed(2)}}元</span></p>
        </div>
      </div>
      <div class="btn-right flex1" @click="doIt">
        立即提金
      </div>
    </div>

  </div>
</template>
<script type="es6">
  export default {
    data () {
      return {
        price:  '',
        num: '',
        weight: '',
        labourFee: '',
        expressFee: '',
        name: '',
        productId: '',
        order: '',
        setAddress: true,
        defaultAddress: '',
        defaultAddressID: ''
      }
    },
    mounted () {
      // 获取订单参数；
      if (sessionStorage.getItem('changeGoldParams')) {
        let changeGoldParams = JSON.parse(sessionStorage.getItem('changeGoldParams'));
        this.num = changeGoldParams.num;
        this.weight = changeGoldParams.weight;
        this.labourFee = changeGoldParams.labourFee;
        this.expressFee = changeGoldParams.expressFee;
        this.name = changeGoldParams.name;
        this.productId = changeGoldParams.productId;
      }
      // 判断是否自己选择了地址，没有的话就查看默认地址;
      if (sessionStorage.getItem('changeGoldAddress')) {
        this.setAddress = false;
        this.defaultAddress = JSON.parse(sessionStorage.getItem('changeGoldAddress'));
        this.defaultAddressID = this.defaultAddress.id;
        /*console.log(this.defaultAddress)*/
      } else {
        // 查询是否存在默认地址;
        this.getDefaultAddress();
      }
      this.getPrice();
    },
    methods: {
      // 获取金价；
      getPrice () {
        const that = this;
        this.service('/price/queryGoldPrice', {}, response => {
          let res = response.data;
          that.price = res.goldPrice;
        });
      },
      doIt () {
        if (!this.setAddress) {
          this.addPhysicalOrder();
        } else {
          this.$vux.alert.show({
            content: "请设置取金地址"
          });
        }
      },
      addPhysicalOrder () {
        this.service('/order/addPhysicalOrder', {
          quantity: this.num,
          addressId: this.defaultAddressID,
          productId: this.productId
        }, response => {
          let res = response.data;
          this.order = res;
          let changeGoldResults = JSON.stringify(res);
          sessionStorage.setItem('changeGoldResults',changeGoldResults);
          this.$router.push({path:'/changeGoldSucceed/'+res.code})
        });
      },
      getDefaultAddress () {
        this.service('/user/queryAddress', {}, response => {
          let res = response.data;
          if (res.length >= 0) {
            res.map( (item, i) => {
              if (parseInt(item.isDefault) === 0) {
                this.defaultAddress = res[i];
                this.defaultAddressID = res[i].id;
              }
            });
            // 判断是否设置有地址标记为默认地址，没有的话就提示去设置；
            if (this.defaultAddressID === '') {
              this.setAddress = true;
            } else {
              this.setAddress = false;
            }
          } else {
            this.setAddress = true;
          }
        });

      },

    }
  }
</script>
<style>
  .changeGoldOrder{
    height: 100%;
  }
  .cgo-box{
    padding: .4rem .5rem;

  }
  .cgo-box img{
    display: block;
    width: 1.4rem;
    height: 1.4rem;
  }
  .cgo-text{
    padding: .18rem 0 0 .18rem;
  }
  .cgo-text h2{
    font-size: .34rem;
    color: #333;
    line-height: .48rem;
    padding-bottom: .12rem;
  }
  .cgo-text p{
    font-size: .44rem;
    color: #EDA835;
    line-height: .34rem;
  }
  .cgo-text p span{
    font-size: .24rem;
  }
  .cgo-list{
    padding-left: .36rem;
  }
  .cgo-item{
    justify-content: space-between;
    padding: 0.36rem .4rem 0.34rem 0;
    font-size: .28rem;
    color: #333;
    line-height: .4rem;
  }
  .cgo-item h2 span{
    font-size: .24rem;
    color: #BBBBBB;
    margin-left: .16rem;
  }
  .cgo-item p{

  }
  .cgo-list .userBar{
    margin-left: 0;
  }
  .btn-between{
    width: 100%;
    height: .98rem;
    position: fixed;
    bottom: 0;
  }
  .btn-between .btn-left{
    flex: 2;
    background-color: rgb(245, 245, 245);
    align-items: center;
    justify-content: center;
  }
  .btn-between .btn-left i{
    font-size: .32rem;
    color: #333333;
    margin-right: .32rem;
  }
  .btn-between .btn-left p{
    font-size: .24rem;
    color: #666666;
    line-height: .34rem;
  }
  .btn-between .btn-left p span{
    color: #EDA835;
  }
  .btn-between .btn-right{
    background-color: #FFD71E;
    font-size: .34rem;
    color: #333333;
    text-align: center;
    line-height: .98rem;
  }
</style>
