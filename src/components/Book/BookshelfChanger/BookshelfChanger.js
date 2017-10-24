import React, { Component } from 'react'

import * as BooksAPI from '../../../utils/BooksAPI'

class BookshelfChanger extends Component {
  handleChange = event => {
    const book = this.props.book
    const shelf = event.target.value

    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.props.onUpdateShelf(book)
    })
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
