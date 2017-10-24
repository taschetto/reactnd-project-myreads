import React, { Component } from 'react'
import Book from '../../Book/Book'

class Bookshelf extends Component {
  render() {
    const { books } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books && books.length? (
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
              <div className='search-books-message'>
                Nothing to show here.
              </div>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
