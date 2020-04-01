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
import {createDeleteUserAction} from '../../../redux/actions/login'
import './css/header.less'

const {confirm} = Modal;

class Header extends Component {

	state = {
		isFull:false, //标识是否全屏
		time:dayjs().format('YYYY年 MM月DD日 HH:mm:ss')
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
			}
		});
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
	}

	componentWillUnmount(){
		clearInterval(this.timer)
	}

	render() {
		return (
			<div className="header-wraper">
				<div className="header-top">
					<Button onClick={this.fullScreen} size="small">
						{this.state.isFull?	<FullscreenExitOutlined/> : <FullscreenOutlined/>}
					</Button>
					<span className="user-show">欢迎，{this.props.username}</span>
					<Button onClick={this.logout} type="link">退出登录</Button>
				</div>
				<div className="header-bottom">
					<div className="bottom-left">
						<span>首页</span>
					</div>
					<div className="bottom-right">
						<span>{this.state.time}</span>
						<img src="http://img5.imgtn.bdimg.com/it/u=1382349970,2004873955&fm=26&gp=0.jpg" alt=""/>
						<span>小雨转多云 温度：0~1℃</span>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(
	(state)=>({username:state.userInfo.user.username}),//传递状态
	{
		deleteUser:createDeleteUserAction
	}//传递操作状态的方法
)(Header)
