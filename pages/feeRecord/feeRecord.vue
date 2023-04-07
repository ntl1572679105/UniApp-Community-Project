<template>
	<view class="content">
		<view>
			<!--第一个数据拾取器(普通选择器):缴费类型-->
			<!--支持五种选择器，通过mode来区分，分别是普通选择器，多列选择器，时间选择器，日期选择器，省市区选择器，默认是普通选择器-->
			<!--range	Array / Array<Object>	[]	mode为 selector 或 multiSelector 时，range 有效-->
			<!--@change	EventHandle value 改变时触发 change 事件，event.detail = {value: value}-->
			<picker class="picker" mode="selector" 
				:range="feeTypes" 
				@change="doFeeTypeChange">
				<view class="picker-content">
					<text class="txt">{{curFeeType < 0 ? "缴费类型" : feeTypes[curFeeType]}}</text>
					<uni-icons type="bottom"></uni-icons>
				</view>
			</picker>
			<!--第二个数据拾取器(日期选择器):缴费月份-->
			<!--fields String day 有效值 year、month、day，表示选择器的粒度，默认为 day-->
			<picker class="picker" mode="date" fields="month"
				@change="doMonthChange">
				<view class="picker-content">
					<text>{{curMonth}}</text>
					<uni-icons type="bottom"></uni-icons>
				</view>
			</picker>
		</view>
		<!--F2:缴费记录-->
		<!--thumbnail String 标题左侧缩略图,支持网络图片，本地图片，本图片需要传入一个绝对路径，如：/static/xxx.png-->
		<!--extra String 标题额外信息-->
		<uni-card v-for="rec in records" :key="rec.fid" 
			class="record" :title="rec.type | feeType" padding="0"
			:thumbnail="rec.type | feeTypeIcon" :extra="`￥${rec.amount}`">
			<uni-list class="record-content">
				<uni-list-item title="缴费状态" right-text="交易成功"></uni-list-item>
				<uni-list-item title="缴费用户" :right-text="rec.householdId"></uni-list-item>
				<uni-list-item title="缴费时间" :right-text="rec.paidTime | time2Str"></uni-list-item>
			</uni-list>
		</uni-card>
	</view>
</template>

<script>
	import {feeRecord} from '../../service/index.js'
	export default {
		data() {
			return {
				curFeeType:-1,
				feeTypes:['全部类型','水费','电费','燃气费','物业费','停车费','宽带费'],
				curMonth:'选择月份',
				records:[]
			}
		},
		onLoad() {
			this.requestFeeRecord();
		},
		methods: {
			doFeeTypeChange(e){
				this.curFeeType = e.detail.value
				this.requestFeeRecord()
			},
			doMonthChange(e){
				this.curMonth = e.detail.value
				this.requestFeeRecord()
			},
			async requestFeeRecord(){
				//设置请求参数初始值
				let type = 0;
				let startTime = 0;
				let endTime = 0;
				//计算类型
				if(this.curFeeType != -1){
					type = this.curFeeType
				}
				//计算开始结束时间
				if(this.curMonth != '选择月份'){//2023-03
					//月开始毫秒
					startTime = new Date(this.curMonth) - 1000 * 60 * 60 * 8;
					//月的结束毫秒
					let y = this.curMonth.split("-")[0]
					let m = this.curMonth.split("-")[1]
					endTime = new Date(y,m) - 1;
				}
				//调用接口获取数据
				this.records = await feeRecord(type,startTime,endTime);
			}
		}
	}
</script>

<style scoped lang="scss">
	.picker{
		display: inline-block;
		width: $uni-font-size-base * 8;
		.picker-content{
			background-color: white;
			font-weight: bold;
			align-items: center;
			border: $uni-border;
			border-radius: $uni-border-radius-base * 2;
			padding: $uni-spacing-col-sm $uni-spacing-col-base;
			margin: $uni-spacing-col-lg 0 $uni-spacing-col-lg $uni-spacing-col-lg;
			.txt{
				flex:1;
				text-align: center;
			}
		}
	}
	.record{
		flex-direction: column;
		.record-content{
			width: 100%;
		}
	}
</style>
