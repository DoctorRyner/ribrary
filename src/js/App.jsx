import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import reducer from './reducers/index.jsx'
import { Document } from 'react-pdf'

import Header from './Header.jsx'
import UserBar from './UserBar.jsx';

const store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))
console.log(store.getState())

class ReduxApp extends React.Component {
	componentDidMount() {
		fetch('/api/users')
			.then(res => res.json())
			.then(data => console.log(data))
			.catch(error => console.log('error'))
	}

	render() {
		const renderBar = this.props.userBar.mode == 'login'
			? <UserBar userBar={this.props.userBar} />
			: <UserBar userBar={this.props.userBar} />

		return(
			<div>
				<Header isUserBarActive={this.props.isUserBarActive} switchUserBar={this.props.switchUserBar} />
				<div id='content'>
					{this.props.isUserBarActive && renderBar}
				</div>
			</div>
		)
	}
}

const App = connect(
	state => ({
		isUserBarActive: state.prefs.isUserBarActive,
		userBar: state.userBar,
		usersData: state.usersData,
	}),
	dispatch => ({
		// addCounter: () => { dispatch({ type: 'ADD_COUNTER' }) }, 
		// inc: id => { dispatch({ type: 'INC', payload: id }) },
		switchUserBar: status => dispatch({ type: 'SWITCH_USER_BAR', payload: status }),
	})
) (ReduxApp)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
)