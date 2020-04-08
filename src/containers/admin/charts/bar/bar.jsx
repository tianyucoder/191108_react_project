import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';

export default class Bar extends Component {

	//专门用于提供一个配置对象
	getOption = ()=>{
		return {
			title: { //图表的标题
				text: '服装销售报表', //标题的文字
				textStyle:{ //标题的样式
					color:'orange' 
				}
			},
			tooltip: { //提示框配置
				showDelay:1000
			},
			toolbox:{
				feature:{
					saveAsImage:{},
					restore:{},
					dataView:{}
				}
			},
			legend: { //图例
				data:['销量','库存']
			},
			//x轴的配置
			xAxis: {
					data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
			},
			//y轴的配置
			yAxis: {},
			//图表类型 + 数据
			series: [
				{
					name: '销量',
					type: 'bar',
					data: [5, 20, 36, 10, 10, 20]
				},
				{
					name: '库存',
					type: 'bar',
					data: [1, 2, 3, 4, 5, 6]
		}
			]
	};
	}

	render() {
		return (
			<ReactEcharts option={this.getOption()} />
		)
	}
}
