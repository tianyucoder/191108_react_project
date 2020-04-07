import React, { Component } from 'react'
import {Button,Card,List,message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'
import {createSaveCategoryAsyncAction} from '../../../../redux/actions/category'
import {reqProductDetailById} from '../../../../ajax'
import './css/detail.less'

const {Item} = List

class Detail extends Component {

	state = {
		imgs:[],//商品图片
		categoryId:'',//商品分类id
		name:'',//商品名称
		desc:'',//商品描述
		price:0,//商品价格
		detail:'',//商品详情
		isLoading:true //是否处于请求中
	}

	//根据分类id计算分类名
	getCategoryName = (categoryId)=>{
		let result = this.props.categoryList.find((categoryObj)=>{
			return categoryObj._id === categoryId
		})
		if(result) return result.name
	}

	//根据商品id获取商品详细信息
	getProductDetail = async()=>{
		//获取通过路由传递过来的商品_id
		const {id} = this.props.match.params //获取传递过来的id
		let result = await reqProductDetailById(id) //请求详细信息
		const {status,data,msg} = result
		if(status === 0){
			//如果成功维护数据进状态
			const {imgs,categoryId,name,desc,price,detail} = data
			this.setState({imgs,categoryId,name,desc,price,detail,isLoading:false})
		}else{
			message.error(msg)
		}
	}

	componentDidMount(){
		//尝试着从redux中读取商品分类数据
		const {categoryList,saveCategoty} = this.props
		//如果没有分类信息，通知redux请求分类信息并保存
		if(!categoryList.length) saveCategoty()
		this.getProductDetail() //根据id查询商品详细信息
	}

	render() {
		//从状态中读取数据
		const {imgs,categoryId,name,desc,price,detail,isLoading} = this.state
		return (
			<Card 
				title={
					<div>
						<Button onClick={this.props.history.goBack} type="link">
							<ArrowLeftOutlined/>
						</Button>
						<span>商品详情</span>
					</div>
				} 
			>
				<List loading={isLoading}>
					<Item className="product-item">
						<span className="item-title">商品名称：</span>
						<span>{name}</span>
					</Item>
					<Item className="product-item">
						<span className="item-title">商品描述：</span>
						<span>{desc}</span>
					</Item>
					<Item className="product-item">
						<span className="item-title">商品价格：</span>
						<span>{'￥'+price}</span>
					</Item>
					<Item className="product-item">
						<span className="item-title">所属分类：</span>
						<span>{this.getCategoryName(categoryId)}</span>
					</Item>
					<Item className="product-item">
						<span className="item-title">商品图片：</span>
						{
							imgs.map((imgName,index)=>{
								return <img key={index} src={'/upload/'+imgName} alt="pic"/>
							})
						}
					</Item>
					<Item className="product-item">
						<span className="item-title">商品详情：</span>
						<span dangerouslySetInnerHTML={{__html:detail}}></span>
					</Item>
				</List>
			</Card>
		)
	}
}

export default connect(
	(state)=>({categoryList:state.categoryList}),//传递状态
	{//传递操作状态的方法
		saveCategoty:createSaveCategoryAsyncAction
	}
)(Detail)
