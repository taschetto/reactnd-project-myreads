import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Loader } from 'react-loaders'

import * as BooksAPI from '../../utils/BooksAPI'

import './BookDetails.css'

class BookDetails extends Component {

  state = {
    book: null,
    isFetching: false
  }

  componentDidMount() {
    this.setState({ isFetching: true })
    BooksAPI.get(this.props.match.params.bookId).then(book => {
      this.setState({ book, isFetching: false })
    })
  }

  render() {
    const { book, isFetching } = this.state

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>Close</Link>
        </div>
        <div className='search-books-results'>
          {isFetching? (
            <Loader type='ball-scale-multiple' />
          ) : (
            book && (
              <div className="book-details">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
              </div>
            )
          )}
        </div>
      </div>
    )
  }
}

export default BookDetails
