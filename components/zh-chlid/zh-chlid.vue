<template>
	<view class="p1">
		parent1
		<view class="pic">parent2</view>
	</view>
</template>

<script>
	export default {
		name:"zh-chlid",
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
	.p1{
		font-size: 1.em;
		font-weight: bold;
	}
</style>