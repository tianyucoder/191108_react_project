import React, { Component } from 'react'
import {Button,Card,List} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons';
import './css/detail.less'

const {Item} = List

export default class Detail extends Component {
	render() {
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
						<span>xxxx</span>
					</Item>
					<Item className="product-item">
						<span className="item-title">商品描述：</span>
						<span>xxxx</span>
					</Item>
					<Item className="product-item">
						<span className="item-title">商品价格：</span>
						<span>xxxx</span>
					</Item>
					<Item className="product-item">
						<span className="item-title">商品分类：</span>
						<span>xxxx</span>
					</Item>
					<Item className="product-item">
						<span className="item-title">商品图片：</span>
						<span>xxxx</span>
					</Item>
					<Item className="product-item">
						<span className="item-title">商品详情：</span>
						<span>xxxx</span>
					</Item>
				</List>
			</Card>
		)
	}
}
