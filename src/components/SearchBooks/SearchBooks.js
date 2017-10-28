import React, { Component } from 'react'
import { Debounce } from 'react-throttle'
import { If, Then, Else } from 'react-if'
import { Link } from 'react-router-dom'
import { Loader } from 'react-loaders'
import PropTypes from 'prop-types'

import Book from '../Book/Book'
import * as BooksAPI from '../../utils/BooksAPI'
import './SearchBooks.css'

const MAX_SEARCH_ITEMS = 20

class SearchBooks extends Component {

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
    if (query.trim() !== '') {
      this.setState({ isFetching: true })
      BooksAPI.search(query, MAX_SEARCH_ITEMS).then(searchResults => {
        let searchResultsWithShelves = searchResults.map(book => {
          book.shelf = this.props.getBookshelf(book)
          return book
        })

        this.props.onUpdateResults(searchResultsWithShelves)
        this.setState({ isFetching: false })
      })
    } else {
      this.props.onUpdateResults([])
    }
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
                onChange={event => this.updateQuery(event.target.value)} />
            </Debounce>
          </div>
        </div>

        <If condition={isFetching}>
          <Then>
            <Loader type='ball-scale-multiple' />
          </Then>
          <Else>
            <If condition={searchResults.length > 0}>
              <Then>
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
              </Then>
              <Else>
                <div className='search-books-results'>
                  <div className='search-books-message'>
                    Nothing to show here. Maybe you should search for other terms?
                  </div>
                </div>
              </Else>
            </If>
          </Else>
        </If>
      </div>
    )
  }
}

export default SearchBooks
