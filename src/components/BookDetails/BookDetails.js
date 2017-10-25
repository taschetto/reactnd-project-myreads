import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './BookDetails.css'

class BookDetails extends Component {
  render() {
    let foundBook = this.props.books.find(b => b.id === this.props.match.params.bookId)
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>Close</Link>
        </div>
        <div className='search-books-results'>
          {foundBook && (
            <h1>{foundBook.title}</h1>
          )}
        </div>
      </div>
    )
  }
}

export default BookDetails
