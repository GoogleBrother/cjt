<template>
  <div class="order">
    <div class="bg-f">
      <div class="titleBar userBar flex bg-f border-bottom" @click="$router.push({path:'/home/reclaim'})">
          <div class="titleWarp">
            <span class="c-3 f-28">品类</span>
          </div>
          <div class="flex al-c" >
            <i>{{items}}</i>
            <i class="icon"></i>
          </div>
      </div>

      <popup-picker
        class="border-bottom"
        :title="'件数'"
        :data="num"
        v-model="value1"
        @on-show="onShow"
        @on-hide="onHide"
        @on-change="onChange"
        :placeholder="'please select'">
      </popup-picker>

      <!--<div class="titleBar userBar flex bg-f border-bottom">
        <div class="titleWarp">
          <span class="c-3 f-28">件数</span>
        </div>
        <div>
          <i>1件</i>
          <i class="icon"></i>
        </div>
      </div>-->

      <div class="titleBar userBar pr-36 flex bg-f border-bottom">
        <div class="titleWarp">
          <span class="c-3 f-28">总克重</span>
        </div>
        <div class="flex flex1">
          <input class="txr flex1" v-model="weight" maxlength="7" @input="inputValidate()" placeholder="请输入大约克重数" />
          <i class="c-9 ml16">克</i>
        </div>
      </div>

      <div class="titleBar userBar pr-36 flex bg-f border-bottom">
        <div class="titleWarp">
          <span class="c-3 f-28">单价</span>
        </div>
        <div>
          <i class="c-y">{{price}}</i>
          <i class="c-9 ml16">元/克</i>
        </div>
      </div>

      <div class="titleBar userBar pr-36 flex bg-f border-bottom">
        <div class="titleWarp">
          <span class="c-3 f-28">预估金额</span>
        </div>
        <div>
          <i class="c-y">{{total}}</i>
          <i class="c-9 ml16">元</i>
        </div>
      </div>

    </div>

    <div class="prompting">
      <p class="f-24 c-9">温馨提示</p>
      <p class="f-24 c-9">1.运费：0.00元；保费：0.00元；检测费：0.00元。</p>
      <p class="f-24 c-9">2.损耗：0.00元；</p>
      <p class="f-24 c-9">3.由于黄金价格实时波动，预估金额仅供参考。</p>
    </div>

    <btn :title="'下一步'" :isEnd="down" v-on:doIt="doIt"></btn>

  </div>
</template>
<script type="es6">
  import btn from '../../components/btn.vue'
  import { PopupPicker } from 'vux'
  export default {
    components: {
      btn,
      PopupPicker
    },
    data () {
      return {
        price: '',
        id: '',
        weight: '',
        num: [['1件', '2件', '3件', '4件', '5件', '6件', '7件', '8件', '9件', '10件']],
        value1: ['1件'],
        applyQuantity: 1,
      }
    },
    mounted () {
      this.id = this.$route.params.id;
      this.getPrice();
    },
    computed: {
      items () {
        switch (this.id) {
          case '0':
            return '其它';
            break;
          case '1':
            return '吊坠';
            break;
          case '2':
            return '手链';
            break;
          case '3':
            return '项链';
            break;
          case '4':
            return '耳饰';
            break;
          case '5':
            return '戒指';
            break;
          case '6':
            return '金条';
            break;
          case '7':
            return '金币';
            break;
          case '8':
            return '转运珠';
            break;
          case '9':
            return '金钞';
            break;
        }
      },
      down () {
        if (this.weight !== '' && parseFloat(this.weight) !== 0) {
          return false
        }  else {
          return true
        }
      },
      total () {
        return (this.weight*this.price).toFixed(3)
      },
    },
    filters: {
    },
    methods: {
      doIt () {
        if (!this.down) {
          let orderParams = {
            num: this.applyQuantity,
            weight: this.weight,
            type: this.$route.params.id
          };
          orderParams = JSON.stringify(orderParams);
          sessionStorage.setItem('orderParams',orderParams);
          this.$router.push({path:'/inputData'})
        } else if (parseFloat(this.weight) === 0) {
          this.$vux.alert.show({
            content: "克重不能为0"
          });
        } else {
          this.$vux.alert.show({
            content: "请输入克重"
          });
        }
      },
      inputValidate () {
        this.weight = this.validate(this.weight,false);
      },
      validate (val,isMoney) {
        if(val.length >= 0){
          let n = isMoney ? 2 : 3;
          let _val = val.replace(/[^\d\.]/g,"").replace(/^[\.]/g,'').replace(/^0+[1-9]/,'');
          if(_val.split(".").length >= 2){
            let _vals = _val.split(".");
            let integer = _vals[0],
              decimal = _vals[1];
            _val = integer+"."+decimal.substring(0,n);
          }
          return _val;
        }
      },
      // 获取金价；
      getPrice () {
        const that = this;
        this.service('/price/queryGoldPrice', {}, response => {
          let res = response.data;
          that.price = res.goldPrice;
        });
      },
      // 选择件数；
      onChange (val) {
        this.num[0].map((item,i) => {
          if(item == val){
            this.applyQuantity = i+1
          }
        });
        console.log(this.applyQuantity)
      },
      onShow () {
        console.log('on show')
      },
      onHide (type) {
        console.log('on hide', type)
      },
    }
  }
</script>
<style>
  .ml16{
    margin-left: .16rem;
  }
  .prompting{
    margin: .38rem;
  }
  .titleBar.pr-36{
    padding-right: .36rem!important;
  }
</style>
