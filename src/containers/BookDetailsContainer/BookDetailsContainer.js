import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BookDetails from '../../components/BookDetails/BookDetails'
import * as BooksAPI from '../../utils/BooksAPI'

class BookDetailsContainer extends Component {
  static propTypes = {
    bookCache: PropTypes.array.isRequired,
    onUpdateCache: PropTypes.func.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  state = {
    book: null,
    isFetching: false
  }

  componentDidMount() {
    const bookId = this.props.match.params.bookId
    const book = this.props.bookCache.find(book => book.id === bookId)

    if (book) {
      this.setState({ book })
    } else {
      this.setState({ isFetching: true })
      BooksAPI.get(bookId).then(book => {
        this.setState({ book, isFetching: false })
        this.props.onUpdateCache(this.props.bookCache.concat(book))
      })
    }
  }

  render() {
    const { book, isFetching } = this.state
    const { onUpdateShelf } = this.props

    return (
      <BookDetails
        {...this.props}
        book={book}
        isFetching={isFetching}
        onUpdateShelf={onUpdateShelf} />
    )
  }
}

export default BookDetailsContainer
