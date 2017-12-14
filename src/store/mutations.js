/**
 * Created by dengjing on 2017/5/11.
 */
import type from './mutation-types.js'
export default {
	[type.GOODS_DETAIL](state,goodsDetail) {
	    state.goodsDetail = goodsDetail;
	},
	[type.SHOW_KEY_BOARD](state,isShow) {
	    state.showKeyBoard = isShow;
	}
}
