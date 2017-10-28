import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import BookshelfChanger from '../BookshelfChanger/BookshelfChanger'
import '../Book.css'

const BasicBook = ({ book, onUpdateShelf, fromSearch }) => {

  const { id, title, authors, imageLinks } = book

  return (
    <div className='book'>
      <div className='book-top'>
        <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url('${imageLinks.smallThumbnail}')` }}></div>
        <div className='book-details-link'>
          <Link to={{
            pathname: `/details/${id}`,
            state: { fromSearch }
          }}>Book Details</Link>
        </div>
        <BookshelfChanger
          book={book}
          onUpdateShelf={onUpdateShelf} />
      </div>
      <div className='book-title'>{title}</div>
      <div className='book-authors'>{authors && authors.join(', ')}</div>
    </div>
  )
}

BasicBook.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
  fromSearch: PropTypes.bool
}

export default BasicBook
