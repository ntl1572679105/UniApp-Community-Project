<template>
	<view class="content">
		<!--F1:预留空间显示手机系统状态栏-->
		<view class="satus-bar" :style="{height:statusBarHeight+'px'}"></view>
		<!--F2:logo图片-->
		<!--UniApp中 image标签绘制的图片默认320px*240px,不论原始尺寸-->
		<image src="/static/img/logo.png" class="logo" 
			mode="widthFix"></image>
		<!--F3:手机号码输入框-->
		<view class="input-group">
			<input class="input" 
				type="number" placeholder="请输入手机号码" 
				v-model="phone"/>
			<uni-icons class="icon left" type="phone-filled" size="25px" color="#009900"></uni-icons>
			<uni-icons class="icon right" type="clear" 
				size="25px" color="#1296DB" 
				@click="phone=''"></uni-icons>
		</view>
		<!--F4:密码输入框-->
		<view class="input-group pwd-group">
			<input class="input" 
				:password="hidePsw"
				placeholder="请输入密码"
				v-model="pwd"/>
			<uni-icons class="icon left" type="locked-filled" 
				size="25px" color="#009900"></uni-icons>
			<uni-icons class="icon right" 
				:type="hidePsw ? 'eye-slash-filled' : 'eye-filled'" 
				size="25px" color="#8a8a8a" 
				@click="hidePsw=!hidePsw"></uni-icons>
		</view>
		<!--F5:登录按钮-->
		<button class="btn" @click="doLogin">登 录</button>
		<!--F6:忘记密码-->
		<!--导航跳转(默认)-->
		<navigator open-type="navigate" class="find" url="/pages/queryPsw/queryPsw">忘记密码</navigator>
		<!--切换页签跳转-->
		<!-- <navigator open-type="switchTab" class="find" url="/pages/index/index">首页</navigator> -->
		<!-- <navigator open-type="switchTab" class="find" url="/pages/my/my">我的</navigator> -->
	</view>
</template>

<script>
	import {userLogin} from "../../service/index.js"
	export default {
		data() {
			return {
				//状态栏高度
				statusBarHeight:0,
				//电话输入框的值
				phone:"",
				//密码输入框的值
				pwd:"",
				//是否隐藏密码
				hidePsw:true
			}
		},
		//当前页面加载完成后执行
		onLoad() {
			let {statusBarHeight} = uni.getSystemInfoSync();
			this.statusBarHeight = statusBarHeight
		},
		methods: {
			//实现登录逻辑
			async doLogin(){
				//双向绑定，获取用户输入的手机号和密码
				//校验手机号 密码 如果校验出错，报错
				if(!/^1[3-9]\d{9}$/.test(this.phone)){
					// uni.showToast({
					// 	title:"手机号码不正确!",
					// 	icon:'none',
					// 	duration:2000,
					// 	position:'bottom'
					// })
					this.$toast("手机号码不正确!")
					return;
				}
				if(this.pwd.length < 6){
					// uni.showToast({
					// 	title:"密码长度不足6位!",
					// 	icon:'none',
					// 	duration:2000,
					// 	position:'bottom'
					// })
					getApp().toast("密码长度不足6位!")
					return;
				}
				//如果校验没问题，继续登录
				//将手机号 密码 发送给服务器的登录接口实现登录
				let data = await userLogin(this.phone,this.pwd)
				
				//处理登录结果
				if(data.code == 2000){//登录成功
					//--完成登录逻辑 TODO 令牌机制
					uni.setStorageSync("userToken",data.token)
					//--提示 欢迎回来 -- 移到主页实现
					//--跳转到主页
					uni.switchTab({
						url:"/pages/index/index"
					})
				}else{//登录失败
					// uni.showToast({
					// 	title:"登录失败!",
					// 	icon:"none",
					// 	duration:2000,
					// 	position:"bottom"
					// })
					this.$toast("登录失败!")
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.satus-bar{
		//固定定位
		position: fixed;
		//宽度：占满屏幕
		width: 750rpx;
		//高度：不应写死!设备宽高比不同，写死无法适配所有设备!应该动态获取!
		//height: 20rpx;
		//背景色
		background-color: $zh-theme-color;
	}
	.logo{
		//宽度
		width:450rpx;
		//高度 可以手动设置，也可以通过设置mode实现等比缩放
		//height: 450rpx;、
		//外边距
		margin: $uni-spacing-col-lg*6 auto 0;
	}
	@media screen and (max-height: 500px) {
		.logo{
			margin-top: $uni-spacing-col-lg;
		}
	}
	@media screen and (min-height: 700px) {
		.logo{
			margin-top: $uni-spacing-col-lg*12;
			margin-bottom: $uni-spacing-col-lg*4;
		}
	}
	.input-group{
		position: relative;
		margin: $uni-spacing-col-lg*3 $uni-spacing-row-lg 0;
		align-items: center;
		.input{
			width: 100%;
			height: $uni-font-size-lg * 2;
			font-size: $uni-font-size-base;
			border: 1px solid $zh-theme-color;
			border-radius: $uni-border-radius-base;
			padding: 0 $uni-spacing-row-base * 3;
		}
		.icon{
			position: absolute;
			&.left{
				left:$uni-spacing-row-sm;
			}
			&.right{
				right:$uni-spacing-row-sm;
				&:active{
					opacity: 0.8;
				}
			}
		}
	}
	.pwd-group{
		margin-top:$uni-spacing-col-lg * 2;
	}
	.btn{
		margin: $uni-spacing-col-lg * 3 $uni-spacing-row-lg 0;
		background-color: $zh-theme-color;
		color: $uni-text-color-inverse;
		font-size: $uni-font-size-base;
		//scss函数darken 可以将颜色变深一定的百分比
		//scss函数lighten 可以将颜色变浅一定的百分比
		&:active{
			background-color: darken($zh-theme-color, 5%);
		}
	}
	.find{
		text-align: center;
		color: $zh-theme-color;
		margin-top: $uni-spacing-col-lg * 2;
	}
</style>
