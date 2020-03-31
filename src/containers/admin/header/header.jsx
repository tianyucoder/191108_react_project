import React, {Component} from 'react'
import {Button,Modal} from 'antd'
import {connect} from 'react-redux'
import {
	FullscreenOutlined,
	FullscreenExitOutlined,
	ExclamationCircleOutlined
} from '@ant-design/icons';
import screenfull from 'screenfull'
import {createDeleteUserAction} from '../../../redux/actions/login'
import './css/header.less'

const {confirm} = Modal;

class Header extends Component {

	state = {
		isFull:false //标识是否全屏
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
		screenfull.onchange(()=>{
			let {isFull} = this.state
			this.setState({isFull:!isFull})
		})
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
						<span>2020年3月31日 15:27:01</span>
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
