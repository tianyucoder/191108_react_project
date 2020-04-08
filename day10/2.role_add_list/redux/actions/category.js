import {SAVE_CATEGORY_LIST} from '../action_types'
import {message} from 'antd'
import {reqCategoryList} from '../../ajax'

export const createSaveCategoryAction = (categoryList)=> ({type:SAVE_CATEGORY_LIST,data:categoryList})

//请求分类数据的异步action
export const createSaveCategoryAsyncAction = ()=>{
	return async(dispatch)=>{
		//开启异步任务(去请求分类数据)
		let result = await reqCategoryList()
		const {status,data,msg} = result
		if(status === 0){
			dispatch(createSaveCategoryAction(data))
		}else{
			message.error(msg)
		}
	}
}
