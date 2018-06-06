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
	login = (username, password) => {
		let gottenData
		let isValid = false
		let usercode
		// props.login('admin', 'admin')
		fetch('api/users')
			.then(res => res.json())
			.then(data => gottenData = data)
			.then(() => {
				for(let data of gottenData) {
					if(data.username != username || data.password != password) continue
					usercode = data.usercode
					isValid = true;
					break;
				}
			})
			.then(() => {
				if(!isValid) {
					// alert('Неправильный логин или пароль')
					return
				}

				// alert('Добро пожаловать, ' + username)
				this.props.setUsername(username)
				this.props.setUsercode(usercode)
				this.props.login(username, password)
				this.props.changeUsernameInput('Логин')
				this.props.changePasswordInput('')
			})
			.catch(err => console.log(err))
	}

	componentDidMount() {
		// localStorage.setItem('isLoged', false)
		const isLoged = localStorage.getItem('isLoged')
		if(isLoged == 'false') {
			// alert(isLoged + ' = false, поэтому не заходим')
			return
		} else if(isLoged == 'true'){
			const username = localStorage.getItem('login')
			const password = localStorage.getItem('password')
			const usercode = localStorage.getItem('usercode')
			// alert(isLoged + ' = true, поэтому входим, имя: ' + username + ', а пароль: ' + password)
			this.props.setUsername(username)
			this.login(username, password)
		}
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
				changeRegUsernameInput={this.props.changeRegUsernameInput}
				changeRegPasswordInput={this.props.changeRegPasswordInput}
				changeUsercodeInput={this.props.changeUsercodeInput}
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
		changeRegUsernameInput: username => dispatch({ type: 'CHANGE_REG_USERNAME_INPUT', payload: username }),
		changeRegPasswordInput: password => dispatch({ type: 'CHANGE_REG_PASSWORD_INPUT', payload: password }),
		changeUsercodeInput: usercode => dispatch({ type: 'CHANGE_USERCODE_INPUT', payload: usercode }),
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



