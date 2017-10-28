import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BookDetails from '../../components/BookDetails/BookDetails'
import * as BooksAPI from '../../utils/BooksAPI'

class BookDetailsContainer extends Component {
  static propTypes = {
    onUpdateShelf: PropTypes.func.isRequired
  }

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
    const { onUpdateShelf } = this.props

    return (
      <BookDetails
        book={book}
        isFetching={isFetching}
        onUpdateShelf={onUpdateShelf} />
    )
  }
}

export default BookDetailsContainer
