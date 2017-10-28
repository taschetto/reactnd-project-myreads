import React from 'react'
import PropTypes from 'prop-types'
import { If, Then, Else } from 'react-if'

import BasicBook from './BasicBook/BasicBook'
import DetailedBook from './DetailedBook/DetailedBook'

const Book = ({ detailed, book, onUpdateShelf, fromSearch }) => {

  return (
    <If condition={!detailed}>
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
  detailed: false
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
  fromSearch: PropTypes.bool
}

export default Book
