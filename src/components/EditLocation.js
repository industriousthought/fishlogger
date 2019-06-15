import { TransitionGroup, CSSTransition } from 'react-transition-group' 
import React, { Component } from 'react'
import history from '../history';

class EditLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedMenu: ''}
  }
  render() {
    const location = this.props.locations.find(x => x.id === this.props.match.params.id)
    return (
      <div className="edit-catch">
        <input type="text" onChange={e => this.props.saveLocation({...location, name: e.target.value})} value={location.name} />
      {[{name: 'Size', slice: new Array(30).fill({}).map((item, index) => {return {name: index, id: index}}), currentValue: location.size | 0, property: 'size'},].map(item => (
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
                  this.props.saveLocation({...location, [item.property]: menuOption.id})
                }}>{menuOption.name}</li>
              ))}
            </ul>
          </CSSTransition>
        </span>
      </li>
      ))}
        <button onClick={() => {
          history.push(this.props.location.pathname.replace('/editlocation/' + location.id, ''))
        }}>
        Done
      </button>
    </div>
    )
  }
}

export default EditLocation
