import { CSSTransition } from 'react-transition-group' 
import React, { Component } from 'react'
import SideBarDropdown from '../containers/SideBarDropdown'
import SideBarSlider from '../containers/SideBarSlider'

class EditLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedMenu: ''}
  }
  render() {
    const id = this.props.filter.location
    const location = this.props.locations.find(x => x.id === id) || {}
    return (
      <li className="sidebar-menu">
        <ul>
          <li className="sidebar-button">
            <input type="text" onChange={e => this.props.saveLocation({...location, name: e.target.value})} value={location.name} />
          </li>
          <li className="sidebar-button" onClick={() => {
            this.props.changeUri('movelocation', id) }}>
            Move Location
          </li>
        </ul>
      </li>
    )
  }
}

export default EditLocation
