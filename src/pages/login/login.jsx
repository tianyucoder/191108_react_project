import React, {Component} from 'react'
import {Form,Input,Button,message} from 'antd';
import {UserOutlined,LockOutlined} from '@ant-design/icons';
import axios from 'axios'
import qs from 'querystring'
import './css/login.less'
import logo from './imgs/logo.png'

const {Item} = Form

//使用axios请求拦截器
axios.interceptors.request.use((config)=>{
	//config是包含本次请求所有的配置项(请求地址，请参数，请求方式等等)
	const {method,data} = config //获取请求方式、参数
	//如果你发送的是post请求，而且你携带的还是json编码的数据，就要将json编码改为urlencoded编码
	if(method.toLowerCase() === 'post' && data instanceof Object){
		config.data = qs.stringify(data) 
		//JSON.stringify是用于将一个对象转为JSON字符串
		//qs.stringify是用于将一个对象转为urlencoded编码的字符串
	}
	return config
})

//使用功能axios响应拦截器
axios.interceptors.response.use(
	//响应成功的回调--状态为2开头
	response => response.data,
	//响应失败的回调--1.服务器返回的状态码非2开头 2.服务器根本就没有任何响应。
	err => {
		//console.log('###',err);
		let errmsg = ''
		if(err.message.indexOf('401') !== -1){
			errmsg = '身份校验失败，请重新登录！'
		}else if(err.message.indexOf('Network Error') !== -1){
			errmsg = '请检查网络连接！'
		}
		message.error(errmsg)
		return new Promise(()=>{})
	}
)

export default class Login extends Component {

	//表单提交的回调
  onFinish = async values => {
		//获取表单数据
		//axios发送post请求，默认会把参数通过请求体携带，以什么编码形式进行编码？url json
		let result = await axios.post('http://localhost:3000/mange',values)
		console.log('@@@',result);
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
