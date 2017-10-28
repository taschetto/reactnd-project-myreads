import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ListBooks from '../../components/ListBooks/ListBooks'
import * as BooksAPI from '../../utils/BooksAPI'

class ListBooksContainer extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBooks: PropTypes.func.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  state = {
    isFetching: false
  }

  componentDidMount() {
    this.setState({ isFetching: true })
    BooksAPI.getAll().then(books => {
      this.setState({ isFetching: false })
      this.props.onUpdateBooks(books)
    })
  }

  render() {
    const { isFetching } = this.state
    const { books, onUpdateShelf } = this.props

    return (
      <ListBooks
        books={books}
        isFetching={isFetching}
        onUpdateShelf={onUpdateShelf} />
    )
  }
}

export default ListBooksContainer
