import { CSSTransition } from 'react-transition-group' 
import React, { Component } from 'react'
import SideBarSlider from '../containers/SideBarSlider'

class MoveLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedMenu: ''}
  }
  render() {
    const id = this.props.movingLocation
    const location = this.props.locations.find(x => x.id === id) || {}
    return (
      <li className="sidebar-menu opacity-toggle">
        <ul>
          <SideBarSlider title="Size" range={100} value={location.size} target={location} propery="size" updateValue={this.props.saveLocation} />
          <li 
            onClick={() => this.props.changeUri('movelocation', false)}
            className="sidebar-button">
            Done 
          </li>
        </ul>
      </li>
    )
  }
}

export default MoveLocation
