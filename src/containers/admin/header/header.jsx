import React, {Component} from 'react'
import {Button} from 'antd'
import {FullscreenOutlined} from '@ant-design/icons';
import './css/header.less'

export default class Header extends Component {
	render() {
		return (
			<div className="header-wraper">
				<div className="header-top">
					<Button size="small">
						<FullscreenOutlined/>
					</Button>
					<span className="user-show">欢迎，xxxx</span>
					<Button type="link">退出登录</Button>
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
