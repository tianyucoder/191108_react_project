import {SAVE_USER_INFO,DELET_USER_INFO} from '../action_types'

let _user //准备好_user接收从local中读取出来的user
let _token = localStorage.getItem('token') //从local中读取token
try {
	//尝试解析local中的user字符串
	_user = JSON.parse(localStorage.getItem('user'))
	//如果local中没有user，那么JSON.parse(localStorage.getItem('user'))返回的就是null
	if(_user === null) _user={}
} catch (error) {
	//如果解析的JSON字符串不合法
	_user = {}
}

//初始化状态
let initState = {
	user:_user || {},
	token:_token || '',
	isLogin: JSON.stringify(_user) !== '{}' && _token ? true : false
}

export default function (preState=initState,action){
	const {type,data} = action
	let newState
	switch (type) {
		case SAVE_USER_INFO:
			newState = {...data,isLogin:true}
			return newState
		case DELET_USER_INFO:
			newState = {user:{},token:'',isLogin:false}
			return newState
		default:
			return preState
	}
}

