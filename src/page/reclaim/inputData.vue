<template>
  <div class="inputData">

    <div class="bg-f">

      <div v-show="setAddress" class="titleBar userBar flex bg-f border-bottom" @click="$router.push({path:'/chooseAddressList/1'})">
        <div class="titleWarp">
          <span class="c-3 f-28">取金地址</span>
        </div>
        <div class="flex al-c">
          <i>去设置</i>
          <i class="icon"></i>
        </div>
      </div>

      <div v-show="!setAddress" class="bigBar titleBar userBar flex bg-f border-bottom" @click="$router.push({path:'/chooseAddressList/1'})">
        <div class="titleWarp">
          <span class="c-3 f-28">取金地址</span>
        </div>
        <div class="flex myAddress">
          <div>
            <h2><span>{{defaultAddress.contact}}</span><span>{{defaultAddress.telephone}}</span></h2>
            <p>{{defaultAddress.address}}</p>
          </div>
          <i class="icon"></i>
        </div>
      </div>

      <!--<div class="titleBar userBar flex bg-f border-bottom" @click.native="showPlugin">
        <div class="titleWarp">
          <span class="c-3 f-28">取金时间</span>
        </div>
        <div>
          <i>去设置</i>
          <i class="icon"></i>
        </div>
      </div>-->

      <div class="ml-38">
        <datetime
          class="border-bottom"
          v-model="value"
          :min-year="this.year"
          :max-year="this.year+1"
          :start-date="this.minValue"
          :end-date="this.maxValue"
          @on-change="change"
          clear-text="today"
          :title="'取金时间'"
          @on-clear="setToday">
        </datetime>
      </div>

    </div>

    <btn :title="'确定'" :isEnd="down" v-on:doIt="doIt"></btn>

  </div>
</template>
<script type="es6">
  import { Datetime } from 'vux'
  import btn from '../../components/btn.vue'
  export default {
    components: {
      Datetime,
      btn
    },
    beforeMount () {
      let now = new Date();
      this.year = parseInt(now.getFullYear());
      this.cmonth = parseInt(now.getMonth() + 1);
      this.day = parseInt(now.getDate());
      this.value = now.getFullYear() + '-' + this.cmonth + '-' + this.day;
      this.minValue = now.getFullYear() + '-' + this.cmonth + '-' + this.day;
      this.maxValue = (now.getFullYear() + 1) + '-' + this.cmonth + '-' + this.day;
    },
    mounted () {
      this.setToday();

      // 获取订单参数；
      if (sessionStorage.getItem('orderParams')) {
        let orderParams = JSON.parse(sessionStorage.getItem('orderParams'));
        this.num = orderParams.num;
        this.weight = orderParams.weight;
        this.type = orderParams.type;
      }

      // 判断是否自己选择了地址，没有的话就查看默认地址;
      if (sessionStorage.getItem('orderAddress')) {
        this.setAddress = false;
        this.defaultAddress = JSON.parse(sessionStorage.getItem('orderAddress'));
        this.defaultAddressID = this.defaultAddress.id;
        /*console.log(this.defaultAddress)*/
      } else {
        // 查询是否存在默认地址;
        this.getDefaultAddress();
      }
    },
    data () {
      return{
        num: '',
        weight: '',
        type: '',
        year: '',
        cmonth: '',
        day: '',
        minValue: '',
        maxValue: '',
        value: '',
        setAddress: true,
        defaultAddress: '',  // 选择的地址;
        defaultAddressID: '' // 选择的地址id;
      }
    },
    computed: {
      down () {
        if (!this.setAddress){
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      setToday (value) {
        let now = new Date();
        let cmonth = now.getMonth() + 1;
        let day = now.getDate();
        if (cmonth < 10) cmonth = '0' + cmonth;
        if (day < 10) day = '0' + day;
        this.value = now.getFullYear() + '-' + cmonth + '-' + day;
        /*console.log('set today ok')*/
      },
      change (value) {

      },
      doIt () {
        if (!this.down) {
          this.addRecycleOrder();
        }
      },
      // 生成回收订单；
      addRecycleOrder () {
        this.service('/order/addRecycleOrder', {
          applyQuantity: this.num,
          applyWeight: this.weight,
          addressId: this.defaultAddressID,
          appointmenTime: this.value,
          type: this.type,
        }, response => {
          let res = response.data;
          if(res.addState === 1){
            this.$router.push({path:'/conventionSucceed/'+res.code})
          }
        });
      },
      // 获取默认地址；
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
  .ml-38{
    margin-left: .38rem;
  }
  .bigBar{
    height: 1.4rem;
  }
  .myAddress{
    flex: 1;
    align-items: center;
    justify-content: flex-end;
  }
  .myAddress h2{
    font-size: .28rem;
    color: #333;
    line-height: .4rem;
    text-align: right;
    width: 100%;
  }
  .myAddress h2 span:first-child{
    margin-right: .36rem;
  }
  .myAddress p{
    font-size: .24rem;
    color: #666;
    line-height: .34rem;
    padding-top: .14rem;
    text-align: right;
    width: 100%;
  }
</style>
