import React, {Component,Fragment} from 'react'
import {Card,Button,Table,Modal,Form,Input} from 'antd';
import {connect} from 'react-redux'
import {createSaveCategoryAsyncAction} from '../../../../redux/actions/category'
import {PlusCircleOutlined} from '@ant-design/icons';

const {Item} = Form

class Category extends Component {

	state = { 
		visible: false//控制弹窗是否展示
	};

	//调用showModal展示弹窗
	showModal = () => {
		//弹窗展示
    this.setState({visible: true});
	};
	
	//确认按钮的回调
	handleOk = () => {
		//弹窗隐藏
    this.setState({visible: false});
	};
	
	//取消按钮的回调
	handleCancel = () => {
		//弹窗隐藏
    this.setState({visible: false});
  };

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
			<Fragment>
				<Card 
					extra={
						<Button onClick={this.showModal} type="primary">
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
				<Modal
					title="添加分类" //弹窗的标题
					visible={this.state.visible} //控制弹窗是否展示
					onOk={this.handleOk} //确认的回调
					onCancel={this.handleCancel}//确认的回调
					okText="确认"
					cancelText="取消"
				>
					<Form>
						<Item
							name='name'
							rules={[
								{required:true,message:'分类名必填'}
							]}
						>
							<Input placeholder="请输入分类名"/>
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
		saveCategory:createSaveCategoryAsyncAction
	} //传递操作状态的方法
)(Category)
