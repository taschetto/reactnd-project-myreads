import React from 'react'
import PropTypes from 'prop-types'
import { If, Then, Else } from 'react-if'
import { Loader } from 'react-loaders'

import Book from '../../Book/Book'
import './Bookshelf.css'

const Bookshelf = ({ title, books, isFetching, onUpdateShelf }) => (
  <div className='bookshelf'>
    <h2 className='bookshelf-title'>{title}</h2>
    <div className='bookshelf-books'>
      <If condition={isFetching}>
        <Then>
          <Loader type='ball-scale-multiple' />
        </Then>
        <Else>
          <If condition={books.length > 0}>
            <Then>
              <ol className='books-grid'>
                {books.map(book =>
                  <li key={book.id}>
                    <Book
                      book={book}
                      onUpdateShelf={onUpdateShelf} />
                  </li>
                )}
              </ol>
            </Then>
            <Else>
              <div>
                <div>Nothing to show here.</div>
                <div className='sad'></div>
              </div>
            </Else>
          </If>
        </Else>
      </If>
    </div>
  </div>
)

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onUpdateShelf: PropTypes.func.isRequired
}

export default Bookshelf
