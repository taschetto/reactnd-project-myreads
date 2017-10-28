import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SearchBooks from '../../components/SearchBooks/SearchBooks'
import * as BooksAPI from '../../utils/BooksAPI'

const MAX_SEARCH_ITEMS = 20

class SearchBooksContainer extends Component {
  static propTypes = {
    searchResults: PropTypes.array.isRequired,
    onUpdateResults: PropTypes.func.isRequired,
    getBookshelf: PropTypes.func.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  state = {
    isFetching: false
  }

  updateQuery = query => {
    this.setState({ isFetching: true })

    BooksAPI.search(query, MAX_SEARCH_ITEMS).then(searchResults => {
      if (searchResults.error) searchResults = []

      let searchResultsWithShelves = searchResults.map(book => {
        book.shelf = this.props.getBookshelf(book)
        return book
      })

      this.props.onUpdateResults(searchResultsWithShelves)
      this.setState({ isFetching: false })
    })
  }

  render() {
    const { isFetching } = this.state
    const { searchResults, onUpdateShelf } = this.props

    return (
      <SearchBooks
        isFetching={isFetching}
        searchResults={searchResults}
        onUpdateQuery={this.updateQuery}
        onUpdateShelf={onUpdateShelf} />
    )
  }
}

export default SearchBooksContainer
