import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class BookDetails extends Component {
  render() {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>Close</Link>
        </div>
        <div className='search-books-results'>
          {this.props.match.params.bookId}
        </div>
      </div>
    )
  }
}

export default BookDetails
