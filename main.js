import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

/***吐司方法***/
Vue.prototype.$toast = (title)=>{
	uni.showToast({
		title,
		icon:'none',
		duration:2000,
		position:'bottom'
	})
};
/*******/
/***时间戳转日期字符串过滤器***/
Vue.filter('time2Str',function(time){
	let d = new Date(time);
	let yy = d.getFullYear();
	let mm = d.getMonth() + 1;
	mm = mm<10 ? "0" + mm : mm;
	let dd = d.getDate();
	dd = dd<10 ? "0" + dd : dd;
	let hh = d.getHours();
	hh = hh<10 ? "0" + hh : hh;
	let mi = d.getMinutes();
	mi = mi<10 ? "0" + mi : mi;
	let sec = d.getSeconds();
	sec = sec<10 ? "0" + sec : sec;
	return `${yy}-${mm}-${dd} ${hh}:${mi}:${sec}`
})
/*******/
/***缴费类型编号转缴费类型名称***/
Vue.filter('feeType',(num)=>{
	let arr = ['全部类型','水费','电费','燃气费','物业费','停车费','宽带费']
	return (num < 0 || num >= arr.length) ? '未知类型' : arr[num]
})
/*******/
/***缴费类型编号转缴费类型图片***/
Vue.filter('feeTypeIcon',(num)=>{
	let arr = ['logo2','shui','dian','ranqi','wuye','tingche','kuandai']
	let iconName = (num < 0 || num >= arr.length) ? 'logo2' : arr[num]
	return `/static/img/${iconName}.png`
})
/*******/
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif