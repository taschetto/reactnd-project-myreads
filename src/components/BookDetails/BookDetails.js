import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from '../../utils/BooksAPI'

import './BookDetails.css'

class BookDetails extends Component {

  state = {
    book: null
  }

  componentDidMount() {
    BooksAPI.get(this.props.match.params.bookId).then(book => {
      this.setState({ book })
    })
  }

  render() {
    const { book } = this.state
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>Close</Link>
        </div>
        <div className='search-books-results'>
          <h1>{book && (book.title)}</h1>
        </div>
      </div>
    )
  }
}

export default BookDetails
