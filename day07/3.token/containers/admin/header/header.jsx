import React, {Component} from 'react'
import {Button,Modal} from 'antd'
import {connect} from 'react-redux'
import {
	FullscreenOutlined,
	FullscreenExitOutlined,
	ExclamationCircleOutlined
} from '@ant-design/icons';
import screenfull from 'screenfull'
import dayjs from 'dayjs'
import {reqWeatherData} from '../../../ajax'
import {createDeleteUserAction} from '../../../redux/actions/login'
import {createSaveTitleAction} from '../../../redux/actions/title'
import './css/header.less'

const {confirm} = Modal;

class Header extends Component {

	state = {
		isFull:false, //标识是否全屏
		time:dayjs().format('YYYY年 MM月DD日 HH:mm:ss'),//当前时间
		weatherData:{//天气信息
			dayPictureUrl:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1392434059,685483866&fm=26&gp=0.jpg', //天气图片地址
			weather:'晴转多云', //天气文字信息
			temperature:'17~25℃' //温度
		} 
	}

	fullScreen = ()=>{
		screenfull.toggle();
	}

	logout = ()=>{
		confirm({
			title: '确定退出登录吗？', //弹窗主标题
			//content: '若退出登录，需要重新登录', //弹窗的副标题
			icon: <ExclamationCircleOutlined />, //弹窗中展示的图标
			okText:'确认',
			cancelText:'取消',
			onOk:()=> { //确认按钮的回调
				this.props.deleteUser()
				this.props.deleteTitle('')
			}
		});
	}

	getWeatherData = async ()=>{
		let result = await reqWeatherData()
		const {dayPictureUrl,weather,temperature} = result 
		this.setState({weatherData:{dayPictureUrl,weather,temperature}})
	}

	componentDidMount(){
		//检测全屏变化
		screenfull.onchange(()=>{
			let {isFull} = this.state
			this.setState({isFull:!isFull})
		})
		//开启定时器更新时间
		this.timer = setInterval(()=>{
			this.setState({time:dayjs().format('YYYY年 MM月DD日 HH:mm:ss')})
		},1000)
		//发送请求获取天气信息
		//this.getWeatherData()
	}

	componentWillUnmount(){
		clearInterval(this.timer)
	}

	render() {
		const {isFull,weatherData,time} = this.state
		return (
			<div className="header-wraper">
				<div className="header-top">
					<Button onClick={this.fullScreen} size="small">
						{isFull?	<FullscreenExitOutlined/> : <FullscreenOutlined/>}
					</Button>
					<span className="user-show">欢迎，{this.props.username}</span>
					<Button onClick={this.logout} type="link">退出登录</Button>
				</div>
				<div className="header-bottom">
					<div className="bottom-left">
						<span>{this.props.title}</span>
					</div>
					<div className="bottom-right">
						<span>{time}</span>
						<img src={weatherData.dayPictureUrl} alt=""/>
						<span>{weatherData.weather} 温度：{weatherData.temperature}</span>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(
	(state)=>({//传递状态
		username:state.userInfo.user.username,
		title:state.title
	}),
	{
		deleteUser:createDeleteUserAction,
		deleteTitle:createSaveTitleAction
	}//传递操作状态的方法
)(Header)
