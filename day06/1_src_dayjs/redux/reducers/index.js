import loginReducer from './login'
import {combineReducers} from 'redux'

//combineReducers传入的那个对象，就是rdux中的总状态
export default combineReducers({
	userInfo:loginReducer
})