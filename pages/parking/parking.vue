<template>
	<view class="content">
		<!--F1:自定义导航栏-->
		<!--F2:显示地图-->
		<!--longitudeNumber中心经度-->
		<!--latitudeNumber中心纬度-->
		<!--scaleNumber16缩放级别，取值范围为3-20-->
		<map id="parkingMap" class="parking-map" 
			longitude="116.42" latitude="40.063" 
			scale="15" :markers="mapMarkers" 
			@markertap="doMarkerTap"
			:style="{width:'750rpx',height:mapHeight+'px'}"
		></map>
		<!--F3:展开/隐藏图标-->
		<uni-icons :type="icType"
			style="height: 15px;" color="#bbbbbb"
			@click="hideShow"
		></uni-icons>
		<!--F4:柱状图，展示停车数据-->
		<view :style="{width:'750rpx',height:chartHeight+'px'}">
			<qiun-data-charts 
				ref="chart" type="column" :chart-data="chartData"
				@getIndex="clickChartIndex"
		    ></qiun-data-charts>
		</view>
	</view>
</template>

<script>
	import {parkingZoneList} from "../../service/index.js"
	export default {
		data() {
			return {
				//停车场数据
				parkingZones:[],
				//地图标记点
				mapMarkers:[],
				//图标要显示的数据
				chartData:{},
				//地图的高度
				mapHeight:0,
				//图表高度
				chartHeight:200,
				//图标类型
				icType:"bottom"
			}
		},
		async onLoad() {
			//访问接口，获取停车信息，保存
			this.parkingZones = await parkingZoneList();
			//将停车信息转换为地图标记点，保存
			this.mapMarkers = this.parkingZones.map((pz)=>{
				return {
					id:pz.zid,
					latitude:pz.latitude,
					longitude:pz.longitude,
					iconPath:"/static/img/loc.png",
					callout:{
						content:`${pz.zname}:${pz.unoccupied}`,
						bgColor:"#009900",
						color:"#ffffff"
					}
				}
			})
			//将服务器返回的停车信息转换为图表数据
			this.chartData = {
				categories: this.parkingZones.map((pz)=>{return pz.zname.substr(-2)}),
				series: [
				  {
					name: "车位数",
					data: this.parkingZones.map((pz)=>{return pz.unoccupied})
				  }
				]
			}
			//计算：地图高度 = 窗口高度 - 图表高度 - 显示/隐藏图标高度
			let winHeight = uni.getSystemInfoSync().windowHeight;
			this.mapHeight = winHeight - this.chartHeight -15;
		},
		methods: {
			//点击标记点时,将地图中心移动到该标记点
			doMarkerTap(e){
				//创建得到地图上下文对象
				let context = uni.createMapContext("parkingMap",this);
				//利用地图上下文对象操作地图,将地图中心点移动到当前点击的标记点上
				context.moveToLocation({
					longitude:e.detail.longitude,
					latitude:e.detail.latitude,
				});
			},
			//图表的显示隐藏
			hideShow(){
				if(this.chartHeight == 0){//隐藏状态，显示出来
					this.chartHeight = 200;
					//箭头朝下
					this.icType = "bottom"
				}else{//显示状态，隐藏起来
					this.chartHeight = 0;
					//箭头朝上
					this.icType = "top"
				}
				//计算：地图高度 = 窗口高度 - 图表高度 - 显示/隐藏图标高度
				let winHeight = uni.getSystemInfoSync().windowHeight;
				this.mapHeight = winHeight - this.chartHeight -15;
				//重新绘制图表
				this.$refs.chart.reloading()
			},
			//点击图表项移动地图
			clickChartIndex(e){
				//得到当前点击的项的索引
				let index = e.currentIndex.index
				//找到对应索引位置的停车场
				let pz = this.parkingZones[index]
				//得到该停车场的经纬度
				let longitude = pz.longitude
				let latitude = pz.latitude
				//创建得到地图上下文对象
				let context = uni.createMapContext("parkingMap",this);
				//利用地图上下文对象操作地图,将地图中心点移动到当前点击的标记点上
				context.moveToLocation({longitude,latitude});
			}
		}
	}
</script>

<style scoped lang="scss">
	
</style>