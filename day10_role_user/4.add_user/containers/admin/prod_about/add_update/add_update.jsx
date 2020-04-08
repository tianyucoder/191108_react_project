import React, { Component } from 'react'
import {Button,Card,Form,Input, Select, message} from 'antd'
import {connect} from 'react-redux'
import {ArrowLeftOutlined} from '@ant-design/icons';
import {createSaveCategoryAsyncAction} from '../../../../redux/actions/category'
import {reqAddProduct,reqProductDetailById,reqUpdateProduct} from '../../../../ajax'
import PictureWall from './picture_wall'
import RichText from './rich_text'

const {Item} = Form
const {Option} = Select

class AddUpdate extends Component {

	state = {
		isUpdate:false
	}

	onFinish = async(values)=>{
		values.imgs = this.refs.pictureWall.getImgsNameArr() //找照片墙组件获取图片数组
		values.detail = this.refs.richText.getRichText() //找富文本组件获取商品详情
		let result
		if(this.state.isUpdate){
			values._id = this.id
			result = await reqUpdateProduct(values)
		}else{
			result = await reqAddProduct(values)
		}
		const {status,msg} = result
		if(status === 0){
			message.success(this.state.isUpdate ? '商品修改成功！' : '商品添加成功！')
			this.props.history.push('/admin/prod_about/product')
		}else{
			message.error(msg)
		}
	}

	getProductInfoById = async(id)=>{
		let result = await reqProductDetailById(id)
		const {status,data,msg} = result 
		console.log(data);
		if(status === 0){
			this.refs.form.setFieldsValue(data) //回显表单基本数据
			this.refs.pictureWall.setFileList(data.imgs)//回显照片墙组件的图片
			this.refs.richText.setRichText(data.detail)//回显富文本的数据
		}else{
			message.error(msg)
		}
	}

	componentDidMount(){
		const {categoryList,saveCategory} = this.props
		if(!categoryList.length)saveCategory()
		//尝试获取传递过来的id，若有id是修改商品，否则是新增商品
		const {id} = this.props.match.params
		if(id){
			this.id = id
			this.setState({isUpdate:true})
			this.getProductInfoById(id)
		}
	}

	render() {
		return (
			<Card 
				title={
					<div>
						<Button onClick={this.props.history.goBack} type="link">
							<ArrowLeftOutlined/>返回
						</Button>
						<span>{this.state.isUpdate ? '修改商品' :'添加商品'}</span>
					</div>
				} 
			>
				<Form onFinish={this.onFinish} ref="form">
					<Item
						name="name"
						label="商品名称"
						wrapperCol={{span:10}}
						rules={[{required:true,message:"商品名称必填"}]}
					>
						<Input placeholder="输入商品名" type="text"/>
					</Item>
					<Item
						name="desc"
						label="商品描述"
						wrapperCol={{span:10}}
						rules={[{required:true,message:"商品描述必填"}]}
					>
						<Input placeholder="输入描述内容" type="text"/>
					</Item>
					<Item
						name="price"
						label="商品价格"
						wrapperCol={{span:10}}
						rules={[{required:true,message:"商品价格必填"}]}
					>
						<Input type="number" prefix="￥" addonAfter="元" placeholder="输入价格"/>
					</Item>
					<Item
						name="categoryId"
						label="商品分类"
						wrapperCol={{span:10}}
						rules={[{required:true,message:"必须选择一个分类"}]}
					>
						<Select defaultValue="">
							<Option value="">请选择分类</Option>
							{
								this.props.categoryList.map((categoryObj,index)=>{
									return <Option key={index} value={categoryObj._id}>{categoryObj.name}</Option>
								})
							}
						</Select>
					</Item>
					<Item
						label="商品图片"
						wrapperCol={{span:16}}
						style={{marginLeft:'10px'}}
					>
						<PictureWall ref="pictureWall"/>
					</Item>
					<Item
						label="商品详情"
						wrapperCol={{span:16}}
						style={{marginLeft:'10px'}}
					>
						<RichText ref="richText"/>
					</Item>
					<Item>
						<Button type="primary" htmlType="submit">提交</Button>
					</Item>
				</Form>

			</Card>
		)
	}
}

export default connect(
	(state)=>({categoryList:state.categoryList}),//传递状态，
	{
		saveCategory:createSaveCategoryAsyncAction
	}//传递操作状态的方法
)(AddUpdate)
