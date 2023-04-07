<template>
	<view class="content">
		<!--F1:自定义标题栏-->
		<!--title String 标题文字-->
		<!--使用 left-icon 属性设置导航栏左侧图标-->
		<!--使用 right-icon 属性设置导航栏右侧图标-->
		<!--使用 left-text 属性设置导航栏左侧文字-->
		<!--使用 right-text 属性设置导航栏右侧文字-->
		<!--使用 color 属性修改导航栏前景色（文字图标颜色）-->
		<!--使用 background-color 属性修改导航栏背景色-->
		<uni-nav-bar class="nav-bar" 
			left-icon="back" left-text="返回" @clickLeft="back"
			title="缴 费" 
			right-icon="list" @clickRight="jump('/pages/feeRecord/feeRecord')"
			background-color="#009900" color="#ffffff">
		</uni-nav-bar>
		<!--F2:累积费用统计-->
		<view class="fee-statistics">
			<text class="hint">当前待缴费用(元)</text>
			<text class="amount">￥{{amount}}</text>
		</view>
		<!--F3:分列各项费用列表-->
		<!--title String 标题-->
		<!--thumb String 左侧缩略图，若thumb有值，则不会显示扩展图标-->
		<!--link String	navigateTo 新页面跳转方式，可选值见下表-->
		<!--to String 新页面跳转地址，如填写此属性，click 会返回页面是否跳转成功-->
		<!--rightText String 右侧文字内容-->
		<uni-list>
			<uni-list-item title="水费" thumb="/static/img/shui.png" 
				link to="/pages/feePay/feePay?type=1" 
				:right-text="fees.shui < 0 ? `待缴:${Math.abs(fees.shui)}元` : ''">
			</uni-list-item>
			<uni-list-item title="电费" thumb="/static/img/dian.png"
				link to="/pages/feePay/feePay?type=2" 
				:right-text="fees.dian < 0 ? `待缴:${Math.abs(fees.dian)}元` : ''">
			</uni-list-item>
			<uni-list-item title="燃气费" thumb="/static/img/ranqi.png"
				link to="/pages/feePay/feePay?type=3" 
				:right-text="fees.ranqi < 0 ? `待缴:${Math.abs(fees.ranqi)}元` : ''">
			</uni-list-item>
			<uni-list-item title="物业费" thumb="/static/img/wuye.png"
				link to="/pages/feePay/feePay?type=4" 
				:right-text="fees.wuye < 0 ? `待缴:${Math.abs(fees.wuye)}元` : ''">
			</uni-list-item>
			<uni-list-item title="停车费" thumb="/static/img/tingche.png"
				link to="/pages/feePay/feePay?type=5" 
				:right-text="fees.tingche < 0 ? `待缴:${Math.abs(fees.tingche)}元` : ''">
			</uni-list-item>
			<uni-list-item title="宽带费" thumb="/static/img/kuandai.png"
				link to="/pages/feePay/feePay?type=6" 
				:right-text="fees.kuandai < 0 ? `待缴:${Math.abs(fees.kuandai)}元` : ''">
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import {feeList} from '../../service/index.js'
	export default {
		data() {
			return {
				fees:{}
			}
		},
		async onLoad() {
			//异步请求待徼费用信息
			this.fees = await feeList();
			
		},
		computed:{
			amount(){
				let sum = 0;
				sum = sum + (this.fees.shui<0 ? this.fees.shui : 0)
				sum = sum + (this.fees.dian<0 ? this.fees.dian : 0)
				sum = sum + (this.fees.ranqi<0 ? this.fees.ranqi : 0)
				sum = sum + (this.fees.tingche<0 ? this.fees.tingche : 0)
				sum = sum + (this.fees.wuye<0 ? this.fees.wuye : 0)
				sum = sum + (this.fees.kuandai<0 ? this.fees.kuandai : 0)
				return Math.abs(sum).toFixed(2);
			}
		},
		methods: {
			back(){
				uni.navigateBack()
			},
			jump(url){
				uni.navigateTo({url})
			}			
		}
	}
</script>

<style scoped lang="scss">
	.nav-bar{
		display: block;
		/* 样式穿透 */
		::v-deep .uni-navbar__content{
			display: block;
		}
	}
	.fee-statistics{
		flex-direction: column;
		align-items: center;
		background-color: $zh-theme-color;
		color: $uni-text-color-inverse;
		border-top: $uni-border;
		padding: $uni-spacing-col-lg * 3 0;
		.hint{
			font-size: $uni-font-size-lg * 1;
			margin-bottom: $uni-spacing-col-base;
		}
		.amount{
			font-size: $uni-font-size-base * 2.5;
			font-weight: bold;
		}
	}
</style>
