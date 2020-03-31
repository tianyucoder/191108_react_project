import React, {Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Login from './containers/login/login'
import Admin from './containers/admin/admin'

export default class App extends Component {
	render() {
		return (
			<Switch>
				<Route path="/login" component={Login}/>
				<Route path="/admin" component={Admin}/>
				<Redirect to='/login'/>
			</Switch>
		)
	}
}
