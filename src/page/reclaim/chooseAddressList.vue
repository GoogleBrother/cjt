<template>
  <div class="addressList">

    <div v-for="(item, e) in addressList" class="addressWap bg-f">
      <div class="addressTop border-bottom" @click="chooseAddress(item)">
        <h2><span>{{item.contact}}</span><span>{{item.telephone}}</span></h2>
        <p>{{item.address}}</p>
      </div>
      <div class="addressBottom flex">
        <i class="addressSelect" :class="{on: select === e}" @click="defaultAddress(item.id, e)">设为默认</i>
        <div class="flex">
          <i class="addressSet" @click="editAddress(e)">编辑</i>
          <i class="addressDelete" @click="deleteIt(item.id)">删除</i>
        </div>
      </div>
    </div>

    <btnFly :title="'+增加地址'" v-on:doIt="$router.push({path:'/addAddress'})"></btnFly>

  </div>
</template>
<script type="es6">
  import btnFly from '../../components/btnFly.vue'
  let fromPath = '';
  export default {
    mounted () {
      this.getAddressList();
    },
    components: {
      btnFly
    },
    data () {
      return {
        select: '',
        addressList: '',
      }
    },
    methods: {
      chooseAddress (address) {
        if (this.$route.params.id === '1') {
          this.$router.push({path:'/inputData'});
          let orderAddress = JSON.stringify(address);
          sessionStorage.setItem('orderAddress',orderAddress);
        } else if (this.$route.params.id === '2') {
          this.$router.push({path:'/changeGoldOrder'});
          let  changeGoldAddress = JSON.stringify(address);
          sessionStorage.setItem('changeGoldAddress',changeGoldAddress);
        }
      },
      // 获取常用地址列表；
      getAddressList () {
        this.service('/user/queryAddress', {}, response => {
          let res = response.data;
          this.addressList = res;
          res.map( (item, i) => {
            if (parseInt(item.isDefault) === 0) {
              this.select = i;
            }
          });
        });
      },
      // 点击删除地址按钮；
      deleteIt (addressId) {
        const that = this;
        this.$vux.confirm.show({
          title: '提示',
          content: '是否确认删除地址',
          onCancel () {

          },
          onConfirm () {
            that.deleteAddress(addressId);
          }
        });
      },
      // 删除地址；
      deleteAddress (addressId) {
        const that = this;
        this.service('/user/deleteAddress', {
          addressId: addressId
        }, response => {
          let res = response.data;
          if(res.deleteState === 1) {
            this.$vux.alert.show({
              content: "删除成功",
              onShow () {
                // 如果删掉的地址恰好是当前选择的地址，那么就删掉缓存;
                if (that.$route.params.id === '1') {
                  if(sessionStorage.getItem('orderAddress')){
                    let address = JSON.parse(sessionStorage.getItem('orderAddress'));
                    if (address.id === addressId){
                      sessionStorage.removeItem('orderAddress')
                    }
                  }
                } else if (that.$route.params.id === '2') {
                  if (sessionStorage.getItem('changeGoldAddress')) {
                    let address = JSON.parse(sessionStorage.getItem('changeGoldAddress'));
                    if (address.id === addressId){
                      sessionStorage.removeItem('changeGoldAddress')
                    }
                  }
                }
                that.getAddressList();
              }
            });
          } else {
            console.log(res.deleteState)
          }
        });
      },
      // 设为默认地址；
      defaultAddress (addressId,e) {
        const that = this;
        this.service('/user/defaultAddress', {
          addressId: addressId
        }, response => {
          let res = response.data;
          if(parseInt(res.deleteState) === 1) {
            that.select = e;
          } else {
            alert(2)
          }
        });
      },
      // 编辑地址；
      editAddress (e) {
        let editAddress = JSON.stringify(this.addressList[e]);
        sessionStorage.removeItem('editAddress');
        sessionStorage.setItem('editAddress',editAddress);
        this.$router.push({path:'/changeAddress'})
      },
    }
  }
</script>
<style>
  .addressWap{
    margin-bottom: .2rem;
  }
  .addressTop{
    padding: .2rem .2rem .2rem 0;
    margin-left: .36rem;
  }
  .addressTop h2{
    font-size: .32rem;
    color: #333;
    line-height: .44rem;
  }
  .addressTop h2 span:first-child{
    margin-right: .26rem;
  }
  .addressTop p{
    font-size: .28rem;
    color: #666;
    line-height: .4rem;
    padding-top: .16rem;
  }
  .addressBottom{
    align-items: center;
    justify-content: space-between;
    padding: .36rem .4rem;
  }
  .addressBottom .flex{
    align-items: center;
  }
  .addressBottom i{
    font-size: .28rem;
    color: #666;
    display: inline-block;
    height: .36rem;
    line-height: .36rem;
    text-indent: .52rem;
  }
  .addressBottom i.addressSelect{
    background: url("../../assets/images/user/address/rb_nor@2x.png")no-repeat left center;
    background-size: .36rem .36rem;
  }
  .addressBottom i.addressSelect.on{
    background: url("../../assets/images/user/address/rb_pre@2x.png")no-repeat left center;
    background-size: .36rem .36rem;
  }
  .addressBottom i.addressSet{
    background: url("../../assets/images/user/address/icon_edit@2x.png")no-repeat left center;
    background-size: .36rem .36rem;
    margin-right: .34rem;
  }
  .addressBottom i.addressDelete{
    background: url("../../assets/images/user/address/icon_del@2x.png")no-repeat left center;
    background-size: .36rem .36rem;
  }
</style>
