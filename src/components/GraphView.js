import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import history from '../history'
import {FlexibleXYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis'
import './GraphView.css'

class GraphView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="graph-container opacity-toggle">
        <div className="close-graph" onClick={e => {
          e.stopPropagation(); 
          history.push('/') }
        }>
          X
        </div>
        <div className="graph-view">
          <FlexibleXYPlot xType="ordinal">
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <VerticalBarSeries data={this.props.data} />
          </FlexibleXYPlot>
        </div>
        <ul className="graph-selector">
          {[{name: 'Species', identifier: 'species'}, {name: 'Location', identifier: 'location'}, {name: 'Hour', identifier: 'hour'}].map(item => {
            return (
              <li 
                className={'graph-selector-button ' + ((this.props.graph === item.identifier) ? 'selected-button' : '')} 
                onClick={() => this.props.setGraph(item.identifier)}>
                {item.name}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default GraphView
