import React, { Component } from 'react'
import {Form,Input,Button} from 'antd';
import {UserOutlined,LockOutlined} from '@ant-design/icons';
import './css/login.less'
import logo from './imgs/logo.png'

const {Item} = Form

export default class Login extends Component {

	//表单提交的回调
  onFinish = values => {
    console.log('我收到了登录表单的数据: ', values);
	};
	
	render() {
		return (
			<div className="login">
				<div className="login-header">
					<img src={logo} alt="logo"/>
					<h1>商品管理系统</h1>
				</div>
				<div className="login-content">
					<h1>用户登录</h1>
					<Form
						className="login-form"
						onFinish={this.onFinish}
					>
						<Item name="username">
							<Input 
								prefix={<UserOutlined className="site-form-item-icon" />} 
								placeholder="用户名" 
							/>
						</Item>
						<Item name="password">
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="密码"
							/>
						</Item>
						<Item>
							<Button 
								type="primary" 
								htmlType="submit" /*指定按钮的作用是提交表单 */
								className="login-form-button"
							>
								登录
							</Button>
						</Item>
					</Form>
				</div>
			</div>
		)
	}
}
