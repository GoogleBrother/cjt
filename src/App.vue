<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk'
  export default {
    name: 'app',
    data () {
      return {
        appId: '',
        res: '',
        urls: '',
        shareTitle: '斌斌的邀请',
        shareLink: 'http://zfht.dimengwx.cc/user/appRegiste.html?yqm=tuozuq',
        shareImgUrl: '',
        shareDesc: '我是孔斌，我为中富恒泰代言'
      }
    },
    mounted: function () {
      /*this.getConfig();*/
      this.shareImgUrl = window.location.origin + window.location.pathname + '/static/img_logo@2x.png'
    },
    methods: {
      // 后台设置分享内容
      getShareInfo () {
        this.service('common/v/findShareInfo', {}, response => {
          let data = response.data;
          this.shareTitle = data.title;
          this.shareDesc = data.content;
          this.shareLink = data.promoLink;
          this.share(this.shareTitle, this.shareLink, this.shareImgUrl, this.shareDesc);
        });
      },

      // 微信配置接口调用
      getConfig: function () {
        if (window.location.search.length > 0) {
          this.urls = location.href.split('?')[0];
        } else {
          this.urls = location.href.split('#')[0];
        }
        /*let urls = 'http://zfht.dimengwx.cc/weixin/'*/
        this.requestGet('share/v/wx/getJsTicketInfo?url=' + this.urls, (response) => {
            this.appId = response.data.appId;
            this.res = response.data;
            /*this.wxConfig(this.res);*/
            // 如果进入带‘?’页面，证明进入了授权回调页面或者授权后重置的带‘?#’页面，此时已授权则不需要进行授权。
            if (window.location.search.length > 0 || sessionStorage.getItem('openid')) {
              let search = window.location.search.length > 0 ? window.location.search.substr(1) : "";
              // 如果进入的是授权带code的回调页面则不需要wxConfig，反之进入手动更改的带‘?#’页面则授权步骤已完成，则可以wxConfig。
              /*alert(search)*/
              if (search.indexOf('&') == -1) {
                /* alert('111')*/
                this.wxConfig(this.res)
              }
            } else {
              this.wxAuthorize();
            }
          }
        );
      },

      // 配置微信JS-SDK
      wxConfig: function (response) {
        let that = this;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: response.appId, // 必填，公众号的唯一标识
          timestamp: response.timestamp, // 必填，生成签名的时间戳
          nonceStr: response.noncestr, // 必填，生成签名的随机串
          signature: response.signature, // 必填，签名，见附录1
          jsApiList: ['chooseWXPay', 'checkJsApi', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function () {
          /*that.share(that.shareTitle, that.shareLink, that.shareImgUrl, that.shareDesc);*/
          that.getShareInfo()
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        });
        wx.error(function (res) {
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
      },

      // 获取常量appid并授权
      wxAuthorize: function () {
        /*alert(window.location.search.length)*/
        let callUrl = encodeURIComponent( window.location.origin + window.location.pathname + "#/home" );
        let appId = this.appId;
        console.log(appId);
        /*let callUrl = encodeURIComponent('http://zfht.dimengwx.cc/weixin/#/home');*/
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + callUrl + "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";

      },

      // 微信分享配置
      share (shareTitle, shareLink, shareImgUrl, shareDesc) {

        // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
          title: shareTitle, // 分享标题
          link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: shareImgUrl, // 分享图标
          success: function () {

            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });

        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
          title: shareTitle, // 分享标题
          desc: shareDesc, // 分享描述
          link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: shareImgUrl, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });

        // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
        wx.onMenuShareQQ({
          title: shareTitle, // 分享标题
          desc: shareDesc, // 分享描述
          link: shareLink, // 分享链接
          imgUrl: shareImgUrl, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });

        // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
        wx.onMenuShareWeibo({
          title: shareTitle, // 分享标题
          desc: shareDesc, // 分享描述
          link: shareLink, // 分享链接
          imgUrl: shareImgUrl, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });

        // 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
        wx.onMenuShareQZone({
          title: shareTitle, // 分享标题
          desc: shareDesc, // 分享描述
          link: shareLink, // 分享链接
          imgUrl: shareImgUrl, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });

      }
    },
  }
</script>
<style lang="less">
  @import '~vux/src/styles/reset.less';
</style>
<style>
  @import '../src/assets/css/reset.css';
  @import '../src/assets/css/common.css';
  @import "../src/assets/css/user.css";
  #app {
    font-family: 'PingFangSC-Regular','-apple-system-font','Microsoft YaHei';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    /*position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(245, 245, 245);*/
  }
  /*.page-tabbar{
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: scroll;
  }*/
</style>

