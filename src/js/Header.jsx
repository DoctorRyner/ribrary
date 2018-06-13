import React from 'react'

const Header = props => {
	const getBooks = () => {
		let books

		fetch('api/getBooks')
			.then(res => res.json())
			.then(data => books = data)
			.then(() => {
				books = books.filter(book => book.id != undefined)
				props.setBooks(books.map(book => book))
				props.switchBooksPanel()
			})
			.catch(err => console.log(err))
	}

	return(
		<header>
			<div id='left-container'><img id='logo-icon' src='img/logo-icon.png' alt=""/></div>
			<div id='right-container'>
				<img onClick={props.switchUserBar} id='home-icon' src='img/home-icon.png' alt=""/>
			</div>
		</header>
	)
}

export default Header

