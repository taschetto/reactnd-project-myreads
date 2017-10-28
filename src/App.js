import React from 'react'
import { Route } from 'react-router-dom'
import DocumentTitle from 'react-document-title'

import BookDetailsContainer from './containers/BookDetailsContainer/BookDetailsContainer'
import ListBooksContainer from './containers/ListBooksContainer/ListBooksContainer'
import SearchBooksContainer from './containers/SearchBooksContainer/SearchBooksContainer'

import './styles/App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: []
  }

  getBookshelf = book => {
    let foundBook = this.state.books.find(b => b.id === book.id)
    return foundBook ? foundBook.shelf : 'none'
  }

  updateBooks = books => {
    this.setState({ books })
  }

  updateResults = searchResults => {
    this.setState({ searchResults })
  }

  updateShelf = updatedBook => {
    console.log('updateShelf')
    this.setState(previousState => {
      let books = previousState.books.filter(book => book.id !== updatedBook.id)
      return {
        books: books.concat(updatedBook)
      }
    })
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <DocumentTitle title='MyReads'>
            <ListBooksContainer
              books={this.state.books}
              onUpdateBooks={this.updateBooks}
              onUpdateShelf={this.updateShelf} />
          </DocumentTitle>
        )} />

        <Route exact path='/details/:bookId' render={(props) => (
          <DocumentTitle title='Details - MyReads'>
            <BookDetailsContainer
              {...props}
              onUpdateShelf={this.updateShelf} />
          </DocumentTitle>
        )} />

        <Route path='/search' render={() => (
          <DocumentTitle title='Search - MyReads'>
            <SearchBooksContainer
              searchResults={this.state.searchResults}
              getBookshelf={this.getBookshelf}
              onUpdateResults={this.updateResults}
              onUpdateShelf={this.updateShelf} />
          </DocumentTitle>
        )} />
      </div>
    )
  }
}

export default BooksApp
