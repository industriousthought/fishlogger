import { TransitionGroup, CSSTransition } from 'react-transition-group' 
import React, { Component } from 'react'
import uuid from 'uuid'
import history from '../history'

class EditCatch extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedMenu: ''}
  }
  render() {
    const fish = this.props.catches.find(x => x.id === this.props.match.params.id)
    const speciesName = fish.species ? this.props.species.find(x => x.id === fish.species).name : 'None'
    const locationName = fish.location ? this.props.locations.find(x => x.id === fish.location).name : 'None'
    return (
      <div className="edit-catch opacity-toggle">
        <ul>
          {[{name: 'Species', slice: this.props.species, currentValue: speciesName, property: 'species'},
            {name: 'Size', slice: new Array(30).fill({}).map((item, index) => {return {name: index, id: index}}), currentValue: fish.size | 0, property: 'size'},
            {name: 'Location', slice: this.props.locations, currentValue: locationName, property: 'location'}].map(item => (
              <li>
                {item.name}: 
                <span className="selected-edit-item" onClick={() => {
                  if (this.state.selectedMenu !== item.name) {
                    this.setState({selectedMenu:item.name})
                  } else {
                    this.setState({selectedMenu:''})
                  }
                }}> 
                {item.currentValue} 
                <CSSTransition
                  in={(this.state && this.state.selectedMenu === item.name)}
                  classNames="opacity-toggle"
                  timeout={300}
                >
                  <ul className="vertical-menu">
                    {item.slice.map(menuOption => (
                      <li onClick={() => {
                        this.props.saveCatch({...fish, [item.property]: menuOption.id})
                      }}>{menuOption.name}</li>
                    ))}
                  </ul>
                </CSSTransition>
              </span>
            </li>
            ))}
          </ul>
          <button onClick={() => {
            history.push(this.props.location.pathname.replace('editcatch/' + fish.id, ''))
          }}>
          Done
        </button>
  </div>
    )
  }
}

export default EditCatch
