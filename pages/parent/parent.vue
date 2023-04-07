<template>
	<view class="p1">
		PARENT1
		<view class="p2">PARENT2</view>
		<zh-child/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.p1{
		font-size: 1.5em;
		font-weight: bold;
	}
	.p2{
		font-style: italic;
	}
	.c1{
		color:red;
	}
	::v-deep .c2{
		text-decoration: line-through;
	}
</style>
