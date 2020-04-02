import React, { Component } from 'react'
import {Card,Button,Table,message} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import {reqCategoryList} from '../../../../ajax'

export default class Category extends Component {

	state = {
		categoryList:[]
	}

	getCategorry = async()=>{
		let result = await reqCategoryList()
		const {status,msg,data} = result
		if(status === 0){
			this.setState({categoryList:data})
		}else{
			message.error(msg)
		}
	}

	componentDidMount(){
		this.getCategorry()
	}

	render() {
		//dataSource是数据源(要展示的数据，格式为数组，后期会从服务器那边请求回来)
		const dataSource = this.state.categoryList

		//columns是表格中列的配置，是Table组件最核心的配置,每一列所有的特性都在此配置。
		const columns = [
			{
				title: '分类名', //列名
				dataIndex: 'name', //查找数据源中哪个数据项展示到该列
				key: 'name',
			},
			{
				title: '操作',
				//dataIndex: 'name',
				key: 'name',
				width:'15%',
				align:'center',
				render:()=><Button type="link">修改分类</Button>
			},
		];

		return (
			<Card 
				extra={
					<Button type="primary">
						<PlusCircleOutlined />添加分类
					</Button>
				} 
			>
				<Table 
					dataSource={dataSource}  //数据源
					columns={columns} //列的配置
					bordered //边框
					pagination={{ //分页器
						pageSize:4, //每页展示多少条数据
						showQuickJumper:true
					}}
					rowKey="_id"
				/>
			</Card>
		)
	}
}
