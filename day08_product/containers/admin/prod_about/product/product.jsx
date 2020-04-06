import React, {Component} from 'react'
import {Card,Select,Input,Button,Table, message} from 'antd';
import {SearchOutlined,PlusCircleOutlined} from '@ant-design/icons';
import {reqProductList,reqSearchProduct} from '../../../../ajax'
import {PAGE_SIZE} from '../../../../config'

const {Option} = Select

export default class Product extends Component {

	state = {
		productList:[], //商品列表
		total:0, //数据总数
		searchType:'productName',//搜索类型
		current:1,//当前是第几页
		keyWord:'',//搜索关键词
	}

	//获取商品列表、搜索商品都调用getProductList
	getProductList = async(number=1)=>{
		let result //提前准备好result
		if(this.isSearch){ //如果是搜索
			const {searchType,keyWord} = this.state //获取搜索类型、搜索关键词
			//请求搜索商品
			result = await reqSearchProduct(searchType,keyWord,number,PAGE_SIZE)
		}else{
			//请求商品列表
			result = await reqProductList(number,PAGE_SIZE)
		}
		//从result上获取status,data,msg
		const {status,data,msg} = result
		if(status === 0 ){ //如果没有错误
			//从data上获取列表数据、总数、当前页
			const {list,total,pageNum} = data
			//数据维护进状态
			this.setState({productList:list,total,current:pageNum})
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
						<Button size="small" type={status === 1 ? 'danger' : 'primary'}>
							{status === 1 ? '下架' : '上架'}
						</Button>
						<br/>
						<span>{status === 1 ? '在售' : '售罄'}</span>
					</div>
				)
			},
			{
				title: '操作',
				dataIndex: '_id',
				key: 'opera',
				width:'10%',
				align:'center',
				render:(id)=>(
					<div>
						<Button 
							//点击详情跳转到详情路由，同时携带当前商品的id
							onClick={()=>{this.props.history.push(`/admin/prod_about/product/detail/${id}`)}} 
							size="small" 
							type="link"
						>详情
						</Button>
						<br/>
						<Button 
							//点击修改跳转到修改路由，同时携带当前商品的id
							onClick={()=>{this.props.history.push(`/admin/prod_about/product/update/${id}`)}} 
							size="small" 
							type="link"
						>修改
						</Button>
					</div>
				)
			},
		];

		return (
			<Card 
				title={
					<div>
						<Select 
							//Select做成了受控组件
							onChange={(value)=>{this.setState({searchType:value})}} 
							defaultValue="productName"
						>
							<Option value="productName">按名称搜索</Option>	
							<Option value="productDesc">按描述搜索</Option>	
						</Select>
							<Input 
								placeholder="输入关键字" 
								style={{width:"20%",margin:"0px 10px"}}
								onChange={(event)=>{this.setState({keyWord:event.target.value})}} //受控Input
							/>	
							{/* 点击搜索按钮后：1.标识为搜索，2.调用getProductList去搜索 */}
							<Button onClick={()=>{this.isSearch = true;this.getProductList()}} type="primary">
								<SearchOutlined />搜索
							</Button>
					</div>	
				} 
				extra={
					/* 点击添加商品跳转到添加路由 */
					<Button onClick={()=>{this.props.history.push('/admin/prod_about/product/add')}} type="primary" >
						<PlusCircleOutlined />添加商品
					</Button>
				} 
			>
				<Table
					dataSource={dataSource} 
					columns={columns} 
					bordered
					rowKey="_id"
					pagination={{
						total:this.state.total, //数据总数
						pageSize:PAGE_SIZE, //每页展示多少条
						current:this.state.current, //当前是第几页
						onChange:(number)=>{this.getProductList(number)}
					}}
				/>
			</Card>
		)
	}
}
