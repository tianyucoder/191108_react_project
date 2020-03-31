import {SAVE_USER_INFO} from '../action_types'

let _user
let _token = localStorage.getItem('token')
try {
	_user = JSON.parse(localStorage.getItem('user'))
	console.log('@@@',_user);
	if(_user === null) _user={}
} catch (error) {
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
		default:
			return preState
	}
}

