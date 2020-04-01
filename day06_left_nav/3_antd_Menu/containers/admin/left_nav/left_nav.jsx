import React, { Component } from 'react'
import {Menu} from 'antd';
import {
	HomeOutlined,
  DesktopOutlined,
  ContainerOutlined,
	MailOutlined,
	WechatOutlined
} from '@ant-design/icons';
import logo from '../../../static/imgs/logo.png'
import './css/left_nav.less'

const {SubMenu,Item} = Menu;

export default class left_nav extends Component {

	render() {
		return (
			<div>
				<header className="nav-top">
					<img src={logo} alt=""/>
					<h1>商品管理系统</h1>
				</header>
				<div>
					<Menu
						defaultSelectedKeys={['1','drtyuihrtyu']} //初始选中的菜单项 key 数组
						defaultOpenKeys={['sub1']} //初始展开的 SubMenu 菜单项 key 数组
						mode="inline" //菜单类型
						theme="dark" //主题
					>
						<Item key="1">
							<HomeOutlined />
							<span>首页</span>
						</Item>
						<Item key="2">
							<DesktopOutlined />
							<span>Option 2</span>
						</Item>
						<Item key="3">
							<ContainerOutlined />
							<span>Option 3</span>
						</Item>
						<SubMenu
							key="sub1"
							title={
								<span>
									<MailOutlined />
									<span>Navigation One</span>
								</span>
							}
						>
							<Item key="5">
								<WechatOutlined/>
								<span>Option 5</span>
							</Item>
							<Item key="6">
								<WechatOutlined/>
								<span>Option 5</span>
							</Item>
							<Item key="7">
								<WechatOutlined/>
								<span>Option 5</span>
							</Item>
						</SubMenu>
					
					
					
					
					
					
					
					
					
					
					
					
					
					</Menu>
				</div>
			</div>
		)
	}
}
