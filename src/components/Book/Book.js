import React from 'react'
import PropTypes from 'prop-types'
import { If, Then, Else } from 'react-if'

import BasicBook from './BasicBook/BasicBook'
import DetailedBook from './DetailedBook/DetailedBook'

const Book = ({ mode, book, onUpdateShelf, fromSearch }) => {

  return (
    <If condition={mode === 'simple'}>
      <Then>
        <BasicBook
          book={book}
          onUpdateShelf={onUpdateShelf}
          fromSearch={fromSearch} />
      </Then>
      <Else>
        <DetailedBook
          book={book}
          onUpdateShelf={onUpdateShelf}
          fromSearch={fromSearch} />
      </Else>
    </If>
  )
}

Book.defaultProps = {
  mode: 'simple'
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
  fromSearch: PropTypes.bool
}

export default Book
