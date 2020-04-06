import {SAVE_TITLE} from '../action_types'

export default function(preState='',action){
	const {type,data} = action
	let newState
	switch (type) {
		case SAVE_TITLE:
			newState = data
			return newState
		default:
			return preState
	}
}