/* 
	该文件用于管理项目中所有ajax请求，每一个API接口都匹配一个函数，专门用于发送请求。
*/
import jsonp from 'jsonp'
import ajax from './ajax'
import {WEATHER_BASE_URL,WEATHER_AK,WEATHER_LOCATION} from '../config'
import {message} from 'antd'
import store from '../redux/store'

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
//请求商品列表(分页数据)
export const reqProductList = (pageNum,pageSize) => ajax.get('/manage/product/list',{params:{pageNum,pageSize}})
//请求搜索商品(分页数据)
export const reqSearchProduct = (searchType,keyWord,pageNum,pageSize) => ajax.get('/manage/product/search',{params:{[searchType]:keyWord,pageNum,pageSize}})
//请求商品详情(通过id)
export const reqProductDetailById = (productId) => ajax.get('/manage/product/info',{params:{productId}})
//请求上架/下架商品
export const reqChangProductStatus = (productId,status) => ajax.post('/manage/product/updateStatus',{productId,status})
//请求删除图片
export const reqDeletePicture = (name)=> ajax.post('/manage/img/delete',{name})
//请求添加商品
export const reqAddProduct = (productObj)=> ajax.post('/manage/product/add',productObj)
//请求修改商品
export const reqUpdateProduct = (productObj)=> ajax.post('/manage/product/update',productObj)
//请求角色列表
export const reqRoleList = () => ajax.get('/manage/role/list')
//请求添加角色
export const reqAddRole = (roleName)=> ajax.post('/manage/role/add',{roleName})
//请求给角色授权
export const reqAuthRole = (_id,menus)=> {
	const auth_name = store.getState().userInfo.user.username //找redux要
	const auth_time = Date.now() //获取当前时间
	return ajax.post('/manage/role/update',{_id,menus,auth_name,auth_time})
}
//请求用户列表
export const reqUserList = () => ajax.get('/manage/user/list')
//请求添加用户
export const reqAddUser = (userObj) => ajax.post('/manage/user/add',userObj)



