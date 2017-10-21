import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
  state = {
    isFetching: false,
    books: []
  }

  componentDidMount() {
    this.setState({ isFetching: true })
    BooksAPI.getAll().then(books => {
      this.setState({ isFetching: false , books })
    })
  }

  render() {
    const { books } = this.state
    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
    const wantToRead = books.filter(book => book.shelf === 'wantToRead')
    const read = books.filter(book => book.shelf === 'read')
    
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf title='Currently Reading' books={currentlyReading} />
            <Bookshelf title='Want to Read' books={wantToRead} />
            <Bookshelf title='Read' books={read} />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
