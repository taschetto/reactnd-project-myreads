import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <div className='app'>
        <Route path='/search' render={() => (
          <SearchBooks />
        )} />

        <Route exact path='/' render={() => (
          <ListBooks />
        )} />
      </div>
    )
  }
}

export default BooksApp
