import React, { Component } from 'react'
import { Loader } from 'react-loaders'

import Book from '../../Book/Book'

import './Bookshelf.css'

class Bookshelf extends Component {
  render() {
    const { books, isFetching } = this.props
    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{this.props.title}</h2>
        <div className='bookshelf-books'>
          {isFetching && (
            <Loader type='ball-scale-multiple' />
          )}

          {!isFetching && (
            books && books.length? (
              <ol className='books-grid'>
                {books.map(book =>
                  <li key={book.id}>
                    <Book
                      book={book}
                      onUpdateShelf={this.props.onUpdateShelf} />
                  </li>
                )}
              </ol>
            ) : (
              <div>
                <div>Nothing to show here.</div>
                <div className='sad'></div>
              </div>
            )
          )}
        </div>
      </div>
    )
  }
}

export default Bookshelf
