//入口文件
import Vue from 'vue'
//导入APP根组件
import app from './App.vue'
//导入路由的包
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站肯定会调用main.js ,在刚调用的时候 先从本地存储中 吧购物车的数量读出来放到store中
var car =JSON.parse(localStorage.getItem('car')||'[]')
var store =new Vuex.Store({
    state:{
        car:car
    },
    mutations:{
        addToCar(state,goodsinfo){
            //点击加入购物车,把商品信息保存到store中的car上

            //假设在购物车中没有找到对应商品
            var flag=false
            state.car.some(tem=>{
                if(DataTransferItem.id == goodsinfo.id){
                    item.count+=parseInt(goodsinfo)
                    flag=true
                     return true
                }
            })
            //如果最终循环完毕 得到的flag还是false，则把商品数据直接push到购物车中
            if(!flag){
                state.car.push(goodsinfo)
            }
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            // 修改购物车中商品的数量值
            // 分析： 
            state.car.some(item => {
              if (item.id == goodsinfo.id) {
                item.count = parseInt(goodsinfo.count)
                return true
              }
            })
            // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
          },
          removeFormCar(state, id) {
            // 根据Id，从store 中的购物车中删除对应的那条商品数据
            state.car.some((item, i) => {
              if (item.id == id) {
                state.car.splice(i, 1)
                return true;
              }
            })
            // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
          },
          updateGoodsSelected(state, info) {
            state.car.some(item => {
              if (item.id == info.id) {
                item.selected = info.selected
              }
            })
            // 把最新的 所有购物车商品的状态保存到 store 中去
            localStorage.setItem('car', JSON.stringify(state.car))
          }
    },
    getters:{
        getAllCount(state){
            var c=0;
            state.car.forEach(item=>{
                c+=item.count
            })
            return c
        },
        getGoodsCount(state){
            var o={}
            state.car.forEach(item=>{
                o[item.id]=item.count 
            })
            return o
        },
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
              o[item.id] = item.selected
            })
            return o
          },
          getGoodsCountAndAmount(state) {
            var o = {
              count: 0, // 勾选的数量
              amount: 0 // 勾选的总价
            }
            state.car.forEach(item => {
              if (item.selected) {
                o.count += item.count
                o.amount += item.price * item.count
              }
            })
            return o
          }
    }
})
//导入格式化时间的插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
 return moment(dataStr).format(pattern)
})
//导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root ='http://www.liulongbin.top:3005/'
//导入mui样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
//按需导入 munt-ui组件
/* import{ Header,Swipe,SwipeItem,Button,Lazyload} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)
Vue.component(Button.name,Button)
Vue.use(Lazyload); */
import MintUI from 'mint-ui'
Vue.use(MintUI)
import'mint-ui/lib/style.css'
//导入自己的router.js 路由模块
import router from './router.js'
//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
 
var vm = new Vue({
    el:'#app',
    render:c =>c(app),
    router,//挂载路由
    store//挂载store状态管理对象
})


