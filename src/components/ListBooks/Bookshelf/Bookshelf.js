import React, { Component } from 'react'
import { If, Then, Else } from 'react-if'
import { Loader } from 'react-loaders'
import Book from '../../Book/Book'

import './Bookshelf.css'

class Bookshelf extends Component {
  render() {
    const { books, isFetching } = this.props

    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{this.props.title}</h2>
        <div className='bookshelf-books'>
          <If condition={isFetching}>
            <Then>
              <Loader type='ball-scale-multiple' />
            </Then>
            <Else>
              <If condition={books.length > 0}>
                <Then>
                  <ol className='books-grid'>
                    {books.map(book =>
                      <li key={book.id}>
                        <Book
                          book={book}
                          onUpdateShelf={this.props.onUpdateShelf} />
                      </li>
                    )}
                  </ol>
                </Then>
                <Else>
                  <div>
                    <div>Nothing to show here.</div>
                    <div className='sad'></div>
                  </div>
                </Else>
              </If>
            </Else>
          </If>
        </div>
      </div>
    )
  }
}

export default Bookshelf
