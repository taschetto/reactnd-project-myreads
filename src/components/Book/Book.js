import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookshelfChanger from '../BookshelfChanger/BookshelfChanger'

import './Book.css'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired
  }

  render() {
    const { id, title, authors, imageLinks } = this.props.book

    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
            <div className='book-details-link'>
              <Link to={`/details/${id}`}>Book Details</Link>
            </div>
            <BookshelfChanger
              book={this.props.book}
              onUpdateShelf={this.props.onUpdateShelf} />
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors && authors.join(', ')}</div>
        </div>
    )
  }
}

export default Book
