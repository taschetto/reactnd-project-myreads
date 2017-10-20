import React from 'react'
import { Route } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    query: 'rowling'
  }

  updateQuery = query => {
    this.setState({ query })
  }

  render() {
    const { query } = this.state

    return (
      <div className='app'>
        <Route path='/search' render={({ history }) => (
          <DocumentTitle title={query? `${query} - Search - MyReads` : 'Search - MyReads'}>
            <SearchBooks onUpdateQuery={this.updateQuery} history={history} />
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
