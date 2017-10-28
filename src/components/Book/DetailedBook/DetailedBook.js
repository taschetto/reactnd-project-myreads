import React from 'react'
import PropTypes from 'prop-types'

import BookshelfChanger from '../BookshelfChanger/BookshelfChanger'
import '../Book.css'

const DetailedBook = ({ book, onUpdateShelf, fromSearch }) => {
  return (
    <div className='columnsContainer'>
      <div className='leftColumn'>
        <h1>{book.title}{book.subtitle? `: ${book.subtitle}` : ''}</h1>
        <h2>{book.authors? `By ${book.authors.join(', ')}` : ''}</h2>
        <p style={{textAlign: 'justify'}}>{book.description}</p>
      </div>
      <div className='rightColumn'>
        <div className='book'>
          <div className='book-top'>
            <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url('${book.imageLinks.smallThumbnail}')` }}></div>
            <BookshelfChanger
              book={book}
              onUpdateShelf={onUpdateShelf} />
          </div>
        </div>
        <dl>
          <dt>Publisher</dt>
          <dd>{book.publisher}</dd>
          <dt>Pages</dt>
          <dd>{book.pageCount}</dd>
        </dl>
      </div>
    </div>
  )
}

DetailedBook.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
  fromSearch: PropTypes.bool
}

export default DetailedBook
