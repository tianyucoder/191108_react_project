/* 
	该文件用于管理项目中所有ajax请求，每一个API接口都匹配一个函数，专门用于发送请求。
*/
import ajax from './ajax'

//请求登录
export const reqLogin = (loginObj)=> ajax.post('/login',loginObj)
