import React from 'react'

const Header = props => {
	return(
		<header>
			<div id='left-container'><img id='search-icon' src='img/search-icon.png' alt=""/></div>
			<div id='right-container'>
				<img id='list-icon' src='img/list-icon.png' alt=""/>
				<img onClick={() => props.switchUserBar(props.isUserBarActive)} id='home-icon' src='img/home-icon.png' alt=""/>
			</div>
		</header>
	)
}

export default Header