import React from 'react'

import Book from './Book.jsx'

const BooksPanel = props => {
	let width = props.width > 1920 ? 1420 : props.width - 500

	if(width <= 600) width = 600

	const style = {
		width: width + 'px'
	}

	return(
		<div style={style} className='BooksPanel'></div>
	)
}

export default BooksPanel