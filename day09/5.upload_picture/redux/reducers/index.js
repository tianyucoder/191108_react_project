import loginReducer from './login'
import titleReducer from './title'
import categoryReducer from './category'
import {combineReducers} from 'redux'

//combineReducers传入的那个对象，就是rdux中的总状态
export default combineReducers({
	userInfo:loginReducer,
	title:titleReducer,
	categoryList:categoryReducer
})