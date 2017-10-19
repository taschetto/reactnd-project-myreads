import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './components/search-books'
import ListBooks from './components/list-books'

class BooksApp extends React.Component {
  state = {
    books: [
      {
        id: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        coverURL: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api'
      },
      {
        id: 2,
        title: 'The Adventures of Tom Sawyer',
        author: 'Mark Twain',
        coverURL: 'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api'
      }
    ]
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks searchResults={this.state.books}/>
        )} />

        <Route exact path='/' render={() => (
          <ListBooks />
        )} />
      </div>
    )
  }
}

export default BooksApp
