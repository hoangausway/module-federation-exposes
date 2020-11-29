import React from 'react'
import ReactDOM from 'react-dom'

import SomeComponent from './components/some-component'
import './styles/index.css'

// Test import of a JavaScript function
import { example } from './js/example'

function App () {
  return (
    <>
      <h3 style={{ textAlign: 'center', paddingTop: '0.75rem' }}>
        {example()}
      </h3>
      <SomeComponent />
    </>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
