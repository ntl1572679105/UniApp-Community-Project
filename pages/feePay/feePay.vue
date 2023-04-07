<template>
	<view class="content">
		<!--F1:自定义导航条-->
		<uni-nav-bar class="nav-bar" title="缴 费"
			left-icon="back" left-text="返回" @clickLeft="back()"
			right-icon="list" @clickRight="jump('/pages/feeRecord/feeRecord')"
			background-color="#009900" color="#ffffff"
		></uni-nav-bar>
		<!--F2:缴费类型&金额-->
		<uni-list class="list-amount">
			<uni-list-item 
				:title="type | feeType" 
				:thumb="type | feeTypeIcon" thumbSize="lg">
				<template v-slot:footer>
					<view class="footer-amount">
						<input type="digit" placeholder="请输入缴费金额" v-model="amount"/>
						<text>元</text>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<!--F3:缴费详情-->
		<uni-list class="list-details">
			<!--showArrow Boolean true 是否显示箭头图标-->
			<!--clickable Boolean false 是否开启点击反馈-->
			<uni-list-item 
				title="缴费单位"
				:right-text="curCollector == -1 ? '请选择' : collectors[curCollector].cname" 
				showArrow clickable
				@click="$refs.popupCollectors.open()"
			></uni-list-item>
			<uni-list-item title="用户编号">
				<template v-slot:footer>
					<input class="user-id" 
						v-model="userId"
						placeholder="请输入用户编号" 
						@input="doUserIdChange"/>
				</template>
			</uni-list-item>
			<uni-list-item title="用户名" :rightText="household.householdName"></uni-list-item>
			<uni-list-item title="用户住址" :rightText="household.householdAddr"></uni-list-item>
		</uni-list>
		<!--F4:立即缴费 按钮-->
		<button class="subBut" @click="submitPay" :disabled="submitDisabled">立即缴费</button>
		<!--F5:弹出层：选择公司-->
		<uni-popup ref="popupCollectors" type="center">
			<view class="popup-content">
				<!--弹出层头部-->
				<view class="popup-header">
					<text>缴费单位</text>
				</view>
				<!--弹出层主体-->
				<view class="popup-body">
					<radio-group class="radio-group" 
						@change="tempCollector = $event.detail.value">
						<label class="radio-item" v-for="(col,i) in collectors" :key="col.cid">
							<text>{{col.cname}}</text>
							<radio :value="String(i)" :checked="i == curCollector"></radio>
						</label>
					</radio-group>
				</view>
				<!--弹出层尾部-->
				<view class="popup-footer">
					<button @click="$refs.popupCollectors.close()">取消</button>
					<button @click="chooseCollector">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {feeCollector,householdQuery,feeAdd} from '../../service/index.js'
	export default {
		data() {
			return {
				//缴费类型,由上一个页面传入
				type:1,
				//缴费金额
				amount:0,
				//缴费单位数组
				collectors:[],
				//临时选中缴费单位编号
				tempCollector:-1,
				//选中的缴费单位编号
				curCollector:-1,
				//用户输入的id
				userId:'',
				//当前业主信息
				household:{},
				//防抖定时器
				requestTimer:null,
				//禁用提交按钮
				submitDisabled:false
			}
		},
		async onLoad({type}) {//可以在onLoad中接收传入的参数对象
			this.type = type;
			//加载公司列表数据
			this.collectors = await feeCollector(this.type);
		},
		methods: {
			back(){
				uni.navigateBack()
			},
			jump(url){
				uni.navigateTo({url})
			},
			chooseCollector(){
				this.curCollector = this.tempCollector;
				this.$refs.popupCollectors.close();
			},
			//防抖实现
			async doUserIdChange(){
				//输入新内容触发函数，此时如果存在之前输入时增加的定时器，则清除该定时器，防抖
				if(this.requestTimer){
					clearTimeout(this.requestTimer) //取消任务
					this.requestTimer = null //防抖定时器变量改回为null
				}
				//对于本次输入 开启新定时器 2秒后访问服务器
				this.requestTimer = setTimeout(async ()=>{
					let data = await householdQuery(this.userId);
					if(data.code == 2000){
						this.household = data.msg
					}else{
						this.$toast("业主编号不存在!");
						return 
					}
				},2000)
			},
			async submitPay(){
				//缴费类型编号
				let type = this.type;
				if(type==null || type<=0){
					this.$toast("必须有缴费类型!")
					return;
				}
				//缴费公司编号
				if(this.collectors[this.curCollector]==null){
					this.$toast("请选择缴费公司!")
					return;
				}
				let collectorId = this.collectors[this.curCollector].cid
				//物业编号
				if(!this.household.householdId){
					this.$toast("请输入用户编号!")
					return;
				}
				let householdId = this.household.householdId
				//缴费金额
				if(this.amount<=0){
					this.$toast("缴费金额必须大于0元!");
					return;
				}
				let amount = this.amount;
				//访问接口，进行缴费
				let data = await feeAdd(type,collectorId,householdId,amount)
				if(data.code == 2000){
					this.$toast("缴费成功!")
					this.submitDisabled = true;
				}else{
					this.$toast("缴费失败!")
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.nav-bar{
		display: block;
		::v-deep .uni-navbar__content{
			display: block;
		}
	}
	.list-amount{
		margin-top: $uni-spacing-col-base;
		.footer-amount{
			font-size: $uni-font-size-base;
			align-items: center;
			input{
				font-size: $uni-font-size-base;
				width: 8em;
			}
		}
	}
	.list-details{
		margin-top: $uni-spacing-col-base;
		.user-id{
			font-size: $uni-font-size-sm;
			text-align: right;
		}
	}
	.subBut{
		background-color: $zh-theme-color;
		color: $uni-text-color-inverse;
		width: 90%;
		margin: 100rpx auto 0;
		&:active{
			background-color: darken($zh-theme-color,5%);
		}
	}
	.popup-content{
		flex-direction: column;
		width: 600rpx;
		background-color: $uni-bg-color;
		.popup-header{
			background-color: $zh-theme-color;
			color: $uni-text-color-inverse;
			font-size: $uni-font-size-lg;
			padding: $uni-spacing-col-base 0;
			justify-content: center;
		}
		.popup-body{
			padding: $uni-spacing-col-base 0;
			.radio-group{
				display: flex;
				flex-direction: column;
				width: 100%;
				.radio-item{
					display: flex;
					flex-direction: row;
					width: 100%;
					padding: $uni-spacing-col-base;
					text{
						flex:1;
					}
				}
			}
		}
		.popup-footer{
			box-shadow: 0 0 16rpx $uni-border-color;
			padding: $uni-spacing-col-base $uni-spacing-row-base;
			button{
				font-size: $uni-font-size-base;
				background-color: $zh-theme-color;
				color: $uni-text-color-inverse;
			}
		} 
	}
</style>
