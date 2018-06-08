import React from 'react'

const Book = props => {
	// props.bookname
	// props.category
	// props.id

	const getBooks = () => {
		let books

		fetch('api/getBooks')
			.then(res => res.json())
			.then(data => books = data)
			.then(() => {
				books = books.filter(book => book.id != undefined)
				props.setBooks(books.map(book => book))
			})
			.catch(err => console.log(err))
	}

	const remove = () => {
		const formData = { id: props.id }

		fetch('api/removeBook', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(formData),
		})
			.then(res => res.json())
			.catch(err => {
				console.error('Error:', err)
			})
			.then(res => {
				alert('Книга удалена!')
				console.log('Success:', res)
				getBooks()
			})
	}

	return(
		<div className='book'>
			<label className='bookname'>Название: {props.bookname.split('_').join(' ')}</label>
			<label className='category'>Категория: {props.category}</label>
			<a className='link' href={'api/books/' + props.bookname}>Открыть</a>
			{props.userInfo.usercode == 14228 && <label onClick={remove} className='link'>Удалить</label>}
		</div>
	)	
}

export default Book