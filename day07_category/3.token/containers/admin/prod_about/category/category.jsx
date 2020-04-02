import React, { Component } from 'react'
import {Card,Button,Table} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import {reqCategoryList} from '../../../../ajax'

export default class Category extends Component {

	getCategorry = async()=>{
		let result = await reqCategoryList()
		console.log(result);
	}

	componentDidMount(){
		this.getCategorry()
	}

	render() {
		//dataSource是数据源(要展示的数据，格式为数组，后期会从服务器那边请求回来)
		const dataSource = [
			{
				key: '1', //每条数据的唯一标识
				name: '胡彦斌', //人的名字
				age: 32, //人的年龄
				address: '西湖区湖底公园1号', //人的家庭住址
				sex:'男'
			},
			{
				key: '2',
				name: '胡彦祖',
				age: 42,
				address: '西湖区湖底公园1号',
				sex:'女'
			},
			{
				key: '3',
				name: '伟雄',
				age: 18,
				address: '深圳宝安区西部硅谷大厦',
				sex:'男'
			},
			{
				key: '4',
				name: '黄民炼',
				age: 18,
				address: '深圳宝安区西部硅谷大厦',
				sex:'男'
			},
			{
				key: '4',
				name: '黄民炼',
				age: 18,
				address: '深圳宝安区西部硅谷大厦',
				sex:'男'
			},
			{
				key: '4',
				name: '黄民炼',
				age: 18,
				address: '深圳宝安区西部硅谷大厦',
				sex:'男'
			},
			{
				key: '4',
				name: '黄民炼',
				age: 18,
				address: '深圳宝安区西部硅谷大厦',
				sex:'男'
			},
			{
				key: '4',
				name: '黄民炼',
				age: 18,
				address: '深圳宝安区西部硅谷大厦',
				sex:'男'
			},
			{
				key: '4',
				name: '黄民炼',
				age: 18,
				address: '深圳宝安区西部硅谷大厦',
				sex:'男'
			},
			{
				key: '4',
				name: '黄民炼',
				age: 18,
				address: '深圳宝安区西部硅谷大厦',
				sex:'男'
			},
			{
				key: '4',
				name: '黄民炼',
				age: 18,
				address: '深圳宝安区西部硅谷大厦',
				sex:'男'
			},
		];

		//columns是表格中列的配置，是Table组件最核心的配置,每一列所有的特性都在此配置。
		const columns = [
			{
				title: '姓名', //列名
				dataIndex: 'name', //查找数据源中哪个数据项展示到该列
				key: 'name',
			},

			{
				title: '年龄',
				dataIndex: 'age',
				key: 'age',
				align:'center'
			},

			{
				title: '住址',
				dataIndex: 'address',
				key: 'address',
			},
			{
				title: '性别',
				dataIndex: 'sex',
				key: 'sex',
				align:'center'
			},
		];

		return (
			<Card 
				extra={
					<Button type="primary">
						<PlusCircleOutlined />添加
					</Button>
				} 
			>
				<button onClick={this.getCategorry}>点我获取商品分类数据</button>
				<Table 
					dataSource={dataSource}  //数据源
					columns={columns} //列的配置
					bordered //边框
					pagination={{pageSize:4}} //分页器
				/>
			</Card>
		)
	}
}
