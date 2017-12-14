<template>
  <div class="myInfo">

    <div class="bg-f">
      <div class="titleBar userBar flex bg-f border-bottom">
        <div class="titleWarp">
          <span class="c-6">头像</span>
        </div>
        <div class="my-picWap">
          <i class="myPic">
            <img v-if="userInfo.pic" :src="userInfo.pic">
          </i>
          <i class="icon" @click=""></i>
          <input id="fileInput" type="file" @change="imageHandle()">
        </div>
      </div>
      <div class="titleBar userBar flex bg-f border-bottom" @click="show5=true">
        <div class="titleWarp">
          <span class="c-6">昵称</span>
        </div>
        <div class="flex changeName">
          <i>{{userInfo.name}}</i>
          <i class="icon" @click=""></i>
        </div>
      </div>

      <!--<popup-picker
        class="border-bottom"
        :title="'性别'"
        :data="sex"
        v-model="value1"
        @on-show="onShow"
        @on-hide="onHide"
        @on-change="onChange"
        :placeholder="'please select'">
      </popup-picker>

      <x-address
        title="地区"
        v-model="value2"
        raw-value
        :list="addressData"
        @on-hide="addressChange"
        hide-district>
      </x-address>-->

      <!--<div class="titleBar userBar flex bg-f border-bottom">
        <div class="titleWarp">
          <span class="c-6">性别</span>
        </div>
        <div>
          <i>男</i>
          <i class="icon" @click=""></i>
        </div>
      </div>-->

      <!--<div class="titleBar userBar flex bg-f border-bottom">
        <div class="titleWarp">
          <span class="c-6">地区</span>
        </div>
        <div>
          <i>深圳</i>
          <i class="icon" @click=""></i>
        </div>
      </div>-->

    </div>

    <confirm v-model="show5"
             show-input
             ref="confirm5"
             :title="'修改昵称'"
             @on-confirm="onConfirm5">
    </confirm>

    <div class="esc bg-f mt3" @click="esc">退出登录</div>
  </div>
</template>
<script type="es6">
  import { Confirm, PopupPicker, XAddress, ChinaAddressData, Value2nameFilter as value2name } from 'vux'
  export default {
    components: {
      PopupPicker,
      XAddress,
      Confirm
    },
    data () {
      return {
        userInfo: '',
        show5:false,
        sex: [['男', '女']],
        value1: ['女'],
        value2: ['广东省', '深圳市'],
        addressData: ChinaAddressData,
        fileList: '',
        img64: ''
      }
    },
    mounted () {
      this.getUserInfo();
    },
    methods: {
      onConfirm5 (value) {
        this.changeName(value);
      },
      onChange (val) {
        console.log('val change', val)
      },
      onShow () {
        console.log('on show')
      },
      onHide (type) {
        console.log('on hide', type)
      },
      getName (value) {
        return value2name(value, ChinaAddressData)
      },
      addressChange (str) {
        if(str){
          console.log(this.value2+' '+this.getName(this.value2))
        }
      },
      getUserInfo () {
        this.service('/user/queryUserInfo', {}, response => {
          let res = response.data;
          this.userInfo = res;
        });
      },
      changeName (value) {
        const that = this;
        this.service('/user/modifyNickname', {
          nickname: value
        }, response => {
          let res = response.data;
          if(res.modifyState === 1){
            this.$vux.alert.show({
              content: "修改成功",
              onShow () {
                that.getUserInfo();
              }
            });
          }
        });
      },
      readFile (file) {
        const that = this;
        this.service('/user/modifyUserPic', {
          file: file
        }, response => {
          let res = response.data;
          if(res.modifyState === 1){
            this.$vux.alert.show({
              content: "修改成功",
              onShow () {
                that.getUserInfo();
              }
            });
          }
        });

        /*this.axios({
          method: 'post',
          url: '/user/modifyUserPic',
          data: fd
        })
          .then((response) => {
            let obj = {};
            /!*obj.id = response.data.data.id;
            obj.picSrc = this.imgUrl + response.data.data.url;*!/
          })*/

      },
      esc () {
        const that = this;
        this.$vux.confirm.show({
          title: '提示',
          content: '是否退出登录',
          onCancel () {

          },
          onConfirm () {
            sessionStorage.clear();
            that.$router.replace({path:'/home'});
          }
        });
      },
      imageHandle () {
        const that = this;
        let fileInput = document.getElementById('fileInput');
        this.fileList = fileInput.files[0];
        let img = this.fileList;
          // 判断是否图片
        if (!img) {
              return;
          }
        // 判断图片格式
        if (!(img.type.indexOf('image') === 0 && img.type && /\.(?:jpg|png|gif)$/.test(img.name))) {
             alert('图片只能是jpg,gif,png');
              return;
         }
         let reader = new FileReader();
          reader.onload = function (e) {
              var url = reader.result;
              that.readFile(url)
          };
          reader.readAsDataURL(img);
        }

    }
  }
</script>
<style>
  .myInfo{
    font-size: .5rem;
  }
  .esc{
    height: 1.1rem;
    line-height: 1.1rem;
    text-align: center;
    font-size: .34rem;
    color: #333;
  }
  .my-picWap{
    display: flex;
    align-items: center;
    position: relative;
  }
  .myPic{
    display: inline-block;
    width: .72rem;
    height: .72rem;
    border-radius: 50%;
    overflow: hidden;
    background: url("../../assets/images/user/heard.png")no-repeat center;
    background-size: 100%;
  }
  .myPic img{
    display: block;
    width: .72rem;
    height: .72rem;
  }
  .changeName{
    align-items: center;
  }
  #fileInput{
    opacity: 0;
    position: absolute;
    width: 100px;
    height: 100px;
    z-index: 500;
    top: 0;
    left: 0;
  }
</style>
