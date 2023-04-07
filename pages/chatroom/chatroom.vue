<template>
	<view class="content">
		<!--F1:导航条,自定义导航条-->
		<!--F2:封面-->
		<!--F3:消息-->
		<uni-list>
			<uni-list-item v-for="msg in msgList" :key="msg.mid">
				<template v-slot:header>
					<view class="msg-header">
						<image :src="base+msg.avatar" mode="widthFix"/>
					</view>
				</template>
				<template v-slot:body>
					<view class="msg-body">
						<view class="uname">{{msg.uname}}</view>
						<view class="content">{{msg.content}}</view>
						<view class="pic-list">
							<image v-for="pic in msg.picList" :key="pic.pid" mode="aspectFill" 
								:src="base + pic.url"/>
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<!--F4:页面底部 加载更多 提示-->
		<uni-load-more :status="isLoading ? 'loading' : (pageNum < pageCount ? 'more' : 'noMore')"></uni-load-more>
	</view>
</template>

<script>
	import {base,chatQuery} from "../../service/index.js"
	export default {
		data() {
			return {
				base,
				//显示的消息列表
				msgList:[],
				//当前页码
				pageNum:0,
				//总页码
				pageCount:9999,
				//是否正在加载新数据
				isLoading:false
			}
		},
		//生命周期方法：页面加载完成
		async onLoad() {
			//加载第一个数据
			this.loadNextPageData();
		},
		//生命周期方法:页面滚动触底
		onReachBottom() {
			//加载下一页数据
			this.loadNextPageData();
		},
		//生命周期方法:顶部下拉刷新
		onPullDownRefresh() {
			//清除旧数据
			this.msgList = [];
			this.pageNum = 0;
			this.pageCount = 9999;
			this.isLoading = false;
			//加载下一页(此时是第一页)数据
			this.loadNextPageData();
			//停止下拉刷新
			uni.stopPullDownRefresh()
		},
		methods: {
			//加载下一页数据
			async loadNextPageData(){
				//当前页码已经大于等于了总页码，则没有后续数据了！返回
				if(this.isLoading || this.pageNum>=this.pageCount){
					return;
				}
				//正在加载新数据
				this.isLoading = true;
				//查询下一页数据
				let {pageNum,pageCount,data} = await chatQuery(this.pageNum+1)
				this.pageNum = pageNum;
				this.pageCount = pageCount;
				this.msgList = this.msgList.concat(data);
				//加载新数据完成
				this.isLoading = false;
			}
		}
	}
</script>

<style scoped lang="scss">
	.msg-header{
		image{
			width: 90rpx;
		}
	}
	.msg-body{
		flex-direction: column;
		.pic-list{
			display: block;
			image{
				width: 180rpx;
				height: 150rpx;
				border: $uni-border;
				margin-right: $uni-spacing-row-sm;
			}
		}
	}
</style>
