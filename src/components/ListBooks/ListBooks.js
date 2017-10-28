import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Bookshelf from './Bookshelf/Bookshelf'
import './ListBooks.css'

const ListBooks = ({ books, isFetching, onUpdateShelf }) => {
  const shelves = [
    {
      id: 'currentlyReading',
      title: 'Currently Reading',
      books: books.filter(book => book.shelf === 'currentlyReading')
    },
    {
      id: 'wantToRead',
      title: 'Want to Read',
      books: books.filter(book => book.shelf === 'wantToRead')
    },
    {
      id: 'read',
      title: 'Read',
      books: books.filter(book => book.shelf === 'read')
    }
  ]

  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads by <a href='https://www.github.com/taschetto' target='_blank'>@taschetto</a></h1>
      </div>

      <div className='list-books-content'>
        {shelves.map(shelf => (
          <Bookshelf
            key={shelf.id}
            title={shelf.title}
            books={shelf.books}
            isFetching={isFetching}
            onUpdateShelf={onUpdateShelf} />
        ))}
      </div>

      <div className='open-search'>
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onUpdateShelf: PropTypes.func.isRequired
}

export default ListBooks
