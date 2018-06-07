import React from 'react'

const Book = props => {
	// props.bookname
	// props.category
	// props.id

	return(
		<div className='book'>
			<label>{props.bookname}</label>
			<label>{props.category}</label>
			<a href={'api/books/' + props.bookname}>Открыть</a>
		</div>
	)	
}

export default Book