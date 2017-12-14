<template>
	<div>
		<btn @operate="show">分享</btn>
		<div v-transfer-dom>
	      <popup v-model="share">
		      <group>
		        <div class="share-wrap f-28">
		        	<div class="share-title txc">分享到</div>
		        	<ul class="flex">
		        		<li v-for="(item,key) in imgList">
		        			<img :src="item.img" class="share-img"/>
		        			<p class="color-999">{{item.name}}</p>
		        		</li>
		        	</ul>
		        </div>
		      </group>
	      </popup>
	    </div>
    </div>
</template>

<script type="es6">
	import {Group, Popup, TransferDom} from 'vux'
	import wx from '../assets/images/common/img_wx@2x.png'
	import wb from '../assets/images/common/img_wb@2x.png'
	import qq from '../assets/images/common/img_qq@2x.png'
	import fzlj from '../assets/images/common/img_fzlj@2x.png'
	import btn from './btn';
	export default{
		directives: {
	   	  TransferDom
	  	},
	   	components:{
		    Group,
	    	Popup,
	    	btn,
	  	},
		data(){
			return {
				imgList: [
					{img:wx,name: '微信'},
					{img:wb,name: '微博'},
					{img:qq,name: 'QQ'},
					{img:fzlj,name: '复制链接'},
				],
				share: false
			}
		},
		methods:{
			show(){
				this.share = !this.share;
			}
		}
	}
</script>

<style scoped="">
	.share-wrap{
		width: 100%;
		height: 3.4rem;
		padding: 0 .7rem;
		text-align: center;
	}
	.vux-popup-dialog{
		height: 3.4rem !important;
		background: #fff;
	}
	.share-title{
		color: #333;
		margin-top: .3rem;
		font-size: .28rem;
	}
	.share-wrap ul{
		display: flex;
		justify-content: space-between;
	}
	.share-wrap ul li{
		width: 1.2rem;
	}
	.share-img{
		width: .89rem;
		height: .89rem;
		margin-top: .6rem;
	}
</style>
