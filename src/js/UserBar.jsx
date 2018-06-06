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

				localStorage.setItem('isLoged', 'true')
				localStorage.setItem('login', username)
				localStorage.setItem('password', password)
				localStorage.setItem('usercode', usercode)
				// alert('Добро пожаловать, ' + username)
				props.setUsername(username)
				props.setUsercode(usercode)
				props.login(username, password)
				props.changeUsernameInput('Логин')
				props.changePasswordInput('')
			})
			.catch(err => console.log(err))
	}

	const register = () => {
		const username = props.userBar.regUsernameInput
		const password = props.userBar.regPasswordInput
		const usercode = props.userBar.usercodeInput

		let gottenData

		if(username.length < 4 || password.length < 4) {
			alert('Имя пользователя или пароль содержит менее 4-ех символов')
			return
		}

		let isValid = false

		if(usercode == 14228 || usercode == 1111) isValid = true;

		if(!isValid) {
			alert('Неизвестный код доступа!')
			return
		} 

		fetch('api/users')
			.then(res => res.json())
			.then(data => gottenData = data)
			.then(() => {
				for(let data of gottenData) {
					if(data.username != username) continue
					isValid = false;
					break;
				}
			})
			.then(() => {
				if(!isValid) {
					alert('Пользователь с таким логином уже есть в системе!')
					return
				}

				props.changeRegUsernameInput('Логин')
				props.changeRegPasswordInput('')
				props.changeUsercodeInput('Код доступа')

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
						if(err) {
							alert('Ошибка при регистрации!')
							console.log(err)
						} else alert('Регистрация прошла успешно!')
					})
				alert('Регистрация прошла успешно!')
			})
			.catch(err => console.log(err))
	}
		
	const changeUsernameHandle = e => props.changeUsernameInput(e.target.value)
	const changePasswordHandle = e => props.changePasswordInput(e.target.value)

	const changeRegUsernameHandle = e => props.changeRegUsernameInput(e.target.value)
	const changeRegPasswordHandle = e => props.changeRegPasswordInput(e.target.value)
	const changeUsercodeHandle = e => props.changeUsercodeInput(e.target.value)

	let input
	let submit
	const upload = () => {
		let data = new FormData()
		// data.append('files', input.file)
		console.log(input)
		return
		
		fetch('api/upload', {
			method: 'POST',
			body: data
		}).catch(err => console.log('catch error'))
	}

	// const fileInput = props.userInfo.usercode == 14228 &&
	// 	<div ref={inputFile => input = inputFile}  onClick={upload} className='user-name'>
	// 		<input type='file' name='bookFile' />
	// 	</div>

	const fileInput = props.userInfo.usercode == 14228 &&
		<div className='user-name'>
			<form method='post' encType='multipart/form-data' action='/api/upload'>
				<input type='file' name='filename'/>
				<input type='submit' value='upload'/>
			</form>
		</div>


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
					<input className='login' onChange={changeRegUsernameHandle} value={props.userBar.regUsernameInput} type="text"/>
					<input className='password' onChange={changeRegPasswordHandle} value={props.userBar.regPasswordInput} type="text"/>
					<br />
					<input className='user-code' onChange={changeUsercodeHandle} value={props.userBar.usercodeInput} type="text"/>
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
			{/* <div className='user-name'>
				<label className='bookmarks'>Открыть закладки</label>
			</div> */}
			<div className='user-name'>
				<label className='bookmarks'>Статус: {userPower}</label>
			</div>
			<div className='user-name' onClick={() => {
				localStorage.setItem('isLoged', false)
				localStorage.setItem('login', undefined)
				localStorage.setItem('password', undefined)
				localStorage.setItem('usercode', undefined)
				props.exit()
			}}>
				<label className='bookmarks'>Выйти из профиля</label>
			</div>
			{fileInput}
		</div>
	)

	return(
		props.userBar.mode == 'login' ? modeLogin : modeInfo
	)
}

export default UserBar