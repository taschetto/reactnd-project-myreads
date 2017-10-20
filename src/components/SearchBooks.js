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
    results: [],
    typingTimeout: 0,
    isFetching: false
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      const { value } = event.target
      this.props.onUpdateQuery(value)
      this.updateResults(value)
    }
  }

  updateResults = query => {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      results: [],
      isFetching: true,
      typingTimeout: setTimeout(() => {
        this.fetchResults(query)
      }, SEARCH_TIMEOUT_IN_MS)
    });
  }

  fetchResults = query => {
    BooksAPI.search(query, MAX_SEARCH_ITEMS).then(results => {
      if (!results || results.hasOwnProperty('error')) results = []
      this.setState({ results, isFetching: false })
    })
  }

  render() {
    const { results } = this.state

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
          {results.length? (
            <ol className="books-grid">
              {results.map(book => <li key={book.id}><Book book={book}/></li>)}
            </ol>
          ) : (
            <div className='search-books-message'>
              {this.state.isFetching?
                'We\'re fetching your results. Please wait.'
                : 'Nothing to show here. Maybe you should search for other terms?'}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default SearchBooks
