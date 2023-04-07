<script>
//App.vue是根组件,所有的页面都是在这个根组件内进行切换的,可以认为是根组件的子页面
//但是App.vue本身不能写任何元素内容,没有<template>标签
//可以在根组件中,完成 配置全局样式/全局数据/应用生命周期方法 等功能
	export default {
		//应用生命周期方法
		//--应用启动了
		onLaunch: function() {
			//console.log('App 启动')
			//this.$toast("App 启动")
		},
		//--应用被显示了
		onShow: function() {
			//console.log('App 显示')
			//this.$toast("App 显示")
		},
		//--应用被隐藏了
		onHide: function() {
			//console.log('App 隐藏')
			//this.$toast("App 隐藏")
		},
		//定义公共方法
		methods:{
			toast(title){
				uni.showToast({
					title,
					icon:'none',
					duration:2000,
					position:'bottom'
				})
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/*
		1.选择全部元素
			UniApp中样式配置,不可以使用*号通配符
			如果想要为所有元素进行配置:not(not)
	*/
	:not(not){
		//UNIApp的内置组件默认都不带内外边距
		//修改盒子模型的计算方案,由默认的内容盒子改为边框盒子
		box-sizing: border-box;
	}
	/*	
		2.选择页面的根元素
			不能使用body来筛选页面根元素
			需要使用page来筛选
	*/
	page{
		background-color:$uni-bg-color-grey;
	}
	/*
		3.配置所有容器元素
	*/
   view {
	   //显示方式:弹性容器
	   display: flex;
	   //弹性容器子元素的主轴方向:纵向
	   flex-direction: row;
   }
   /*
		4.配置页面的最外层元素
			通常,页面最外层包裹的view标签都会配置一个类名为content
   */
  view.content{
	  flex-direction: column;
  }
</style>
