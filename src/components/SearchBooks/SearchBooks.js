import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle'
import { Loader } from 'react-loaders'
import Book from '../Book/Book'
import * as BooksAPI from '../../utils/BooksAPI'
import './SearchBooks.css'

const MAX_SEARCH_ITEMS = 20

class SearchBooks extends Component {
  state = {
    searchResults: [],
    isFetching: false
  }

  updateQuery = query => {
    if (query.trim() !== '') {
      this.setState({ isFetching: true })
      BooksAPI.search(query, MAX_SEARCH_ITEMS).then(searchResults => {
        let searchResultsWithShelves = searchResults.map(book => {
          book.shelf = this.props.getBookshelf(book)
          return book
        })

        this.setState({ searchResults: searchResultsWithShelves, isFetching: false })
      })
    } else {
      this.setState({ searchResults: [] })
    }
  }

  render() {
    const { searchResults, isFetching } = this.state

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

        {isFetching && (
          <Loader type='ball-scale-multiple' />
        )}

        {!isFetching && (
          searchResults.length > 0 ? (
            <div className='search-books-results'>
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
          ) : (
            <div className='search-books-results'>
              <div className='search-books-message'>
                Nothing to show here. Maybe you should search for other terms?
              </div>
            </div>
          )
        )}
      </div>
    )
  }
}

export default SearchBooks
