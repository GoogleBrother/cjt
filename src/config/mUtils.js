import Vue from 'vue';
import routes from '../router';
import VueRouter from 'vue-router';
const router = new VueRouter({
  routes
});
/**
 * 存储sessionStorage
 */
export const setStore = (name,content) => {
	if(!name) return;
	if(typeof content != 'string'){
		content = JSON.stringify(content);
	}
	window.sessionStorage.setItem(name,content);
}

/**
 * 获取sessionStorage
 */
 export const getStore = name => {
	if(!name) return;
	return window.sessionStorage.getItem(name);
}

/**
 * 删除sessionStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.sessionStorage.removeItem(name);
}
/**
 * 输入金额、克重限制
 */
export const validate = (val,isMoney) => {
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
}

/**
 * 只能输入整数
 */
export const numOnly = (val) => {
	if(val.length >= 0){
        let _val = val.replace(/[^\d]/g,"").replace(/^[\.]/g,'').replace(/^0+[1-9]/,'');
        return _val;
    }
}

/*
* 确认是否实名制，设置交易密码
*/
export const validateInfo = () => {
    let basicInfo = JSON.parse(getStore('basicInfo'));
    let idcardFlag = basicInfo.idcardFlag;
    let dealFlag = basicInfo.dealFlag,
    	txt = '';

    if(idcardFlag == 'N' && dealFlag == 'N'){
      	txt='实名认证、设置交易密码';
    }else if(idcardFlag == 'N'){
      	txt='实名认证';
    }else if(dealFlag == 'N'){
      	txt='设置交易密码';
    }
    return txt;
}
//倒计时
export const numberDown =(verfyCodeFlag,virfyCodeText)=>{
  verfyCodeFlag = false;
  var num = 60;
  var timer= setInterval(() => {
    virfyCodeText= num+'秒重新发送';
    num--;
    if(num<0){
      virfyCodeText = "发送验证码";
      verfyCodeFlag = true;
      clearInterval(timer);
    }
  },1000)
}
/*
* 支付时判断绑定银行卡
*/
export const isCardBind = (userId,amount,rechargeType) => {
    Vue.prototype.service('/user/v/bankBindingCardList', {userId: userId}, (response) => {
        if(response.data.list.length>0){
            let bankNumber = response.data.list[0].cardNo;
            let cardPhone = response.data.list[0].cardPhone;
            router.push('/mobaoBankNext/'+bankNumber+'/'+cardPhone+'/'+amount+'/pay?rechargeType='+rechargeType);
        }else{
           router.push('/mobaoBank/pay/'+amount+'?rechargeType='+rechargeType);
        }
    });
}
/*
* 判断是否登录
*/
export const isLogin = () => {
    let Authorization = getStore('Authorization');
    if(Authorization == '' || Authorization == null){
        setStore('pageUrl',window.location.href.split('#')[1]);
        router.replace('/login');
        return false;
    }else{
        return true;
    }
}
