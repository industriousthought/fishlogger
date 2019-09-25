import { CSSTransition } from 'react-transition-group' 
import React, { Component } from 'react'

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {sortBy: 'location'}
  }
  render() {
    const nameLookup = this.props.locations.concat(this.props.species).concat(this.props.trips).reduce((acc, cur) => {
      acc[cur.id] = cur.name
      return acc
    }, {})
    const sortedList = this.props.filteredCatches.sort((a, b) => {
      if (this.state.sortBy === 'location') return ('' + nameLookup[a.location]).localeCompare(nameLookup[b.location])
      if (this.state.sortBy === 'size') return (b.size - a.size)
      if (this.state.sortBy === 'species') return  ('' + nameLookup[a.species]).localeCompare(nameLookup[b.species])
      return 0
    })
    return (
      <CSSTransition
        in={(this.props.filter.list && !this.props.filter.editcatch)}
        onEnter={() => this.forceUpdate()}
        classNames="opacity-toggle"
        timeout={300}
      >
        <div className="graph-container opacity-toggle">
          <div className="close-graph" onClick={e => {
            e.stopPropagation()
            this.props.changeUri('list', false)
            }}>
            X
          </div>
          <div className="list-view">
            <table className="list-table">
              <tr>
                <th>
                  Location
                </th>
                <th>
                  Size
                </th>
                <th>
                  Species
                </th>
                <th>
                  Trip
                </th>
              </tr>
              {sortedList.map(item => {
                return (
                  <tr onClick={() => {
                    this.props.changeUri('editcatch', item.id)
                    this.props.setCenter(item.pos)
                  }}>
                    <td>
                      {nameLookup[item.location]}
                    </td>
                    <td>
                      {item.size}
                    </td>
                    <td>
                      {nameLookup[item.species]}
                    </td>
                    <td>
                      {nameLookup[item.trip]}
                    </td>
                  </tr>
                )
              })}
            </table>
          </div>
          <ul className="graph-selector">
            {[{name: 'Species', identifier: 'species'}, {name: 'Location', identifier: 'location'}, {name: 'Size', identifier: 'size'}].map(item => {
              return (
                <CSSTransition
                  in={(this.state.sortBy === item.identifier)}
                  classNames="selected-button"
                  timeout={300}
                >
                  <li 
                    className={'graph-selector-button'} 
                    onClick={() => this.setState({sortBy: item.identifier})}>
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

export default ListView
