import React from 'react'
import { Route } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    query: '',
    searchResults: []
  }

  updateSearch = (query, searchResults) => {
    this.setState({ query, searchResults })
  }

  render() {
    const { query, searchResults } = this.state
    return (
      <div className='app'>
        <Route path='/search' render={({ history }) => (
          <DocumentTitle title='Search - MyReads'>
            <SearchBooks
              query={query}
              searchResults={searchResults}
              history={history}
              onUpdateSearch={this.updateSearch} />
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
