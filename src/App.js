import React from 'react'
import { Route } from 'react-router-dom'
import DocumentTitle from 'react-document-title'

import BookDetails from './components/BookDetails/BookDetails'
import SearchBooks from './components/SearchBooks/SearchBooks'
import ListBooks from './components/ListBooks/ListBooks'

import * as BooksAPI from './utils/BooksAPI'
import './styles/App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    isFetching: false
  }

  componentDidMount() {
    this.setState({ isFetching: true })
    BooksAPI.getAll().then(books => {
      this.setState({ books, isFetching: false })
    })
  }

  getBookshelf = book => {
    let foundBook = this.state.books.find(b => b.id === book.id)
    return foundBook ? foundBook.shelf : 'none'
  }

  updateShelf = (book) => {
    let foundBook = this.state.books.find(b => b.id === book.id)
    if (foundBook) {
      this.setState({
        books: this.state.books.map(b => {
          if (b.id !== book.id) return b
          return book
        })
      })
    } else {
      this.setState(previousState => {
        return {
          books: previousState.books.concat(book)
        }
      })
    }
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <DocumentTitle title='MyReads'>
            <ListBooks
              books={this.state.books}
              isFetching={this.state.isFetching}
              onUpdateShelf={this.updateShelf} />
          </DocumentTitle>
        )} />

        <Route exact path='/details/:bookId' render={(props) => (
          <BookDetails
            {...props}
            onUpdateShelf={this.updateShelf} />
        )} />

        <Route path='/search' render={() => (
          <DocumentTitle title='Search - MyReads'>
            <SearchBooks
              getBookshelf={this.getBookshelf}
              onUpdateShelf={this.updateShelf} />
          </DocumentTitle>
        )} />
      </div>
    )
  }
}

export default BooksApp
