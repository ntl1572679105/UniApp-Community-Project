<template>
	<view class="go-top" @click="go">
		<text>回到顶部</text>
	</view>
</template>

<script>
	export default {
		name:"goTop",
		data() {
			return {
				
			};
		},
		created() {
			console.log("goTop..created..")
		},
		mounted() {
			console.log("goTop..mounted..")
		},
		destroyed() {
			console.log("goTop..destroyed..")
		},
		methods:{
			go(){
				//将滚动条滚动到顶部
				uni.pageScrollTo({
					scrollTop:0,
					duration:300
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.go-top{
	//固定定位
	position: fixed;
	right: 60rpx;
	bottom: 250rpx;
	width: 110rpx;
	height: 110rpx;
	background-color: #fff;
	border: 1px solid #aaa;
	border-radius: 50%;
	text-align: center;
	font-size: 38rpx;
	opacity: .5;
	&:active{
		opacity: .8;
	}
}
</style>