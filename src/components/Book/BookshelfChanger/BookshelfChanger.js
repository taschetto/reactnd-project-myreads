import React from 'react'
import PropTypes from 'prop-types'

import * as BooksAPI from '../../../utils/BooksAPI'
import './BookshelfChanger.css'

const BookshelfChanger = ({ book, onUpdateShelf }) => {

  const { shelf = 'none' } = book

  const handleChange = event => {
    const shelf = event.target.value
    book.shelf = shelf
    onUpdateShelf(book)
    BooksAPI.update(book, shelf)
  }

  return (
    <div className='book-shelf-changer'>
      <select value={shelf} onChange={handleChange}>
        <option value='none' disabled>Move to...</option>
        <option value='currentlyReading'>Currently Reading</option>
        <option value='wantToRead'>Want to Read</option>
        <option value='read'>Read</option>
        <option value='none'>None</option>
      </select>
    </div>
  )
}

BookshelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateShelf: PropTypes.func.isRequired
}

export default BookshelfChanger
