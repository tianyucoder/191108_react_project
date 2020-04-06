import React, {Component} from 'react'
import {Card,Select,Input,Button,Table, message} from 'antd';
import {SearchOutlined,PlusCircleOutlined} from '@ant-design/icons';
import {reqProductList} from '../../../../ajax'
import {PAGE_SIZE} from '../../../../config'

const {Option} = Select

export default class Product extends Component {

	state = {
		productList:[], //商品列表
		total:0 //数据总数
	}

	getProductList = async(number=1)=>{
		let result = await reqProductList(number,PAGE_SIZE)
		const {status,data,msg} = result
		if(status === 0 ){
			console.log(data);
			const {list,total} = data
			this.setState({productList:list,total})
		}else{
			message.error(msg)
		}
	}

	componentDidMount(){
		this.getProductList()
	}

	render() {

		//数据源
		const dataSource = this.state.productList

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
							<Input placeholder="输入关键字" style={{width:"20%",margin:"0px 10px"}}/>	
							<Button type="primary"><SearchOutlined />搜索</Button>
					</div>	
				} 
				extra={<Button type="primary" ><PlusCircleOutlined />添加商品</Button>} 
			>
				<Table
					dataSource={dataSource} 
					columns={columns} 
					bordered
					rowKey="_id"
					pagination={{
						total:this.state.total,
						pageSize:PAGE_SIZE,
						onChange:(number)=>{this.getProductList(number)}
					}}
				/>
			</Card>
		)
	}
}
