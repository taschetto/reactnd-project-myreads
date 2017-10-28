import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Bookshelf from './Bookshelf/Bookshelf'
import './ListBooks.css'

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  render() {
    const shelves = [
      {
        id: 'currentlyReading',
        title: 'Currently Reading'
      },
      {
        id: 'wantToRead',
        title: 'Want to Read'
      },
      {
        id: 'read',
        title: 'Read'
      }
    ]

    const { books = [] } = this.props

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
              books={books.filter(book => book.shelf === shelf.id)}
              isFetching={this.props.isFetching}
              onUpdateShelf={this.props.onUpdateShelf} />
          ))}
        </div>
        <div className='open-search'>
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
