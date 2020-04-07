import React, {Component} from 'react'
import {Form,Input,Button, message} from 'antd';
import {Redirect} from 'react-router-dom'
import {UserOutlined,LockOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'
import {createSaveUserAction} from '../../redux/actions/login'
import {reqLogin} from '../../ajax'
import './css/login.less'
import logo from '../../static/imgs/logo.png'

const {Item} = Form

class Login extends Component {

	//表单提交的回调
  onFinish = async values => {
		//获取表单数据
		//axios发送post请求，默认会把参数通过请求体携带，以什么编码形式进行编码？url json
		let result = await reqLogin(values)
		const {status,data,msg} = result
		if(status === 0){ //如果登录是成功的(用户名、密码是对的)
			message.success('登录成功！',1)
			//通知redux保存用户信息
			this.props.saveUserInfo(data)
		}else{
			message.error(msg)
		}
	};
	
	//pwdValidator函数会在用户每次在密码框里输入一个字符的时候调用，会把用户输入的值传递过来，即：value
	pwdValidator = (_, value='')=>{
		let errmsg = []
		if(!value.trim()) errmsg.push('密码必须输入')
		if(value.length < 4) errmsg.push('密码必须大于等于4位')
		if(value.length > 12) errmsg.push('密码必须小于等于12位')
		if(!(/^\w+$/).test(value)) errmsg.push('密码必须是英文、数字或下划线组成')
		if(errmsg.length > 0 ) return Promise.reject(errmsg)
		else return Promise.resolve()
	}
	
	render() {
		if(this.props.isLogin) return <Redirect to="/admin"/>
		/*
			用户名/密码的的合法性要求
				1). 必须输入
				2). 必须大于等于4位
				3). 必须小于等于12位
				4). 必须是英文、数字或下划线组成
			*/
		return (
			<div className="login">
				<header className="login-header">
					<img src={logo} alt="logo"/>
					<h1>商品管理系统</h1>
				</header>
				<section className="login-content">
					<span className="form-title">用户登录</span>
					<Form
						className="login-form"
						onFinish={this.onFinish}
					>
						<Item
							name="username"
							rules={[
								{required:true,message:'用户名必须输入'},//必填
								{min:4,message:'用户名必须大于等于4位'},
								{max:12,message:'用户名必须小于等于12位'},
								{pattern:/^\w+$/,message:'用户名必须是英文、数字或下划线组成'}
							]} 
						>
							<Input 
								prefix={<UserOutlined className="site-form-item-icon" />} 
								placeholder="用户名" 
							/>
						</Item>
						<Item 
							name="password"
							rules={[
								{validator:this.pwdValidator}
							]}
						>
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
				</section>
			</div>
		)
	}
}

export default connect(
	(state)=>({
		isLogin:state.userInfo.isLogin
	}), //传递状态
	{saveUserInfo:createSaveUserAction} //传递操作状态的方法
)(Login)
