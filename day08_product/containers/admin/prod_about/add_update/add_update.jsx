import React, { Component } from 'react'
import {Button} from 'antd'

export default class AddUpdate extends Component {
	render() {
		return (
			<div>
				我是AddUpdate组件，我可能用于：新增商品、修改商品
				<Button onClick={this.props.history.goBack}>返回</Button>
			</div>
		)
	}
}
