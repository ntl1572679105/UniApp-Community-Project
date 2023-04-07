<template>
	<view class="content">
		<!--F1：轮播广告-->
		<!--indicator-dots	Boolean	false	是否显示面板指示点-->
		<!--autoplay	Boolean	false	是否自动切换-->
		<!--interval	Number	5000	自动切换时间间隔-->
		<!--duration	Number	500	滑动动画时长-->
		<swiper :indicator-dots="true" :autoplay="true" 
			:interval="2000" :duration="500">
			<swiper-item v-for="c in carousels" :key="c.cid">
				<view class="swiper-item">
					<image @click="jump(c.href)" mode="widthFix" :src="base+c.pic"></image>
				</view>
			</swiper-item>
		</swiper>
		<!--F2:功能菜单-->
		<!--column	Number	3	每列显示个数-->
		<!--showBorder	Boolean	true 是否显示边框-->
		<!--square	Boolean	true 是否方形显示-->
		<!--highlight	Boolean	true 点击背景是否高亮-->
		<uni-grid class="func-menu" :column="4" :show-border="false" :square="true">
			<uni-grid-item v-for="m in menuItems" :key="m.iid">
				<view class="menu-item" @click="jump(m.href)">
					<image mode="widthFix" :src="base+m.pic"></image>
					<text>{{m.title}}</text>
				</view>
			</uni-grid-item>
		</uni-grid>
		<!--F3:商业服务-->
		<!--title	String	-	标题文字-->
		<!--sub-title	String	-	副标题文字-->
		<!--extra	String	-	标题额外信息-->
		<!--thumbnail	String	-	标题左侧缩略图-->
		<!--is-full	Boolean	false	卡片内容是否通栏，为true时将去除padding值-->
		<uni-card class="card" title="|商业服务" is-full>
			<view class="service">
				<view class="service-item">
					<view class="txt">
						<text class="tit">房屋租售</text>
						<view>
							<navigator>租房</navigator>
							<navigator>短租</navigator>
						</view>
					</view>
					<!--mode='widthFix' 高度随宽度等比例缩放-->
					<!--mode='scaleToFill' 不保持宽高比，缩放图片至指定宽高-->
					<image mode="scaleToFill" class="img" src="../../static/img/chuzu.png"></image>
				</view>
				<view class="service-item">
					<view class="txt">
							<text class="tit">便民服务</text>
							<view>
								<navigator>便利店</navigator>
								<navigator>超市</navigator>
							</view>
						</view>
						<!--mode='widthFix' 高度随宽度等比例缩放-->
						<!--mode='scaleToFill' 不保持宽高比，缩放图片至指定宽高-->
						<image mode="scaleToFill" class="img" src="../../static/img/bianmin.png"></image>
					
				</view>
			</view>
		</uni-card>
		<!--社区活动-->
		<uni-card class="card" title="| 社区活动" isFull padding="0">
			<uni-list>
				<uni-list-item class="active-item" 
					v-for="ac in activities" :key="ac.aid">
					<template v-slot:body>
						<view class="active-body">
							<text class="title">{{ac.title}}</text>
							<text class="content">{{ac.content}}</text>
							<text class="time">{{ac.startTime | time2Str}}</text>
						</view>
					</template>
					<template v-slot:footer>
						<image mode="widthFix" class="pic" :src="base+ac.pic"></image>
					</template>
				</uni-list-item>
			</uni-list>
		</uni-card>
	</view>
</template>

<script> 
	import {indexData,base} from "../../service/index.js";
	export default {
		data() {
			return {
				base,
				carousels:[],//轮播图信息
				menuItems:[],//菜单信息
				activities:[]//社区活动信息
			}
		},
		async onLoad() { //页面加载完成后立即执行
			//弹出 欢迎回来 吐司
			this.$toast("欢迎回来!");
			
			//加载主页数据
			//--访问接口，获取主页数据
			let data = await indexData();
			//--将主页数据保存到Vue对象中
			this.carousels = data.carousels;
			this.menuItems = data.menuItems;
			this.activities = data.activities;
		},
		methods: {
			jump(url){
				uni.navigateTo({url})
			}
		}
	}
</script>

<style scoped lang="scss">
	.swiper-item > image{
		width: 750rpx;
	}
	
	.func-menu{
		margin-top: $uni-spacing-col-base;
		background-color: $uni-bg-color;
		.menu-item{
			height: 100%;
			//弹性容器主轴方向：纵向
			flex-direction: column;
			//弹性容器主轴方向上居中
			justify-content: center;
			//弹性容器交叉轴方向上居中
			align-items: center;
			>image{
				width: 35%;
				margin-bottom: $uni-spacing-col-sm;
			}
		}
	}
	.card{
		flex-direction: column;
		margin-top: $uni-spacing-col-base !important;
	}
	.service{
		width: 100%;	
		.service-item{
			flex:1;
			padding-top: $uni-spacing-col-sm;
			padding-bottom: $uni-spacing-col-sm;
			align-items: center;
			&:nth-child(1){padding-right: $uni-spacing-row-sm;}
			&:nth-child(2){padding-left: $uni-spacing-row-sm;}
			.img{
				width: 150rpx;
				height: 120rpx;
			}
			.txt{
				font-size: $uni-font-size-sm;
				flex-direction: column;
				flex:1;//弹性子元素尺寸增长权重 1
				.tit{
					font-weight: bold;
				}
				navigator{
					margin-right: $uni-spacing-row-sm;
				}
			}
		}
	}
	.active-item{
		align-items: center;
		.active-body{
			flex-direction: column;
			width:420rpx;
			.title{
				font-size: $uni-font-size-base;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.content{
				font-size: $uni-font-size-sm;
				color:$uni-text-color-grey;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.time{
				font-size: $uni-font-size-sm;
				color:$uni-text-color-grey;
			}
		}
		.pic{
			width: 240rpx;
		}
	}
</style>
