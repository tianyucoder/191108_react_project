import React, { Component } from 'react'
import { Layout } from 'antd';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Header from './header/header'
import LeftNav from './left_nav/left_nav'
import './css/admin.less'

const {Footer, Sider, Content } = Layout;

class Admin extends Component {
	render() {
		if(!this.props.isLogin) return <Redirect to="/login"/>
		return (
			<Layout className="admin-wraper">
				<Sider>
					<LeftNav/>
				</Sider>
				<Layout>
					<Header/>
					<Content>Content</Content>
					<Footer>Footer</Footer>
				</Layout>
			</Layout>
		)
	}
}

export default connect(
	(state)=>({
		isLogin:state.userInfo.isLogin
	}),
	{}
)(Admin)
