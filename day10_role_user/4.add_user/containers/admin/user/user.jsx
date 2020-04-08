import React, { Component,Fragment} from 'react'
import { Card,Button,Table, message,Modal,Form,Input,Select} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import dayjs from 'dayjs'
import {reqUserList,reqAddUser} from '../../../ajax'

const {Item} = Form
const {Option} = Select
export default class User extends Component {

	state = {
		users:[],//用户列表
		roles:[],//角色列表
		visible:false //标识新增用户弹窗是否展示
	}

	getUserList = async()=>{
		let result = await reqUserList()
		const {status,data,msg} = result
		if(status === 0){
			const {users,roles} = data
			this.setState({users,roles})
		}else{
			message.error(msg)
		}
	}

	getRoleName = (id)=>{
		let result = this.state.roles.find((roleObj)=>{
			return roleObj._id === id
		})
		if(result) return result.name
	}

	showModal = () => {
    this.setState({visible: true});
  };

  handleOk = async() => {
		const userObj = this.refs.userForm.getFieldsValue()
		let result = await reqAddUser(userObj)
		const {status,data,msg} = result
		if(status === 0){
			message.success('添加用户成功！')
			this.getUserList()
			this.setState({visible: false});
			this.refs.userForm.resetFields()
		}else{
			message.error(msg)
		}
  };

  handleCancel = () => {
		this.setState({visible: false});
		this.refs.userForm.resetFields()
  };

	componentDidMount(){
		this.getUserList()
	}

	render() {

		//表格的数据源
		const dataSource = [...this.state.users]
		//表格列的配置
		const columns = [
			{
				title: '用户名',
				dataIndex: 'username',
				key: 'username',
			},
			{
				title: '邮箱',
				dataIndex: 'email',
				key: 'email',
			},
			{
				title: '电话',
				dataIndex: 'phone',
				key: 'phone',
			},
			{
				title: '注册时间',
				dataIndex: 'create_time',
				key: 'create_time',
				render:(create_time)=>dayjs(create_time).format('YYYY年 MM月DD日 HH:mm:ss')
			},
			{
				title: '所属角色',
				dataIndex: 'role_id',
				key: 'role_id',
				render:(role_id)=> this.getRoleName(role_id),
				align:'center',
				width:'15%'
			},
			{
				title: '操作',
				//dataIndex: 'opera',
				key: 'opera',
				align:'center',
				render:()=>(
					<div>
						<Button type="link">修改</Button>
						<Button type="link">删除</Button>
					</div>
				)
			},
		];

		return (
			<Fragment>
				{/*Card整体布局*/}
				<Card 
					title={
						<Button 
							onClick={this.showModal} 
							type="primary"
						>
							<PlusCircleOutlined />创建用户
						</Button>
					}
				>
					<Table 
						dataSource={dataSource.reverse()} 
						columns={columns} 
						bordered
						rowKey="_id"
					/>
				</Card>
				{/*新增用户弹窗*/}
				<Modal
					title="新增用户"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					okText="确认"
					cancelText="取消"
				>
					<Form ref="userForm">
						<Item
							name="username"
							label="用户名"
							labelCol={{span:3}}
							rules={[{required:true,message:"用户名必须输入"}]}
						>
							<Input placeholder="输入用户名"/>
						</Item>
						<Item
							name="password"
							label="密码"
							labelCol={{span:3}}
							rules={[{required:true,message:"密码必须输入"}]}
						>
							<Input type="password" placeholder="输入密码"/>
						</Item>
						<Item
							name="phone"
							label="手机号"
							labelCol={{span:3}}
							rules={[{required:true,message:"手机号必须输入"}]}
						>
							<Input placeholder="输入手机号"/>
						</Item>
						<Item
							name="email"
							label="邮箱"
							labelCol={{span:3}}
							rules={[{required:true,message:"邮箱必须输入"}]}
						>
							<Input placeholder="输入邮箱"/>
						</Item>
						<Item
							name="role_id"
							label="角色"
							labelCol={{span:3}}
							rules={[{required:true,message:"必须选择一个角色"}]}
						>
							<Select defaultValue="">
								<Option value="">请选择角色</Option>
								{
									this.state.roles.map((roleObj)=>{
										return <Option key={roleObj._id} value={roleObj._id}>{roleObj.name}</Option>
									})
								}
							</Select>
						</Item>
					</Form>
				</Modal>
			</Fragment>
		)
	}
}
