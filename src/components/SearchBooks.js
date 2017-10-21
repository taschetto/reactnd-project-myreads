import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

const MAX_SEARCH_ITEMS = 20

class SearchBooks extends Component {
  state = {
    isFetching: false
  }

  updateSearchResults = query => {
    this.setState({ isFetching: true })
    BooksAPI.search(query, MAX_SEARCH_ITEMS).then(searchResults => {
      this.setState({ isFetching: false })
      this.props.onSearch(searchResults)
    })
  }

  render() {
    const { isFetching } = this.state
    const { searchResults } = this.props

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>Close</Link>
          <div className='search-books-input-wrapper'>
            <Debounce time='400' handler='onChange'>
              <input
                type='text'
                placeholder='Search by title or author'
                disabled={isFetching}
                onChange={event => this.updateSearchResults(event.target.value)} />
            </Debounce>
          </div>
        </div>
        <div className='search-books-results'>
          {searchResults && searchResults.length? (
            <ol className='books-grid'>
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
