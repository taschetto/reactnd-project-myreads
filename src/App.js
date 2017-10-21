import React from 'react'
import { Route } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    searchResults: []
  }

  updateSearchResults = searchResults => {
    this.setState({ searchResults })
  }

  render() {
    return (
      <div className='app'>
        <Route path='/search' render={() => (
          <DocumentTitle title='Search - MyReads'>
            <SearchBooks
              searchResults={this.state.searchResults}
              onSearch={this.updateSearchResults} />
          </DocumentTitle>
        )} />

        <Route exact path='/' render={() => (
          <DocumentTitle title='MyReads'>
            <ListBooks />
          </DocumentTitle>
        )} />
      </div>
    )
  }
}

export default BooksApp
