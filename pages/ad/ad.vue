<template>
	<view class="content">
		<text>广告页</text>
		<navigator open-type="redirect" url="../login/login">重定向跳转到<登录页></navigator>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<text>广告页</text>
		<goTop></goTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		//页面生命周期方法
		onLoad() {
			this.$toast("onLoad页面加载了..")
		},
		onShow(){
			this.$toast("onShow页面显示了..")
		},
		onReady() {
			this.$toast("onReady页面可用了..")
		},
		onHide() {
			this.$toast("onHide页面隐藏了..")
		},
		onUnload() {
			this.$toast("onUnload页面销毁了..")
		},
		
		//--和滚动条相关的生命周期方法
		onPageScroll(options) {
			console.log("页面滚动了..",options)
		},
		onReachBottom() {
			console.log("页面滚动到底了..")
		},
		
		//--下拉刷新操作
		onPullDownRefresh() {
			this.$toast("页面下拉刷新了..")
			uni.stopPullDownRefresh()
		},
		
		methods: {
			
		}
	}
</script>

<style>

</style>
