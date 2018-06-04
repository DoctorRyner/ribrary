import React from 'react'

const UserBar = props => {
	const changeHandle = () => {
		console.log()
	}
	let inputField

	const modeLogin = (
		<div className='UserBar' style={props.userBar.style}>
			<div className='user-row'>
				<div className='login-title'><b><p>Вход</p></b></div>
				<div className='login-container'>
					<input onChange={changeHandle} ref={input => inputField = input} className='login' defaultValue='Логин' type="text"/>
					<input className='password' type="text"/>
				</div>
			</div>
			<div className='register-row'>
				<div className='register-title'><b><p>Регистрация</p></b></div>
				<div className='login-container'>
					<input className='login' defaultValue='Логин' type="text"/>
					<input className='password' type="text"/>
					<br />
					<input className='user-code' defaultValue='Код Доступа' type="text"/>
				</div>
			</div>
		</div>
	)

	const modeInfo = (
		<div className='UserBar' style={props.userBar.style}>
			<div className='user-name'>
				<label className='user-name-name'>Имя</label>
				<label className='user-name-last'>Фамилия</label>
			</div>
			<div className='user-name'>
				<label className='bookmarks'>Закладки</label>
			</div>
		</div>
	)

	return(
		props.userBar.mode == 'login' ? modeLogin : modeInfo
	)
}

export default UserBar