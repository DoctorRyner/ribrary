import { combineReducers } from 'redux'
import uuidv1 from 'uuid'

const booksListInit = []

const booksList = (state = booksListInit, action) => {
	switch (action.type) {
		case 'SET_BOOKS': return action.payload
		default: return state
	}
}

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
	regUsernameInput: 'Логин',
	regPasswordInput: '',
	usercodeInput: 'Код доступа',
	mode: 'login', // modes: login, info
}

const userBar = (state = userBarInit, action) => {
	switch (action.type) {
		case 'CHANGE_USERNAME_INPUT': return { ...state, usernameInput: action.payload }
		case 'CHANGE_PASSWORD_INPUT': return { ...state, passwordInput: action.payload }
		case 'CHANGE_REG_USERNAME_INPUT': return { ...state, regUsernameInput: action.payload }
		case 'CHANGE_REG_PASSWORD_INPUT': return { ...state, regPasswordInput: action.payload }
		case 'CHANGE_USERCODE_INPUT': return { ...state, usercodeInput: action.payload }
		case 'LOGIN': return { ...state, mode: 'info' }
		case 'EXIT': return { ...state, mode: 'login' }
		default: return state
	}
}

const prefsInit = { isUserBarActive: false, isBooksPanelActive: false }

const prefs = (state = prefsInit, action) => {
	switch (action.type) {
		case 'SWITCH_USER_BAR': return { ...state, isUserBarActive: !state.isUserBarActive }
		case 'SWITCH_BOOKS_PANEL': return { ...state, isBooksPanelActive: !state.isBooksPanelActive }
		default: return state
	}
}

export default combineReducers({ prefs, userBar, userInfo, booksList })