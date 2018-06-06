import { combineReducers } from 'redux'
import uuidv1 from 'uuid'

const userInfoInit = {
	firstname: 'Имя',
	lastname: 'Фамилия',
	username: 'Имя пользователя',
	usercode: 1111,
}

const userInfo = (state = userInfoInit, action) => {
	switch (action.type) {
		case 'SET_USERNAME': return { ...state, username: action.payload }
		case 'SET_USERCODE': return { ...state, usercode: action.payload }
		default: return state
	}
}

const userBarInit = {
	style: {
		
	},
	usernameInput: 'Логин',
	passwordInput: '',
	mode: 'login', // modes: login, info
}

const userBar = (state = userBarInit, action) => {
	switch (action.type) {
		case 'CHANGE_USERNAME_INPUT': return { ...state, usernameInput: action.payload }
		case 'CHANGE_PASSWORD_INPUT': return { ...state, passwordInput: action.payload }
		case 'LOGIN': return { ...state, mode: 'info' }
		case 'EXIT': return { ...state, mode: 'login' }
		default: return state
	}
}

const prefsInit = { isUserBarActive: false, isSearchBarActive: false }

const prefs = (state = prefsInit, action) => {
	switch (action.type) {
		case 'SWITCH_USER_BAR': return { ...state, isUserBarActive: !action.payload }
		default: return state
	}
}

export default combineReducers({ prefs, userBar, userInfo })