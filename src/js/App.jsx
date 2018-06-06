import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import reducer from './reducers/index.jsx'

import Header from './Header.jsx'
import UserBar from './UserBar.jsx';

const store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))
console.log(store.getState())

class ReduxApp extends React.Component {
	login = () => {
		this.props.login('admin', 'admin')
		fetch('api/thelist')
			.then(res => res.json())
			.then(data => console.log(data))
			.catch(error => console.log('error'))
	}

	render() {
		const renderBar =
			<UserBar
				userBar={this.props.userBar}
				userInfo={this.props.userInfo}
				setUsername={this.props.setUsername}
				setUsercode={this.props.setUsercode}
				login={this.props.login}
				exit={this.props.exit}
				changeUsernameInput={this.props.changeUsernameInput}
				changePasswordInput={this.props.changePasswordInput}
			/>

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
		userInfo: state.userInfo,
	}),
	dispatch => ({
		// addCounter: () => { dispatch({ type: 'ADD_COUNTER' }) }, 
		// inc: id => { dispatch({ type: 'INC', payload: id }) },
		switchUserBar: status => dispatch({ type: 'SWITCH_USER_BAR', payload: status }),
		login: (username, password) => dispatch({ type: 'LOGIN', payload: { username, password } }),
		exit: () => dispatch({ type: 'EXIT' }),
		changeUsernameInput: username => dispatch({ type: 'CHANGE_USERNAME_INPUT', payload: username }),
		changePasswordInput: password => dispatch({ type: 'CHANGE_PASSWORD_INPUT', payload: password }),
		setUsername: username => dispatch({ type: 'SET_USERNAME', payload: username }),
		setUsercode: usercode => dispatch({ type: 'SET_USERCODE', payload: usercode }),
	})
) (ReduxApp)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
)