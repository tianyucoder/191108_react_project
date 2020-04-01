import React, { Component } from 'react'
import {Menu} from 'antd';
import logo from '../../../static/imgs/logo.png'
import menus from '../../../config/menu_config'
import './css/left_nav.less'

const {SubMenu,Item} = Menu;

export default class left_nav extends Component {

	createMenu = (menuArr)=>{
		return menuArr.map((menuObj)=>{
			if(!menuObj.children){
				return (
					<Item key={menuObj.key}>
						<menuObj.icon/>
						<span>{menuObj.title}</span>
					</Item>
				)
			}else{
				return (
					<SubMenu
						key={menuObj.key}
						title={
							<span>
								<menuObj.icon/>
								<span>{menuObj.title}</span>
							</span>
						}
					>
						{this.createMenu(menuObj.children)}
					</SubMenu>
				)
			}
		})
	}

	render() {
		return (
			<div>
				<header className="nav-top">
					<img src={logo} alt=""/>
					<h1>商品管理系统</h1>
				</header>
				<div>
					<Menu
						defaultSelectedKeys={['1']} //初始选中的菜单项 key 数组
						defaultOpenKeys={['4']} //初始展开的 SubMenu 菜单项 key 数组
						mode="inline" //菜单类型
						theme="dark" //主题
					>
						{this.createMenu(menus)}
					</Menu>
				</div>
			</div>
		)
	}
}
