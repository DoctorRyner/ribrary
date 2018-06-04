import { combineReducers } from 'redux'
import uuidv1 from 'uuid'

const usersDataInit = {
	"users": [
		{ "id": 1, "username": "testUser", "password": "123" },
		{ "id": 2, "username": "testAdmin", "password": "111" }
	]
}

const usersData = (state = usersDataInit, action) => {
	switch (action.type) {
		default: return state
	}
}

const userBarInit = {
	style: {
		
	},
	mode: 'login', // modes: login, info
}

const userBar = (state = userBarInit, action) => {
	switch (action.type) {
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

export default combineReducers({ prefs, userBar, usersData })