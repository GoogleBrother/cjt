/**
 * Created by dengjing on 2017/5/11.
 */
import mutations from './mutations'
import actions from './action'
import getters from './getters'

const  state ={
	goodsDetail: [], //购物车商品信息
	showKeyBoard: false, //密码键盘弹出
}
export default {
  state,
  getters,
  actions,
  mutations
}
