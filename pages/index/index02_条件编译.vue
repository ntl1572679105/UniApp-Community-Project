<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<!--#ifdef H5 -->
		<text>仅H5可见的内容</text>
		<text>仅H5可见的内容</text>
		<!--#endif-->
		
		<!--#ifdef APP -->
		<text>仅APP可见的内容</text>
		<text>仅APP可见的内容</text>
		<!--#endif-->
		
		<!--#ifndef H5-->
		<text>非H5可见的内容</text>
		<text>非H5可见的内容</text>
		<!--#endif-->
	</view>
</template>

<script> 
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() { //生命周期方法: 组件加载后执行的方法,类似于vue中的mounted方法
			//#ifdef H5
			this.title="hello H5!"
			//#endif
			
			//#ifdef APP
			this.title="hello APP!"
			//#endif
		},
		methods: {
			
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	text{
		/* #ifdef H5 */
		color:red;
		/* #endif */
		
		/* #ifdef APP */
		color:blue;
		/* #endif */
		
		/* #ifndef H5 */
		border: 1px solid #000;
		/* #endif */
	}
</style>
