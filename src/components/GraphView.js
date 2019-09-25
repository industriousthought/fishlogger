import { CSSTransition } from 'react-transition-group' 
import React, { Component } from 'react'
import {FlexibleXYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis'
import './GraphView.css'

class GraphView extends Component {
  constructor(props) {
    super(props);
    this.state = {currentGraph: 'location'}
  }
  render() {
    let data = []
    const catches = this.props.filteredCatches
    if (this.state.currentGraph === 'species') data = catches.reduce((output, item) => {
      const species = output.find(species => species.id === item.species)
      if (species) species.y++
      return output
    }, this.props.species.map(item => {return {x: item.name, y: 0, id: item.id}})).map(item => {return {x: item.x, y: item.y}})
    if (this.state.currentGraph === 'location') data = catches.reduce((output, item) => {
      const loc = output.find(loc => loc.id === item.location)
      if (loc) loc.y++
      return output
    }, this.props.locations.map(item => {return {x: item.name, y: 0, id: item.id}})).map(item => {return {x: item.x, y: item.y}})
    if (this.state.currentGraph === 'hour') data = catches.reduce((output, item) => {
      const hour = new Date(item.time).getHours()
      output.find(x => x.x === hour).y++
      return output
    }, new Array(24).fill(0).map((_, i) => ({x: i, y: 0})))
    data = data.filter(x => !!(x.y))
    return (
      <CSSTransition
        in={this.props.filter.graph}
        onEnter={() => this.forceUpdate()}
        classNames="opacity-toggle"
        timeout={300}
      >
        <div className="graph-container opacity-toggle">
          <div className="close-graph" onClick={e => {
            e.stopPropagation()
            this.props.changeUri('graph', false)
            }}>
            X
          </div>
          <div className="graph-view">
            <FlexibleXYPlot xType="ordinal">
              <HorizontalGridLines />
              <XAxis />
              <YAxis />
              <VerticalBarSeries data={data} />
            </FlexibleXYPlot>
          </div>
          <ul className="graph-selector">
            {[{name: 'Species', identifier: 'species'}, {name: 'Location', identifier: 'location'}, {name: 'Hour', identifier: 'hour'}].map(item => {
              return (
                <CSSTransition
                  in={(this.state.currentGraph === item.identifier)}
                  classNames="selected-button"
                  timeout={300}
                >
                  <li 
                    className={'graph-selector-button'} 
                    onClick={() => this.setState({currentGraph: item.identifier})}>
                    {item.name}
                  </li>
                </CSSTransition>
              )
            })}
          </ul>
        </div>
      </CSSTransition>
    )
  }
}

export default GraphView
