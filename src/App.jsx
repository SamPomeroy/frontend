import React, { Component } from 'react'
import Header from './components/Header/Header'
import List from './components/List/List'

export class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <List/>
      </div>
    )
  }
}
export default App
