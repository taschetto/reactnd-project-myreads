import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

const SEARCH_TIMEOUT_IN_MS = 2000
const MAX_SEARCH_ITEMS = 20

class SearchBooks extends Component {
  state = {
    results: [],
    typingTimeout: 0,
    isFetching: false
  }

  updateResults = query => {
    if (query.trim() === '') {
      this.setState({ results: [] })
      return
    }

    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      typingTimeout: setTimeout(() => {
        BooksAPI.search(query, MAX_SEARCH_ITEMS).then(results => {
          if (results.hasOwnProperty('error')) results = []
          this.setState({ results })
        })
      }, SEARCH_TIMEOUT_IN_MS)
    });
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
              placeholder="Search by title or author"
              onChange={event => this.updateResults(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          {results.length? (
            <ol className="books-grid">
              {results.map(book => <li key={book.id}><Book book={book}/></li>)}
            </ol>
          ) : (
            <span>Nothing to show here. Maybe you should try another search term? :-)</span>
          )}
        </div>
      </div>
    )
  }
}

export default SearchBooks
