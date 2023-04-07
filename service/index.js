/***服务器访问接口函数的封装***/

/*服务器接口基础地址*/
export let base = "https://web.codeboy.com/zhsqapi/"

/**
 1.2、用户登录
	 接口地址：user/login
	 请求方式：POST
	 请求主体格式：application/json   
	 请求数据说明：
		 名称	必填	类型		说明
		 phone	是	string	手机号
		 pwd	是	string	密码
 */
export let userLogin = async (phone,pwd)=>{
	//1.准备地址
	let url = base + "user/login";
	//2.显示loading..
	uni.showLoading({
		title:"登录中.."
	})
	//3.发起异步请求
	let [err,res] = await uni.request({
		url,
		method:"POST",
		data:{phone,pwd}
	})
	//4.取消loading..
	uni.hideLoading();
	//5.返回数据
	return res.data;
}

/**
2.1、首页数据
	接口地址：index/data
	请求方式：GET
	请求主体：无
	请求参数：无
	请求头部：token - 用户登录后保存在客户端的身份凭证
	响应主体格式：json object；属性说明：
		名称			类型		说明
		carousels	array	轮播广告数据列表
		menuItems	array	当前用户定制的功能菜单列表
		activities	array	社区活动数据列表
 */
export let indexData = async ()=>{
	//1.准备地址
	let url = base + "index/data"
	//2.提示loading..
	uni.showLoading({
		title:"数据加载中.."
	})
	//3.访问接口
	let [err,res] = await uni.request({
		url,
		header:{
			"token":uni.getStorageSync("userToken")
		}
	})
	//4.取消loading..
	uni.hideLoading();
	//5.返回数据
	return res.data;
}

/*
3.1、当前登录用户各项待缴费金额汇总
	接口地址：fee/list
	请求方式：GET
	请求主体：无
	请求参数：无
	请求头部：token - 用户登录后保存在客户端的身份凭证
*/
export let feeList = async ()=>{
	//1.准备地址
	let url = base + 'fee/list'
	//2.显示loading..
	uni.showLoading({
		title:"缴费数据读取中.."
	})
	//3.访问接口获取待缴费数据
	let [err,res] = await uni.request({
		url,
		header:{
			"token":uni.getStorageSync("userToken")
		}
	})
	//4.取消loading..
	uni.hideLoading();
	//5.返回数据
	return res.data;
}
/*
3.4、当前登录用户缴费记录
	接口地址：fee/record
	请求方式：GET
	请求主体：无
	请求参数：
		type - 费用的类型；  
		startTime - 缴费开始时间（时间戳数字）；
		endTime - 缴费结束时间（时间戳数字）；
	请求头部：
		token - 用户登录后保存在客户端的身份凭证
*/
export let feeRecord = async (type,startTime,endTime)=>{
	//1.准备URL
	let url = base + 'fee/record'
	//2.提示loading..
	uni.showLoading({
		title:"缴费记录查询中.."
	})
	//3.访问接口获取缴费记录数据局
	let [err,res] = await uni.request({
		url,
		data:{type,startTime,endTime},
		header:{
			"token":uni.getStorageSync("userToken")
		}
	})
	//4.取消loading..
	uni.hideLoading();
	//5.返回数据
	return res.data;
}
/*
3.2、获取指定类型的收费单位列表
	接口地址：fee/collector
	请求方式：GET
	请求主体：无
	请求示例：fee/collector?type=2
	请求数据说明：
		名称	 必填 类型	说明
		type 是	number 收费类型， 1-水费、2-电费、3-燃气费、
								4-物业费、5-停车费、6-宽带费
*/
export let feeCollector = async (type)=>{
	//1.准备URL
	let url = base + 'fee/collector'
	//2.显示loading..
	uni.showLoading({
		title:"加载信息中.."
	})
	//3.访问接口获取数据
	let [err,res] = await uni.request({
		url,
		data:{type}
	})
	//4.取消loading..
	uni.hideLoading()
	//5.返回数据
	return res.data;
}
/*
4.1、根据业主缴费编号查询该业主的基本信息
	接口地址：household/query
	请求方式：GET
	请求主体：无
	请求示例：household/query?hhid=S60011
	注意：前端对此接口的请求需要防抖，时间间隔在2s以上
	名称	必填	类型	说明
	hhid	必需	string	待查询的业主缴费编号
 */
export let householdQuery = async (hhid)=>{
	//1.拼接地址
	let url = base + 'household/query';
	//2.访问接口获取数据
	let [err,res] = await uni.request({
		url,
		data:{hhid}
	})
	//3.返回数据
	return res.data;
}
/*
3.3、提交缴费记录
	接口地址：fee/add
	请求方式：POST
	请求主体格式：application/json
	请求头部：token - 用户登录后保存在客户端的身份凭证
	请求数据说明：
		名称			必填		类型			说明
		token		是		string		请求头部中必须携带登录成功后得到的身份令牌，且必须在有效期内
		type		是		number		1-水费、2-电费、3-燃气费、4-物业费、5-停车费、6-宽带费
		collectorId	是		number		收费单位编号
		householdId	是		string		业主用户编号
		amount		是		float(10,2)	缴费金额
*/
export let feeAdd = async (type,collectorId,householdId,amount)=>{
	//1.准备地址
	let url = base + 'fee/add';
	//2.显示loading..
	uni.showLoading({
		title:"执行中.."
	})
	//3.访问接口
	let [err,res] = await uni.request({
		url,
		method:"POST",
		data:{type,collectorId,householdId,amount},
		header:{"token":uni.getStorageSync("userToken")}
	})
	//4.关闭loading..
	uni.hideLoading();
	//5.返回结果
	return res.data;
}
/*
5.1、返回所有停车区坐标及当前空闲数据
	接口地址：parking/zone/list
	请求方式：GET
	请求主体：无
 */
export let parkingZoneList = async ()=>{
	//1.准备地址
	let url = base + "parking/zone/list"
	//2.显示loading..
	uni.showLoading({
		title:"数据加载中.."
	})
	//3.访问接口
	let [err,res] = await uni.request({url})
	//4.取消loading..
	uni.hideLoading();
	//5.返回结果
	return res.data
}
/*
6.3、分页获取互动消息列表
	接口地址：chat/query
	请求方式：GET
	请求参数：pageNum 
	请求数据： 
	名称	必填	类型	说明
	pageNum	非必需	number	默认值为1；要查询的互动消息页号
*/
export let chatQuery = async (pageNum)=>{
	//1.准备URL
	let url = base + "chat/query";
	//2.显示loading..
	//uni.showLoading({title:"加载中.."})
	//3.访问接口
	let [err,res] = await uni.request({
		url,
		data:{pageNum}
	})
	//4.取消loading..
	//uni.hideLoading();
	//5.返回结果
	return res.data
}