import React, { Component } from 'react'
import {Button,Card,Form,Input, Select} from 'antd'
import {connect} from 'react-redux'
import {ArrowLeftOutlined} from '@ant-design/icons';
import {createSaveCategoryAsyncAction} from '../../../../redux/actions/category'
import PictureWall from './picture_wall'

const {Item} = Form
const {Option} = Select

class AddUpdate extends Component {

	onFinish = (values)=>{
		console.log(values);
	}

	componentDidMount(){
		const {categoryList,saveCategory} = this.props
		if(!categoryList.length){
			saveCategory()
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
						<span>添加商品</span>
					</div>
				} 
			>
				<Form onFinish={this.onFinish}>
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
						<PictureWall/>
					</Item>
					<Item
						label="商品详情"
						wrapperCol={{span:10}}
						style={{marginLeft:'10px'}}
					>
						此处放置富文本编辑器组件
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
