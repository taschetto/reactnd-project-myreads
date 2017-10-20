import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

const SEARCH_TIMEOUT_IN_MS = 2000
const MAX_SEARCH_ITEMS = 20

class SearchBooks extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  state = {
    typingTimeout: 0,
    isFetching: false
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      const { value } = event.target
      this.updateSearchResults(value)
    }
  }

  updateSearchResults = query => {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      isFetching: true,
      typingTimeout: setTimeout(() => {
        this.fetchSearchResults(query)
      }, SEARCH_TIMEOUT_IN_MS)
    });
  }

  fetchSearchResults = query => {
    BooksAPI.search(query, MAX_SEARCH_ITEMS).then(searchResults => {
      if (!searchResults || searchResults.hasOwnProperty('error')) searchResults = []
      this.setState({ isFetching: false })
      this.props.onUpdateSearch(query, searchResults)
    })
  }

  render() {
    const { query, searchResults } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author (and press 'Enter')"
              onKeyPress={this.handleKeyPress} />
          </div>
        </div>
        <div className="search-books-results">
          {searchResults.length? (
            <ol className="books-grid">
              {searchResults.map(book => <li key={book.id}><Book book={book}/></li>)}
            </ol>
          ) : (
            <div className='search-books-message'>
              {this.state.isFetching?
                'We\'re fetching your search results. Please wait.'
                : 'Nothing to show here. Maybe you should search for other terms?'}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default SearchBooks
