import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class Admin extends Component {
	render() {
		if(!this.props.isLogin){
			return <Redirect to="/login"/>
		}
		return (
			<div style={{fontSize:'20px'}}>
				欢迎{this.props.username}登录
			</div>
		)
	}
}
export default connect(
	(state)=>({
		username:state.userInfo.user.username,
		isLogin:state.userInfo.isLogin
	}),
	{}
)(Admin)
