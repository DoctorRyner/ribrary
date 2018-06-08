import React from 'react'
import uuidv1 from 'uuid'

import Book from './Book.jsx'

const BooksPanel = props => {
	let searchName
	let searchCategory

	const search = () => {
		props.setNameFilter(searchName.value)
		props.setCategoryFilter(searchCategory.value)
	}

	let width = props.width > 1920 ? 1420 : props.width - 500

	if(width <= 600) width = 600

	const style = {
		width: width + 'px'
	}
	const nameFilterLower = props.nameFilter.toLowerCase()
	const categoryFilterLower = props.categoryFilter.toLowerCase()
	let renderBooks = props.books.filter(book => book.bookname.toLowerCase().includes(nameFilterLower))

	renderBooks = renderBooks.filter(book => book.category.toLowerCase().includes(categoryFilterLower))
	
	renderBooks = renderBooks.map(book =>
		<Book
			bookname={book.bookname}
			category={book.category}
			id={book.id}
			key={uuidv1()}
			userInfo={props.userInfo}
			setBooks={props.setBooks}
		/>)


	return(
		<div style={style} className='BooksPanel'>
			<div className='searchBooks'>
				<input ref={searchNameField =>  searchName = searchNameField} defaultValue='По имени книги' type="text"/>
				<input ref={searchCategoryField =>  searchCategory = searchCategoryField} defaultValue='По категориям' type="text"/>
				<button onClick={search}>Поиск!</button>
			</div>
			{renderBooks}
		</div>
	)
}

export default BooksPanel