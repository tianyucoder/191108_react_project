import React, { Component } from 'react'
import {Card,Button,Table} from 'antd';
import {connect} from 'react-redux'
import {createSaveCategoryAsyncAction} from '../../../../redux/actions/category'
import {PlusCircleOutlined} from '@ant-design/icons';

class Category extends Component {

	componentDidMount(){
		//通知redux保存分类数据(要调用那个异步的action，他拥有发送请求的功能)
		this.props.saveCategory()
	}

	render() {
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
					dataSource={this.props.categoryList}  //数据源
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

export default connect(
	(state)=>({categoryList:state.categoryList}),//传递状态
	{
		saveCategory:createSaveCategoryAsyncAction
	} //传递操作状态的方法
)(Category)
