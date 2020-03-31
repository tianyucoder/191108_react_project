import {SAVE_USER_INFO,DELET_USER_INFO} from '../action_types'

export const createSaveUserAction = (userObj)=>{
	//向localStorage中存入用户信息，包含：user:{} token:''
	const {user,token} = userObj
	localStorage.setItem('user',JSON.stringify(user))
	localStorage.setItem('token',token)
	return {type:SAVE_USER_INFO,data:userObj}
}

export const createDeleteUserAction = ()=>{
	localStorage.clear()
	return {type:DELET_USER_INFO}
}