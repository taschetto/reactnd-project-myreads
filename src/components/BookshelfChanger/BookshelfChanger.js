import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as BooksAPI from '../../utils/BooksAPI'
import './BookshelfChanger.css'

class BookshelfChanger extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  handleChange = event => {
    const book = this.props.book
    const shelf = event.target.value

    book.shelf = shelf
    this.props.onUpdateShelf(book)
    BooksAPI.update(book, shelf)
  }

  render() {
    const { shelf } = this.props.book
    return (
      <div className='book-shelf-changer'>
        <select value={shelf || 'none'} onChange={this.handleChange}>
          <option value='none' disabled>Move to...</option>
          <option value='currentlyReading'>Currently Reading</option>
          <option value='wantToRead'>Want to Read</option>
          <option value='read'>Read</option>
          <option value='none'>None</option>
        </select>
      </div>
    )
  }
}

export default BookshelfChanger
