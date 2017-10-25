import React, { Component } from 'react'
import { Loader } from 'react-loaders'

import './Loader.css'

class Loader extends Component {
  render() {
    return (
      <Loader type="line-scale" active />
    )
  }
}

export default Loader
