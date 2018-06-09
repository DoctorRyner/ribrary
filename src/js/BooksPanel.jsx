import React from 'react'
import uuidv1 from 'uuid'

import Book from './Book.jsx'

const BooksPanel = props => {
	let searchName
	let searchCategory

	const search = () => {
		searchName.value == 'По имени книги' ?
			props.setNameFilter('') :
			props.setNameFilter(searchName.value)

		searchCategory.value == 'По категориям' ?
			props.setCategoryFilter('') :
			props.setCategoryFilter(searchCategory.value)
	}

	let width = props.width > 1920 ? 1420 : props.width - 500

	if(width <= 600) width = 600

	const style = {
		width: width + 'px'
	}
	const nameFilterLower = props.nameFilter.toLowerCase().split(' ').join('_')
	const categoryFilterLower = props.categoryFilter.toLowerCase().split(' ').join('_')
	let renderBooks = props.books.filter(book => book.bookname.toLowerCase().includes(nameFilterLower))

	renderBooks = renderBooks.filter(book => book.category.toLowerCase().includes(categoryFilterLower))

	renderBooks = props.isNewFirst ? renderBooks.reverse() : renderBooks
	
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
				<button type='submit' onClick={search}>Нажмите для поиска!</button>
				<br />
				<label className='sort-title'>Сначала новые</label>
				<input onChange={props.switchSort} defaultChecked={props.isNewFirst} type="checkbox"/>
			</div>
			{renderBooks}
		</div>
	)
}

export default BooksPanel