import React from 'react'

const UserBar = props => {
	const login = () => {
		const username = props.userBar.usernameInput
		const password = props.userBar.passwordInput
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
					alert('Неправильный логин или пароль')
					return
				}

				alert('Добро пожаловать, ' + username)
				props.setUsername(username)
				props.setUsercode(usercode)
				props.login(username, password)
				props.changeUsernameInput('Логин')
				props.changePasswordInput('')
			})
			.catch(err => console.log(err))
	}

	const register = () => {
		const username = 'test1'
		const password = '1'
		const usercode = 1111

		const data = {
			username,
			password,
			usercode
		}

		const request = new Request('api/newUser', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(data),
		})

		fetch(request)
			.then((err) => {
				if(err) console.log(err)
			})

		// fetch('api/newUser', mode)
		// 	.then((err) => {
		// 		if(err) console.log(err)
		// 		else console.log('Успех!')
		// 	})
	}
		
	const changeUsernameHandle = e => props.changeUsernameInput(e.target.value)
	const changePasswordHandle = e => props.changePasswordInput(e.target.value)

	const modeLogin = (
		<div className='UserBar' style={props.userBar.style}>
			<div className='user-row'>
				<div className='login-title' onClick={login}><b><p>Вход</p></b></div>
				<div className='login-container'>
					<input onChange={changeUsernameHandle} value={props.userBar.usernameInput} className='login' type="text"/>
					<input onChange={changePasswordHandle} value={props.userBar.passwordInput} className='password' type="text"/>
				</div>
			</div>
			<div className='register-row'>
				<div className='register-title' onClick={register}><b><p>Регистрация</p></b></div>
				<div className='login-container'>
					<input className='login' defaultValue='Логин' type="text"/>
					<input className='password' type="text"/>
					<br />
					<input className='user-code' defaultValue='Код Доступа' type="text"/>
				</div>
			</div>
		</div>
	)

	const userPower = props.userInfo.usercode == 14228 ? 'Админ' : 'Обычный'

	const modeInfo = (
		<div className='UserBar' style={props.userBar.style}>
			<div className='user-name'>
				<label className='user-name-name'>Имя: {props.userInfo.username}</label>
			</div>
			<div className='user-name'>
				<label className='bookmarks'>Открыть Закладки</label>
			</div>
			<div className='user-name'>
				<label className='bookmarks'>Статус: {userPower}</label>
			</div>
			<div className='user-name' onClick={props.exit}>
				<label className='bookmarks'>Выйти из профиля</label>
			</div>
		</div>
	)

	return(
		props.userBar.mode == 'login' ? modeLogin : modeInfo
	)
}

export default UserBar