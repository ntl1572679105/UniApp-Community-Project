<template>
	<view class="content">
		<image class="logo" src="/static/1.jpg"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<uni-rate v-model="value" @change="onChange"/>
		<!-- #ifdef H5 -->
		<text>仅 h5可见内容</text>
		<!-- #endif -->
		
		<!-- #ifdef APP -->
		<text>仅 app可见内容</text>
		<!-- #endif -->
		
		<!-- #ifndef H5 -->
		<text>fei h5可见内容</text>
		<!-- #endif -->
		
		
		
		<goTop></goTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '狗狗',
			}
		},
		onLoad() {//生命周期方法：组件加载后执行的方法，类似于vue
			console.log('onload...')
			//#ifdef h5
			this.title='hello uniapp'
			//#endif
			
			// #ifdef APP
			this.title='hello ddduniapp'
			// #endif

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
		color: red;
		/* #endif */
		
		/* #ifdef APP */
		color: yellow;
		/* #endif */
		
		/* #ifndef H5 */
		color: blue;
		/* #endif */
		
	}
	
</style>
