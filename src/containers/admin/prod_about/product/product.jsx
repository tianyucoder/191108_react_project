import React, {Component} from 'react'
import {Card,Select,Input,Button,Table} from 'antd';
import {SearchOutlined,PlusCircleOutlined} from '@ant-design/icons';

const {Option} = Select

export default class Product extends Component {
	render() {

		//数据源
		const dataSource = [
			{
				key: '1',
				name: '测试商品1',
				desc: '一个很好的商品',
				price: '199',
				status:1
			},
			{
				key: '2',
				name: '测试商品2',
				desc: '用过的都说好',
				price: '299',
				status:2
			},
			{
				key: '3',
				name: '测试商品3',
				desc: '你值得拥有',
				price: '399',
				status:1
			},
		];

		//表格列的配置
		const columns = [
			{
				title: '商品名称',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '商品描述',
				dataIndex: 'desc',
				key: 'desc',
			},
			{
				title: '价格',
				dataIndex: 'price',
				key: 'price',
				render:(price)=> '￥'+price,
				align:'center',
			},
			{
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				align:'center',
				render:(status)=>(
					<div>
						<Button type={status === 1 ? 'danger' : 'primary'}>
							{status === 1 ? '下架' : '上架'}
						</Button>
						<br/>
						<span>{status === 1 ? '在售' : '售罄'}</span>
					</div>
				)
			},
			{
				title: '操作',
				//dataIndex: 'status',
				key: 'opera',
				width:'10%',
				align:'center',
				render:()=>(
					<div>
						<Button type="link">详情</Button>
						<br/>
						<Button type="link">修改</Button>
					</div>
				)
			},
		];

		return (
			<Card 
				title={
					<div>
						<Select defaultValue="name">
							<Option value="name">按名称搜索</Option>	
							<Option value="desc">按描述搜索</Option>	
						</Select>
							<Input style={{width:"15%",margin:"0px 10px"}}/>	
							<Button type="primary"><SearchOutlined />搜索</Button>
					</div>	
				} 
				extra={<Button type="primary" ><PlusCircleOutlined />添加商品</Button>} 
			>
				<Table
					dataSource={dataSource} 
					columns={columns} 
					bordered
				/>
			</Card>
		)
	}
}
