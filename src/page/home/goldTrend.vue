<template>
  <div class="goldTrend bg-f">
        <div class="trend">
          <div class="trendNav">
            <ul class="flex">
              <li class="flex1" :class="{selectOn:selct === 'selct1'}" @click="selct='selct1';getDAY();">天</li>
              <li class="flex1" :class="{selectOn:selct === 'selct2'}" @click="selct='selct2';getWEEK();">周</li>
              <li class="flex1" :class="{selectOn: selct === 'selct3'}" @click="selct='selct3';getMONTH();">月</li>
              <li class="flex1" :class="{selectOn: selct === 'selct4'}" @click="selct='selct4';getYEAR();">年</li>
            </ul>
          </div>
          <div class="canvsText">{{canvesText}}<span>元/克</span></div>
          <div id="main" style="width: 100%;height:250px;"></div>
          <div class="goldInstruction">
            <span class="instruction">金价说明</span>
            <h3>金价来源</h3>
            <p>上海黄金交易所交易时间段内，黄金管家金价实时参照上海黄金交易所最新成交价；</p>
            <p>上海黄金交易所休盘期间，黄金管家金价实时参照国际最新成交价；</p>
            <p>每周末全球黄金交易所闭盘时，黄金管家金价参照本周国际金价收盘价，金价不发生波动。</p>
            <h3>交易所交易时间</h3>
            <p>1. 上海黄金交易所交易时间：每周一至周五20:00－次日02:30,09:00－11:30,13:30－15:30；</p>
            <p>2. 全球黄金交易所闭盘时间：每周六06:00-周一08:00(夏时令),每周六07:00-周一07:00(冬时令)；</p>
            <p>3. 法定节假日及交易所公告的休市日，交易所的交易时间可能会有所调整。</p>
          </div>
        </div>



    <div class="btn-tab flex">
      <div class="flex1"  @click="$router.replace({path:'/contrastGold'})">行情</div>
      <div class="flex1 on">走势</div>
    </div>

  </div>
</template>
<script type="es6">
  import echarts from '../../../static/js/echarts.min'
  var Xindex = 0;
  export default {
    components: {

    },
    data () {
      return {
        index: 0,
        // 初始化空对象
        chart: null,
        // 初始化图表配置
        YData: [],
        XData: [],
        list: [],
        selct: 'selct1',
        canvesText: '',
        newPrice: '',
        minInterval: 1,
        mydatas:{
          "data":{
            "list":[
              {"time":"2017-10-13 15:30:00","price":"276.33"},
              {"time":"2017-10-13 15:30:00","price":"276.33"},
              {"time":"2017-10-13 15:30:00","price":"276.33"},
              {"time":"2017-10-13 15:30:00","price":"276.33"},
              {"time":"2017-10-13 15:30:00","price":"276.33"},
              {"time":"2017-10-13 15:30:00","price":"276.33"},
              {"time":"2017-10-13 15:30:00","price":"276.33"},
              ]
          }
        }
      }
    },
    mounted () {
      this.getDAY();
    },

    methods: {
      handler () {

      },
      // 绘图
      drawGraph (id) {
        // 绘图方法
        this.chart = echarts.init(document.getElementById(id));
        // set
        this.chart.setOption({
          /* 提示框组件 */
          tooltip: {
            trigger: 'axis',
            backgroundColor: '#FFD71E',
            borderColor: 'rgb(253, 168, 34)',
            borderWidth: 0,
            textStyle: {
              color: '#000'
            },
            padding: 4,
            axisPointer: {
              lineStyle: {
                color: '#FFD71E',
                opacity: 0
              }
            },
            /*formatter: '日期: {b0}<br />金价: {c0}'*/
            formatter: function (params) {
              // 假设此轴的 type 为 'time'。
              var value = params[0];
              Xindex = value.dataIndex;
              return value.value;
            },
          },
          title: {
            show: false
          },
          toolbox: {
            show: false
          },
          textStyle: {
            color: '#999'
          },
          xAxis: {
            type: 'category',
            triggerEvent: true,
            axisLine: {
              lineStyle: {
                color: '#eee',
                width: 1,
              }
            },
            /* 是否显示坐标轴刻度 */
            axisTick: {
              show: true
            },
            /*minInterval: 0,*/
            interval: 2,
            /* 坐标轴刻度标签的相关设置 */
            axisLabel: {
              margin: 15,
              clickable: true,
//              formatter:function(params){
//                return params;
//              }
            },
            boundaryGap: false,
            data: this.XData
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: '#eee',
                type: 'solid'
              }
            },
            splitArea: {

            },
            boundaryGap: [0, '100%'],
            splitNumber: 2,
            minInterval: 1,
            /* 间隔刻度 */
            /*interval: 5,*/
            min: 'dataMin',
            max: 'dataMax',
          },
          grid: {
            show: false,
            left: '14%',
            right: '9%'
          },
          series: [
            {
              name: '金价',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              showSymbol: false,
              symbolSize: 1,
              sampling: 'average',
              /* 原点样式 */
              itemStyle: {
                normal: {
                  color: '#fff',
                  borderColor: '#EDA835',
                  borderWidth: 1
                }
              },
              /* 折线样式 */
              lineStyle: {
                normal: {
                  color: '#EDA835',
                  width: 1
                }
              },
              /* 背景样式 */
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(255, 232, 184)'
                  }, {
                    offset: 1,
                    color: 'rgb(255, 255, 255)'
                  }])
                }
              },
              data: this.YData
            }
          ]
        })
        this.chart.hideLoading()
      },
      //获取金价
      getGoldPrice: function () {
        this.axios({
          method: 'post',
          url: '/treasury/goldPrice/v/findShowOfGoldPrice',
        })
          .then((response) => {
            this.newPrice = response.data.data.singleResult.newPrice
          })
          .catch((error) => {
            console.log(error)
          })
      },
      //  获取走势数据
      getTrend (type,callBack) {
        this.post('/price/queryPriceList', {type: type}, response => {
          let res = response.data;
          this.list = res;
          if(callBack){
            callBack();
          }
        });
      },
      //  一天
      getDAY () {
        const that = this;
        this.getTrend(1, () => {
          that.changeData('DAY');
        });
        /*this.list = this.mydatas.data.list
        this.changeData('DAY');*/
      },
      //  一周
      getWEEK () {
        const that = this;
        this.getTrend(2, () => {
          that.changeData('WEEK');
        });
      },
      //  一个月
      getMONTH () {
        const that = this;
        this.getTrend(3, () => {
          that.changeData('MONTH');
        });
      },
      getYEAR () {
        const that = this;
        this.getTrend(4, () => {
          that.changeData('YEAR');
        });
      },

      // “将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。”
      refreshDom: function () {
        this.$nextTick(function () {
          this.drawGraph('main');
          this.chart.on('click', function (param) {
            console.log(param);
          });
          let that = this;
          document.getElementById('main').onmousedown=function () {
            that.canvesText = that.list[Xindex].price;
          };
          document.getElementById('main').ontouchmove=function () {
            that.canvesText = that.list[Xindex].price;
          };
          document.getElementById('main').ontouchend=function () {
            that.canvesText = that.list[Xindex].price;
          }
        })
      },
      changeData: function (type) {
        this.XData = [];
        this.YData = [];
        for(let i = 0; i<this.list.length; i++){
          let x = {};
          let y = {};

          if (type === 'DAY') {
            x.value = this.list[i].time.split(' ')[1];
            console.log(this.list[i].time.split(' ')[1])
          } else {
            x.value = this.list[i].time.split(' ')[0];
          }


          if ( this.list[i].price !== 0 ) {
            y.value = this.list[i].price;
          }



          this.XData.push(x);
          this.YData.push(y);

        };



        this.refreshDom();
      }
    }
  }

</script>
<style>
  .goldTrend{
    padding-top: 0.5rem;
  }
  .btn-tab{
    position: fixed;
    width: 100%;
    height: .98rem;
    bottom: 0;
  }
  .btn-tab div{
    text-align: center;
    line-height: .98rem;
    font-size: .34rem;
    color: #333333;
    background: #EEEEEE;
  }
  .btn-tab div.on{
    background-color: #FFD71E;
  }
  .trend{
    background-color: #fff;
  }
  .goldPrice{
    background-color: #fff;
    height: 1.4rem;
    line-height: 1.4rem;
  }
  .goldPrice h2{
    font-size: 0.28rem;
    color: #999;
    text-align: center;
  }
  .goldPrice h2 span{
    font-size: 0.44rem;
    color: #ee5768;
    padding: 0 0.2rem 0 0.15rem;
  }
  .trendNav{
    background: #F7F7F7;
    margin: 0 .56rem;
    border-radius: .29rem;
  }
  .trendNav ul li{
    height: 0.58rem;
    line-height: 0.58rem;
    text-align: center;
    font-size: 0.28rem;
    color: #666;
  }
  .trendNav ul li.selectOn{
    color: #fff;
    background-color: #FFD71E;
    border-radius: .29rem;
  }
  .canvsText{
    font-size: 0.34rem;
    color: #EDA835;
    height: 0.4rem;
    padding-top: 0.44rem;
    box-sizing: content-box;
    text-align: center;
    /*margin-right: .54rem;*/
  }
  .canvsText span{
    font-size: .24rem;
    color: #3F3F3F;
  }
  .btn-wrap{
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 499;
  }
  .sell-out{
    height: 1rem;
    line-height: 1rem;
    font-size: .36rem;
    color: #fff;
    text-align: center;
    background-color: #fda822;
  }
  .buy_in{
    height: 1rem;
    line-height: 1rem;
    font-size: .36rem;
    color: #fda822;
    text-align: center;
    background-color: #fff;
  }
  .goldInstruction{
    font-size: 0;
    text-align: center;
    margin-top: .5rem;
    padding: 0 .72rem 1.2rem;
  }
  .goldInstruction span.instruction{
    font-size: .34rem;
    color: #666666;
    background: url("../../assets/images/home/sm.png")no-repeat left center;
    background-size: .32rem .32rem;
    padding-left: .38rem;
  }
  .goldInstruction h3{
    font-size: .28rem;
    color: #666;
    text-align: left;
    line-height: .44rem;
    padding-bottom: .1rem;
  }
  .goldInstruction p{
    font-size: .28rem;
    color: #666;
    text-align: left;
  }
</style>
