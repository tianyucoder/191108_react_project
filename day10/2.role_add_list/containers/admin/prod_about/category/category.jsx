import React, {Component,Fragment} from 'react'
import {Card,Button,Table,Modal,Form,Input,message} from 'antd';
import {connect} from 'react-redux'
import {PlusCircleOutlined} from '@ant-design/icons';
import {reqAddCategory,reqUpdateCategory} from '../../../../ajax'
import {PAGE_SIZE} from '../../../../config'
import {createSaveCategoryAsyncAction,createSaveCategoryAction} from '../../../../redux/actions/category'


const {Item} = Form

class Category extends Component {

	state = { 
		visible: false//控制弹窗是否展示
	};

	//调用showModal展示弹窗
	showModal = (currentCategory) => {
		//如果新增弹窗，currentCategory就是默认的event
		//如果修改弹窗，currentCategory就是当前要编辑的那个分类对象
		const {_id,name} = currentCategory
		if(_id && name){
			this._id = _id
			this.name = name
			this.isUpdate = true
		}else{
			this._id = ''
			this.name = ''
			this.isUpdate = false
		}
		//重置表单
		if(this.refs.categoryForm){
			this.refs.categoryForm.resetFields()
		}
		//弹窗展示
    this.setState({visible: true});
	};

	//确认按钮的回调
	handleOk = async() => {
		//获取表单值
		const {categoryName} = this.refs.categoryForm.getFieldsValue()
		if(!categoryName){
			message.error('分类名不能为空')
		}else{
			let result
			if(this.isUpdate){
				result = await reqUpdateCategory(this._id,categoryName)
			}else{
				result = await reqAddCategory(categoryName)
			}
			const {status,msg} = result
			if(status === 0){
				message.success(this.isUpdate ? '修改分类成功！' : '添加分类成功！')
				this.props.saveCategory()
				//通知redux在他所保存的那个分类列表中加入一个data
				//this.props.saveNewCategory([...this.props.categoryList,data])
				//重置表单
				this.refs.categoryForm.resetFields()
				//弹窗隐藏
				this.setState({visible: false});
			}else{
				message.error(msg)
			}
		}
	};
	
	//取消按钮的回调
	handleCancel = () => {
		//弹窗隐藏
		this.setState({visible: false});
		//重置表单
		this.refs.categoryForm.resetFields()
  };

	componentDidMount(){
		//通知redux保存分类数据(要调用那个异步的action，他拥有发送请求的功能)
		this.props.saveCategory()
	}

	render() {
		//数据源
		const dataSource = [...this.props.categoryList]

		//columns是表格中列的配置，是Table组件最核心的配置,每一列所有的特性都在此配置。
		const columns = [
			{
				title: '分类名', //列名
				dataIndex: 'name', //查找数据源中哪个数据项展示到该列
				key: 'name',
			},
			{
				title: '操作',
				//dataIndex: '_id',
				key: 'name',
				width:'15%',
				align:'center',
				render:(categoryObj)=><Button onClick={()=>{this.showModal(categoryObj)}} type="link">修改分类</Button>
			},
		];

		return (
			<Fragment>
				<Card 
					extra={
						<Button onClick={this.showModal} type="primary">
							<PlusCircleOutlined />添加分类
						</Button>
					} 
				>
					<Table 
						dataSource={dataSource.reverse()}  //数据源
						columns={columns} //列的配置
						bordered //边框
						pagination={{ //分页器
							pageSize:PAGE_SIZE, //每页展示多少条数据
							showQuickJumper:true
						}}
						rowKey="_id"//告诉Table以每个数据的_id属性作为唯一标识
					/>
				</Card>
				<Modal
					title={this.isUpdate ? '修改分类' : '新增分类'} //弹窗的标题
					visible={this.state.visible} //控制弹窗是否展示
					onOk={this.handleOk} //确认的回调
					onCancel={this.handleCancel}//确认的回调
					okText="确认"
					cancelText="取消"
				>
					<Form ref="categoryForm">
						<Item
							name='categoryName'
							rules={[{required:true,message:'分类名必填'}]}
						>
							{/* 
								Input组件如果被Form表单包裹了，那么Input组件的defaultValue，只有在两个情况有用：
									1.Form表单初始化的时候。
									2.Form表单重置的时候。
							*/}
							<Input defaultValue={this.name} placeholder="请输入分类名"/>
						</Item>
					</Form>
				</Modal>
			</Fragment>
		)
	}
}

export default connect(
	(state)=>({categoryList:state.categoryList}),//传递状态
	{
		saveCategory:createSaveCategoryAsyncAction,
		saveNewCategory:createSaveCategoryAction
	} //传递操作状态的方法
)(Category)
