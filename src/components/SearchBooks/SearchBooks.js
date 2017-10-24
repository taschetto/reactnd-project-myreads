import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle'

import Book from '../Book/Book'
import * as BooksAPI from '../../utils/BooksAPI'

const MAX_SEARCH_ITEMS = 20

class SearchBooks extends Component {
  state = {
    searchResults: []
  }

  updateQuery = query => {
    if (query.trim() !== '') {
      BooksAPI.search(query, MAX_SEARCH_ITEMS).then(searchResults => {
        let searchResultsWithShelves = searchResults.map(book => {
          book.shelf = this.props.getBookshelf(book)
          return book
        })

        this.setState({ searchResults: searchResultsWithShelves })
      })
    } else {
      this.setState({ searchResults: [] })
    }
  }

  render() {
    const { searchResults } = this.state

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>Close</Link>
          <div className='search-books-input-wrapper'>
            <Debounce time='400' handler='onChange'>
              <input
                type='text'
                placeholder='Search by title or author'
                onChange={event => this.updateQuery(event.target.value)} />
            </Debounce>
          </div>
        </div>
        <div className='search-books-results'>
          {this.state.searchResults.length === 0 && (
            <div className='search-books-message'>
              Nothing to show here. Maybe you should search for other terms?
            </div>
          )}
          <ol className='books-grid'>
            {searchResults.map(book =>
              <li key={book.id}>
                <Book
                  book={book}
                  onUpdateShelf={this.props.onUpdateShelf} />
              </li>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
