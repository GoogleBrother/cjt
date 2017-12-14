
/* 需要一开始便加载的页面 */
import homePage from '@/components/homePage'
import home from '@/page/home/home'
import contrastGold from '@/page/home/contrastGold'
import goldTrend from '@/page/home/goldTrend'
import reclaim from '@/page/reclaim/reclaim'
import find from '@/page/find/find'
import user from '@/page/user/user'
import addressList from '@/page/user/addressList'
import login from '@/page/user/login'

export default [
  /* 登录 */
  {
    path: '/login',
    component: login,
    meta: {
      keepAlive: false,
      title: ''
    }
  },
  /* 添加银行卡 */
  {
    path: '/addBankCard',
    component: function (resolve) {
      require(['../page/user/addBankCard.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '添加银行卡'
    }
  },
  /* 银行卡列表 */
  {
    path: '/bankList',
    component: function (resolve) {
      require(['../page/user/bankList.vue'], resolve)
    },
    beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem('Authorization')) {
        next({ path: '/login' })
      } else {
        next()
      }
    },
    meta: {
      keepAlive: false,
      title: '银行卡列表'
    }
  },
  /* 订单列表 */
  {
    path: '/orderList/:id',
    component: function (resolve) {
      require(['../page/user/orderList.vue'], resolve)
    },
    beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem('Authorization')) {
        next({ path: '/login' })
      } else {
        next()
      }
    },
    meta: {
      keepAlive: false,
      title: '订单列表'
    }
  },
  /* 订单详情 */
  {
    path: '/orderDetail/:code',
    component: function (resolve) {
      require(['../page/user/orderDetail.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '订单详情'
    }
  },
  /* 提金变现订单详情 */
  {
    path: '/orderDetailCash/:code',
    component: function (resolve) {
      require(['../page/user/orderDetailCash.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '订单详情'
    }
  },
  /* 卖金订单详情 */
  {
    path: '/orderDetailMoney/:code',
    component: function (resolve) {
      require(['../page/user/orderDetailMoney.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '订单详情'
    }
  },
  /* 换金订单详情 */
  {
    path: '/orderDetailExchange/:code',
    component: function (resolve) {
      require(['../page/user/orderDetailExchange.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '订单详情'
    }
  },
  /* 检测报告 */
  {
    path: '/orderReport/:code',
    component: function (resolve) {
      require(['../page/user/orderReport.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '检测报告'
    }
  },
  /* 常见问题 */
  {
    path: '/FAQ',
    component: function (resolve) {
      require(['../page/user/FAQ.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '常见问题'
    }
  },
  /* 我的资料 */
  {
    path: '/myInfo',
    component: function (resolve) {
      require(['../page/user/myInfo.vue'], resolve)
    },
    beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem('Authorization')) {
        next({ path: '/login' })
      } else {
        next()
      }
    },
    meta: {
      keepAlive: false,
      title: '我的资料'
    }
  },
  /* 卖金 */
  {
    path: '/sellGold',
    component: function (resolve) {
      require(['../page/user/sellGold.vue'], resolve)
    },
    beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem('Authorization')) {
        next({ path: '/login' })
      } else {
        next()
      }
    },
    meta: {
      keepAlive: false,
      title: '卖金'
    }
  },
  /* 协议 */
  {
    path: '/protocol',
    component: function (resolve) {
      require(['../page/user/protocol.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '卖金协议'
    }
  },
  /* 保障 */
  {
    path: '/security',
    component: function (resolve) {
      require(['../page/home/security.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '安全保障'
    }
  },
  {
    path: '/about',
    component: function (resolve) {
      require(['../page/home/about.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '关于我们'
    }
  },
  /* 详情 */
  {
    path: '/findDetail/:id',
    component: function (resolve) {
      require(['../page/find/findDetail.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '详情'
    }
  },
  {
    path: '/sellGoldSucceed/:id',
    component: function (resolve) {
      require(['../page/user/sellGoldSucceed.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '卖金成功'
    }
  },
  {
    path: '/sellGoldSucceedSave/:id',
    component: function (resolve) {
      require(['../page/user/sellGoldSucceedSave.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '存金成功'
    }
  },
  {
    path: '/saveMoneySucceed/:id',
    component: function (resolve) {
      require(['../page/user/saveMoneySucceed.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '存金成功'
    }
  },
  {
    path: '/ReturnGoldSucceed/:id',
    component: function (resolve) {
      require(['../page/user/ReturnGoldSucceed.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '退金成功'
    }
  },
  {
    path: '/changeGold',
    component: function (resolve) {
      require(['../page/user/changeGold.vue'], resolve)
    },
    meta: {
      keepAlive: true,
      title: '提金兑换'
    }
  },
  /* 提金详情 */
  {
    path: '/changeGoldDetail/:id',
    component: function (resolve) {
      require(['../page/user/changeGoldDetail.vue'], resolve)
    },
    meta: {
      keepAlive: true,
      title: '提金详情'
    }
  },
  {
    path: '/changeGoldOrder',
    component: function (resolve) {
      require(['../page/user/changeGoldOrder.vue'], resolve)
    },
    beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem('Authorization')) {
        next({ path: '/login' })
      } else {
        next()
      }
    },
    meta: {
      keepAlive: true,
      title: '提金'
    }
  },
  {
    path: '/changeGoldSucceed/:id',
    component: function (resolve) {
      require(['../page/user/changeGoldSucceed.vue'], resolve)
    },
    meta: {
      keepAlive: true,
      title: '提金成功'
    }
  },
  {
    path: '/addressList',
    component: addressList,
    beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem('Authorization')) {
        next({ path: '/login' })
      } else {
        next()
      }
    },
    meta: {
      keepAlive: false,
      title: '地址列表'
    }
  },
  // 选择地址页面，参数1代表回收订单选择地址，2代表提金订单选择地址；
  {
    path: '/chooseAddressList/:id',
    component: function (resolve) {
      require(['../page/reclaim/chooseAddressList.vue'], resolve)
    },
    beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem('Authorization')) {
        next({ path: '/login' })
      } else {
        next()
      }
    },
    meta: {
      keepAlive: false,
      title: '选择地址'
    }
  },
  {
    path: '/addAddress',
    component: function (resolve) {
      require(['../page/user/addAddress.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '添加地址'
    }
  },
  {
    path: '/changeAddress',
    component: function (resolve) {
      require(['../page/user/changeAddress.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '编辑地址'
    }
  },
  {
    path: '/order/:id',
    component: function (resolve) {
      require(['../page/reclaim/order.vue'], resolve)
    },
    beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem('Authorization')) {
        next({ path: '/login' })
      } else {
        next()
      }
    },
    meta: {
      keepAlive: false,
      title: '填写订单'
    }
  },
  {
    path: '/inputData',
    component: function (resolve) {
      require(['../page/reclaim/inputData.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '录入资料'
    }
  },
  {
    path: '/conventionSucceed/:id',
    component: function (resolve) {
      require(['../page/reclaim/conventionSucceed.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '预约成功'
    }
  },
  {
    path: '/storeList',
    component: function (resolve) {
      require(['../page/home/storeList.vue'], resolve)
    },
    meta: {
      keepAlive: false,
      title: '服务网点'
    }
  },
  {
    path: '/contrastGold',
    component: contrastGold,
    meta: {
      keepAlive: false,
      title: '金价对比'
    }
  },
  {
    path: '/goldTrend',
    component: goldTrend,
    meta: {
      keepAlive: false,
      title: '金价对比'
    }
  },
  {
    path: '/home',
    component: homePage,
    children: [
      {
        path: '',
        component: home,
        meta: {
          keepAlive: true,
          title: '存金通'
        }
      },
      {
        path: 'reclaim',
        component: reclaim,
        meta: {
          keepAlive: true,
          title: '回收'
        }
      },
      {
        path: 'find',
        component: find,
        meta: {
          keepAlive: true,
          title: '发现'
        }
      },
      {
        path: 'user',
        component: user,
        meta: {
          keepAlive: true,
          title: '我的'
        }
      }
    ]
  },
  {
    'path': '',
    redirect: '/home'
  }
]

