import React from 'react'
import PropTypes from 'prop-types'
import { Debounce } from 'react-throttle'
import { If, Then, Else } from 'react-if'
import { Link } from 'react-router-dom'
import { Loader } from 'react-loaders'

import Book from '../Book/Book'
import './SearchBooks.css'

const SearchBooks = ({ isFetching, searchResults, onUpdateQuery, onUpdateShelf }) => {

  return (
    <div className='search-books'>
      <div className='search-books-bar'>
        <Link to='/' className='close-search'>Close</Link>
        <div className='search-books-input-wrapper'>
          <Debounce time='400' handler='onChange'>
            <input
              type='text'
              placeholder='Search by title or author'
              onChange={event => onUpdateQuery(event.target.value)} />
          </Debounce>
        </div>
      </div>

      <If condition={isFetching}>
        <Then>
          <Loader type='ball-scale-multiple' />
        </Then>
        <Else>
          <If condition={searchResults.length > 0}>
            <Then>
              <div className='search-books-results'>
                <ol className='books-grid'>
                  {searchResults.map(book =>
                    <li key={book.id}>
                      <Book
                        book={book}
                        onUpdateShelf={onUpdateShelf}
                        fromSearch={true} />
                    </li>
                  )}
                </ol>
              </div>
            </Then>
            <Else>
              <div className='search-books-results'>
                <div className='search-books-message'>
                  Nothing to show here. Maybe you should search for other terms?
                </div>
              </div>
            </Else>
          </If>
        </Else>
      </If>
    </div>
  )
}

SearchBooks.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  searchResults: PropTypes.array.isRequired,
  onUpdateQuery: PropTypes.func.isRequired,
  onUpdateShelf: PropTypes.func.isRequired
}

export default SearchBooks
