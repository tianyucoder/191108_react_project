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
	}

	getCategoryName = (categoryId)=>{
		let result = this.props.categoryList.find((categoryObj)=>{
			return categoryObj._id === categoryId
		})
		if(result) return result.name
	}

	getProductDetail = async()=>{
		//获取通过路由传递过来的商品_id
		const {id} = this.props.match.params
		let result = await reqProductDetailById(id)
		const {status,data,msg} = result
		if(status === 0){
			const {imgs,categoryId,name,desc,price,detail} = data
			this.setState({imgs,categoryId,name,desc,price,detail})
		}else{
			message.error(msg)
		}
	}

	componentDidMount(){
		const {categoryList,saveCategoty} = this.props//尝试着从redux中读取商品分类数据
		if(!categoryList.length){
			console.log('@@');
			saveCategoty()
		}
		this.getProductDetail() //根据id查询商品详细信息
	}

	render() {
		const {imgs,categoryId,name,desc,price,detail} = this.state
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
				<List>
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
						<span>?????</span>
					</Item>
					<Item className="product-item">
						<span className="item-title">商品详情：</span>
						<span>{detail}</span>
					</Item>
				</List>
			</Card>
		)
	}
}

export default connect(
	(state)=>({categoryList:state.categoryList}),//传递状态
	{
		saveCategoty:createSaveCategoryAsyncAction
	}//传递操作状态的方法
)(Detail)
