/* 
	该文件用于管理项目中所有ajax请求，每一个API接口都匹配一个函数，专门用于发送请求。
*/
import jsonp from 'jsonp'
import ajax from './ajax'
import {WEATHER_BASE_URL,WEATHER_AK,WEATHER_LOCATION} from '../config'
import { message } from 'antd'

//请求登录
export const reqLogin = (loginObj)=> ajax.post('/login',loginObj)
//请求天气信息
export const reqWeatherData = () => {
	const url = `${WEATHER_BASE_URL}?location=${WEATHER_LOCATION}&output=json&ak=${WEATHER_AK}`
	return new Promise((resolve)=>{
		jsonp(url,{timeout:3000},(err,data)=>{
			if(!err){
				const {error} = data
				if(error === 0) resolve(data.results[0].weather_data[0])
				else message.error('百度服务器返回天气信息有误，请联系管理员');
			}else{
				message.error('获取天气信息失败，请联系理员！');
			}
		})
	})
}
//请求分类列表
export const reqCategoryList = ()=> ajax.get('/manage/category/list')
//请求添加分类
export const reqAddCategory = (categoryName) => ajax.post('/manage/category/add',{categoryName})
//请求修改分类
export const reqUpdateCategory = (categoryId,categoryName) => ajax.post('/manage/category/update',{categoryId,categoryName})


