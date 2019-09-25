import React, { Component } from 'react'
import history from '../history'
import Map from '../containers/Map'
import GraphView from '../containers/GraphView'
import ListView from '../containers/ListView'
import SideBar from '../containers/SideBar'
import VisibilityFilter from '../containers/VisFilter'
import './App.css'
import filterCatches from '../containers/filterCatches'

class App extends Component { 
  render() {
    const uri = this.props.location.pathname.split('/')
    const filter = {}
    const uuids = ['location', 'species', 'trip', 'editcatch', 'movelocation']
    const bools = ['graph', 'list']
    uuids.forEach(option => {
      const i = uri.findIndex(item => item === option)
      if (i > -1) filter[option] = uri[i + 1]
    })
    bools.forEach(option => {
      const i = uri.findIndex(item => item === option)
      if (i > -1) filter[option] = true
    })
    const filteredCatches = filterCatches(this.props.catches, filter)
    const changeUri = ((updateKey, updateValue) => {
      filter[updateKey] = updateValue
      let path = ''
      uuids.forEach(option => {
        if (filter[option]) path += '/' + option + '/' + filter[option]
      })
      bools.forEach(option => {
        if (filter[option]) path += '/' + option
      })
      history.push(path)
    })
    return (
      <div className="App">
        <Map filter={filter} changeUri={changeUri} filteredCatches={filteredCatches} google={this.props.google} />
        <SideBar filter={filter} changeUri={changeUri} />
        <VisibilityFilter changeUri={changeUri} filter={filter} />
        <GraphView filter={filter} changeUri={changeUri} filteredCatches={filteredCatches} />
        <ListView filter={filter} changeUri={changeUri} filteredCatches={filteredCatches} />
      </div>
    )
  }
}

export default App;
