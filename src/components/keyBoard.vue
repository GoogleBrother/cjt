<template>
	<div class="balenceBox">
		<popup v-model="showKeyBoard">
			<div class="key-board-wrap">
				<h3><span @click="closebalancePay"></span>请输入支付密码</h3>
				<div class="error-wrap"><span>{{ errorTip }}</span></div>
        <ul class="show_ul">
            <li>{{vals.li0}}</li>
            <li>{{vals.li1}}</li>
            <li>{{vals.li2}}</li>
            <li>{{vals.li3}}</li>
            <li>{{vals.li4}}</li>
            <li>{{vals.li5}}</li>
        </ul>
        <input v-model="inputValue" type="text" maxlength="6"/>
        <p><router-link  to="/tradingPasswordFind">忘记密码</router-link></p>
        <ul class="input_ul">
          <li v-for="key in keyList" :class="{delete: key === 'delete',space:key==='space'}" @click="chooseNum(key)">{{key}}</li>
        </ul>
			</div>
		</popup>
    </div>
</template>

<script type="es6">
	import { Popup} from 'vux';
	import { mapMutations,mapState } from 'vuex';

	export default{
		mounted(){
			let normalKeyList = ["1","2","3","4","5","6","7","8","9",'space',0,'delete'];
      		this.keyList =  normalKeyList;
		},
		destroyed(){
			this.SHOW_KEY_BOARD(false);
		},
	   	components:{
	    	Popup
	  	},
		data(){
			return {
				keyList: [],
		        inputValue:"",
		        vals:{
		          	li0:null,
		          	li1:null,
		          	li2:null,
		          	li3:null,
		          	li4:null,
		          	li5:null
		        },
		        errorTip: ''
			}
		},
		computed:{
            showKeyBoard:{
            	get(){
            		return this.$store.state.showKeyBoard;
            	},
            	set(newValue){
            		this.$store.state.showKeyBoard = newValue;
            	}
            }
		},
		props:['orderBookId','type','isAdvance','isGoodsRedeem'],
		methods:{
			...mapMutations([
                'SHOW_KEY_BOARD'
            ]),
			closebalancePay(){
				this.inputValue = '';
				this.setPwd(this.inputValue);
				this.SHOW_KEY_BOARD(false);
			},
			chooseNum(key){
				this.errorTip = '';
          		if(key==="space"){
		            return;
		        }
		        else if(key==="delete"){
		            let kbt = this.inputValue;
		            this.inputValue = kbt.length ? kbt.substring(0, kbt.length - 1) : kbt;
		        }else{
		            this.inputValue=this.inputValue.length<6?this.inputValue+key:this.inputValue;
		        }
		        let cur = this.inputValue
		        this.setPwd(cur);
		       	if(cur.length==6){
		          	let data = {
		            	orderBookId:this.orderBookId,
		            	dealPwd:this.md5(cur)
		            };
		            let url,
		            	callBack;
		            if(this.type == 'BUY'){//银行金暂存
		            	url = '/orderManage/v/buy/insert';
		            	callBack = () => {
		            		this.$router.replace('/fixedGoldTrust');
		            	}
		            }else if(this.type == 'EXTRACT' || this.type == 'TGTJ'){//银行金提取
		            	url = '/orderManage/v/take/insert';
		            	callBack = () => {
		            		if(this.type == 'EXTRACT'){
		            			this.$router.replace('/underLineGold');
		            		}else{
		            			this.$router.replace('/regularHostGold');
		            		}
		            	}
		            }else if(this.type == 'ORDERPAY' || this.type=='ORDER'){//饰品订单
		              data = {
		                orderNo:"GET"+this.orderBookId ,
		                dealPwd:this.md5(cur)
		              }
		              url = '/goldMall/v/goodsOrderPay';
		              callBack = () => {
		                this.$vux.toast.text('支付成功');
		                if(this.type== 'ORDER'){
	                      window.location.reload();
	                    } else{
	                      this.$router.replace('/OrnamentOrder');
	                    }
		              }
		            }else if(this.type == 'TERMORDERPAY'||this.type == 'TERMORDER'){//饰品暂存订单
		              data = {
		                orderId:this.orderBookId,
		                dealPwd:this.md5(cur)
		              };
		              url = '/orderManage/v/goodsTermOrderPay';
		              callBack = () => {
		                this.$vux.toast.text('支付成功');
	                    if(this.type== 'TERMORDER'){
	                      window.location.reload();
	                    } else{
	                      this.$router.replace('/OrnamentTrust');
	                    }
			          }
			        }else if(this.type == 'SALE'){//赎回
		              data = {
		                termOrderId: this.orderBookId,
		                dealPwd: this.md5(cur),
		                isAdvance: this.isAdvance, //是否提前赎回 0：是 1：否
		                isGoodsRedeem: this.isGoodsRedeem, //是否饰品赎回 0：是 1：否
		              };
		              url = 'orderManage/v/sale/insert';
		              callBack = () => {
		                  if(this.isAdvance=='0'){
                        this.$vux.toast.text('赎回申请成功');
                      } else {
                        this.$vux.toast.text('赎回成功');
                      }
                      window.location.reload();
			          }
		            } else if(this.type == 'DELIVERY'){
	                  data = {
	                    orderId: this.orderBookId,
	                    type: '3',
	                    dealPwd: this.md5(cur)
	                  }
	                  url = 'orderManage/v/goodsOrderUpdate';
	                  callBack = () => {
	                    window.location.reload();
	                  }
	                }
		            this.commonService(url,data,callBack);
		        }
		    },
		    commonService(url,data,callBack){
          this.inputValue = '';
		    	this.service(url,data,response => {
		    		this.inputValue = '';
		    		if(response.code == '200006'){
              this.errorTip = response.description;
						  this.setPwd(this.inputValue);
              return false;
              }
              if(callBack){
                this.SHOW_KEY_BOARD(false);
                callBack && callBack();
              }
		        });
		    },
		    setPwd:function (values) {
	          	for(var i=0;i<6;i++){
	            	if(values[i]){
	              		this.vals['li'+i] = "*";
	            	}
	            	else{
	              		this.vals['li'+i] = "";
	            	}
	          	}
	        },
		}
	}
</script>

<style scoped>
	.balenceBox .key-board-wrap{
		overflow: hidden;
		background-color: #fff;
	}
	.balenceBox h3{
		padding-left: .6rem;
		font-size: .36rem;
		line-height: .95rem;
		color: #000;
		border-bottom: 1px solid #d8d8d8;
		text-align: center
	}
  	.balenceBox h3 span{
  		width: .34rem;
  		height: .34rem;
  		float: right;
  		margin: 0.26rem .26rem .26rem 0;
  		background-image: url("../assets/images/common/btn_gb@2x.png");
  		background-size: cover;
  	}
  	.error-wrap{
  		padding: 0 .4rem;
  		height: .57rem;
  		line-height: .57rem;
  		font-size: .24rem;
  		color: #ee5768;
  	}
	.show_ul{
		width: 6.9rem;
		margin: 0 auto;
		height: .96rem;
    font-size:.64rem;
	}
	.show_ul li{
		float: left;
		height: .94rem;
		width: 1.13rem;
		border: 1px solid #999;
		border-right: 0;
		text-align: center;
    line-height: 1.3rem;
   	}
   	.show_ul li:last-child{
   		border-right: 1px solid #999;
   	}
 	.balenceBox p{
 		color: #219df4;
 		font-size: .32rem;
 		line-height: 0.89rem;
 		padding: 0 .4rem;
 		text-align: right;
 	}
 	.balenceBox p a{
 		color:#219df4;
 	}
  	.input_ul {
  		margin-top: 1.09rem;
  	}
  	.input_ul li{
  		float: left;
  		background-color:#fff;
  		width: 32%;
  		box-sizing:
  		border-box;
  		border-bottom: 1px solid #bbb;
  		text-align: center;
  		color: #333;
  		font-size: .56rem;
  		line-height: 1.08rem;
  	}
  	.input_ul li:nth-child(3n-1){
  		border-right:1px solid #bbb;
  		border-left: 1px solid #bbb;
  		width: 36%;
  	}
  	.input_ul .space,.input_ul .delete{
  		background-color: #d2d5db;
  		text-indent: -999rem;
  	}
  	.delete{
  		background: url("../assets/images/common/img-delete_06.png") no-repeat center;
  		background-size: 23px 17px;
  	}
  	input{display: none}
</style>
