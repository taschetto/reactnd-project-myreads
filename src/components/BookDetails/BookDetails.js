import React from 'react'
import PropTypes from 'prop-types'
import { If, Then, Else } from 'react-if'
import { Link } from 'react-router-dom'
import { Loader } from 'react-loaders'

import Book from '../Book/Book'
import './BookDetails.css'

const BookDetails = ({ book, isFetching, onUpdateShelf }) => {
  return (
    <div className='search-books'>
      <div className='search-books-bar'>
        <Link to='/' className='close-details'>Close</Link>
        <div className='book-details-spacer'></div>
      </div>
      <div className='search-books-results'>
        <If condition={isFetching}>
          <Then>
            <Loader type='ball-scale-multiple' />
          </Then>
          <Else>
            {book && (
              <Book
                book={book}
                onUpdateShelf={onUpdateShelf}
                detailed={true} />
            )}
          </Else>
        </If>
      </div>
    </div>
  )
}

BookDetails.propTypes = {
  book: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onUpdateShelf: PropTypes.func.isRequired
}

export default BookDetails
