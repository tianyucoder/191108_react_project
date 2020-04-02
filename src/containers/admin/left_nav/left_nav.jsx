import React, { Component } from 'react'
import {Menu} from 'antd';
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {createSaveTitleAction} from '../../../redux/actions/title'
import logo from '../../../static/imgs/logo.png'
import menus from '../../../config/menu_config'
import './css/left_nav.less'

const {SubMenu,Item} = Menu;

class LeftNav extends Component {

	getTitleByPath = ()=>{
		//console.log('redux中没有title了，只能靠getTitleByPath计算了');
		const {pathname} = this.props.location
		let currentKey = pathname.split('/').reverse()[0]
		if(currentKey === 'admin') currentKey = 'home'
		let title = ''
		menus.forEach((menuObj)=>{
			if(menuObj.children instanceof Array){
				let result = menuObj.children.find((childObj)=>{
					return childObj.key === currentKey
				})
				if(result) title = result.title
			}else{
				if(menuObj.key === currentKey) title = menuObj.title
			}
		})
		this.props.saveTitle(title)
	}

	componentDidMount(){
		if(!this.props.title) this.getTitleByPath()
	}

	//根据菜单配置文件生成菜单
	createMenu = (menuArr)=>{
		return menuArr.map((menuObj)=>{
			if(!menuObj.children){
				return (
					<Item onClick={()=>{this.props.saveTitle(menuObj.title)}} key={menuObj.key}>
						<Link to={menuObj.path}>
							<menuObj.icon/>
							<span>{menuObj.title}</span>
						</Link>
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
		const currentPathArr = this.props.location.pathname.split('/')
		const selectedKey = currentPathArr.reverse()[0]
		return (
			<div>
				<header className="nav-top">
					<img src={logo} alt=""/>
					<h1>商品管理系统</h1>
				</header>
				<div>
					<Menu
						selectedKeys={[selectedKey]} //初始选中的菜单项 key 数组
						defaultOpenKeys={currentPathArr} //初始展开的 SubMenu 菜单项 key 数组
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

//withRouter可以加工组件，能让非路由组件拥有路由组件的API
export default connect(
	(state)=>({title:state.title}),//传递状态
	{saveTitle:createSaveTitleAction}//传递操作状态的方法
)(withRouter(LeftNav))
