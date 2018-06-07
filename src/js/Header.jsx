import React from 'react'

const Header = props => {
	return(
		<header>
			<div id='left-container'><img id='logo-icon' src='img/logo-icon.png' alt=""/></div>
			<div id='right-container'>
				<img onClick={props.switchBooksPanel} id='list-icon' src='img/list-icon.png' alt=""/>
				<img onClick={props.switchUserBar} id='home-icon' src='img/home-icon.png' alt=""/>
			</div>
		</header>
	)
}

export default Header