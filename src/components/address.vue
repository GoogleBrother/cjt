<template>
  <div class="">
    <div class="addressBg" v-show="isShow" @click="closeAdd()"></div>
    <section class="showChose">
      <section class="address border-top" :class="{down:!isShow,back:isShow}">
        <section class="title border-bottom">
          <span @click="closeAdd()">×</span>
          <h4>选择地址</h4>
          <a @click="closeAdd()">确定</a>
        </section>
        <section class="border-bottom">
          <div class="area" :class="{normal:Province}" @click="provinceSelected()">{{Province?Province:"请选择"}}</div>
          <div class="area" @click="citySelected();" :class="{normal:City}"  v-show="Province">{{City?City:'请选择'}}</div>
          <div class="area" @click="districtSelected()" :class="District?'':'active'" v-show="City">{{District?District:'请选择'}}</div>
        </section>
        <ul class="listContainer" :class="{go: isAnimate,back: !isAnimate}">
          <li class="addList">
            <div class="listItem">
              <a v-for="(v,k) in info"  @click="getProvinceId(v.id, v.name, k)" :class="v.selected ? 'active' : ''" >{{v.name}}</a>
            </div>
          </li>
          <li class="addList">
            <div class="listItem">
              <a v-for="(v,k) in showCityList"  @click="getCityId(v.id, v.name, k);isAnimate = true;" :class="v.selected ? 'active' : ''" >{{v.name}}</a>
            </div>
          </li>
          <li class="addList">
            <div class="listItem">
              <a v-for="(v,k) in showDistrictList"  @click="getDistrictId(v.id, v.name, k)" :class="v.selected ? 'active' : ''" >{{v.name}}</a>
            </div>
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>
<script>
  import mycity from '../config/city.json'
  export default {
    name: 'myAddress',
    props: ['isShow'],
    data () {
      return {
        showChose: this.isShow,
        showProvince: true,
        showCity: false,
        showDistrict: false,
        showCityList: false,
        showDistrictList: false,
        GetProvinceId: 2,
        // 当前选项name；
        Province: false,
        City: false,
        District: false,
        // 当前选项id；
        province: 0,
        city: 0,
        district: 0,
        // v-for循环判断是否为当前；
        selected: false,
        isAnimate: false,
        info: mycity
      }
    },
    methods: {
      choseAdd: function() {
        let datas = {};
        datas.Province = this.Province;
        datas.City = this.City;
        datas.District = this.District;
        datas.province = this.province;
        datas.city = this.city;
        datas.district = this.district;
        /*console.log(datas);*/
        this.$emit('content',datas);
      },
      closeAdd: function() {
        this.$emit('close',false);
      },
      _filter(add,name,code) {
        let result = [];
        for(let i=0;i<add.length;i++) {
          if(code == add[i].id){
            result = add[i][name];
          }
        }
        return result;
      },
      // 点击城市
      getProvinceId: function(code,input,index) {
        this.province = code;
        this.Province = input;
        this.City = null;
        this.showProvince=false;
        this.showCity=true;
        this.showDistrict = false;
        this.showCityList = this._filter(this.info,'children',this.province);
        // 点击选择当前
        this.info.map( a => a.selected = false );
        this.info[index].selected = true;
      },
      provinceSelected: function() {
        // 清除市级和区级列表
        this.showCityList = false;
        this.showDistrictList = false;
        // 清除市级和区级选项
        this.City = false;
        this.District = false;
        // 选项页面的切换
        this.showProvince = true;
        this.showCity = false;
        this.showDistrict = false;
        this.isAnimate = false;
      },
      getCityId: function(code, input, index) {
        this.city = code;
        this.City = input;
        this.showProvince=false;
        this.showCity=false;
        this.showDistrict = true;
        this.showDistrictList = this._filter(this.showCityList,'children',this.city);
        // 选择当前添加active
        this.info.map(a => a.children.map( b => b.selected = false ));
        this.showCityList.map( a => a.selected = false );
        this.showCityList[index].selected = true;
      },
      citySelected: function() {
        this.showProvince=false;
        this.showCity=true;
        this.showDistrict = false;
        this.isAnimate = false;
      },
      getDistrictId: function(code, input, index) {
        this.district = code;
        this.District = input;
        // 选择当前添加active
        this.info.map(a => a.children.map( b => b.children.map( c => c.selected = false )));
        this.showDistrictList.map( a => a.selected = false );
        this.showDistrictList[index].selected = true;
        // 选取市区选项之后关闭弹层
        this.closeAdd();
        // 传参
        this.choseAdd();
      },
      districtSelected: function() {
        this.showProvince=false;
        this.showCity=false;
        this.showDistrict = true;
        this.isAnimate = true;
      }
    },
    mounted:function () {
    }
  }
</script>
<style scoped="true">
  .go{
    -webkit-transform: translate3d(-50%, 0, 0);
    transition: transform .2s ease-in-out 0s;
  }
  .back{
    -webkit-transform: translate3d(0, 0, 0);
    transition: transform .2s ease-in-out 0s;
  }
  .down{
    -webkit-transform: translate3d(0, 100%, 0);
    transition: transform .2s ease-in-out 0s;
  }
  .addressWap{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
  }
  .myAddress{
    width: 100%;
    background-color: white;
    border-top: 4px solid rgba(245,245,245,1);
    color:#333;
  }
  .myAddress .cont{
    border-bottom: 1px solid rgba(245,245,245,0.8);
  }
  .myAddress .cont span{
    display: inline-block;
    font-size: 0.28rem;
    color: #333;
    line-height: 0.88rem;
    margin-left: 0.32rem;
  }
  .myAddress .cont section{
    float:left;
  }
  .myAddress .cont p{
    display: inline-block;
    font-size: 0.28rem;
    color: #333333;
    line-height: 0.88rem;
    margin-left: 1rem;
  }
  .myAddress .cont .pic2{
    float: right;
    width: 0.14rem;
    height: 0.24rem;
    margin: 0.32rem 0.32rem 0.32rem 0;
  }
  .myAddress .cont p.text{
    margin-left: 0.72rem;
  }
  .addressBg{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    z-index: 500;
    background-color: rgba(0,0,0,0.5);
  }
  .showChose{
    width:100%;
    height:100%;
    /*position:fixed;
    top:0;
    left:0;
    z-index:500;*/
  }
  .address{
    position:fixed;
    bottom:0;
    left:0;
    z-index:500;
    background:#fff;
    width:100%;
    height: 75%;
  }
  .title{display: flex; justify-content: space-between; align-items: center;}
  .title h4{
    display:inline-block;
    text-align: center;
    font-size:0.32rem;
    line-height:0.88rem;
    font-weight:normal;
    color:#999;
    flex: 1;
  }
  .title span{
    width: .8rem;
    font-size:0.45rem;
    line-height:0.34rem;
    color:#D8D8D8;
    text-align: center;
  }
  .title a{
    width: 1rem;
    font-size:0.28rem;
    line-height:0.34rem;
    color:#157efb;
    text-align: center;
  }
  .area{
    display:inline-block;
    font-size:0.24rem;
    line-height:0.88rem;
    margin-left:0.42rem;
    color:#333;
    color: #f23030;
  }
  .normal{color:#333 }
  .addList{
    width:100%;
    font-size:0.34rem;
    line-height:0.88rem;
    color:#333;
  }
  .listItem{
    width: 100%;
    height: inherit;
    display: block;
    padding: 0 .4rem;
  }
  /* 修改的格式 */
  .address ul{
    height:75%;
    display: flex;
  }
  .address ul li{
    display: block;
    width: 50%;
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 50%;
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background-color: #fff;

  }
  .address ul li:nth-child(2){
    background: #f5f5f5;
  }
  .address ul li a{
    display: block;
    position: relative;
    font-size: .26rem;
    line-height: .6rem;
  }
  .address ul li a:before{
    content: "";
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #d9d9d9;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
  .address .title .active{
    color:#f23030;
    border-bottom:0.02rem solid #0071B8;
  }
  .address ul .active{
    color:red;
  }
  .address ul .active:after{
    position: absolute;
    right: 0;
    content: "\E600";
    font-family: YDUI-INLAY;
  }

</style>
