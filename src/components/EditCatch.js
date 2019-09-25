import { CSSTransition } from 'react-transition-group' 
import React, { Component } from 'react'
import SideBarDropdown from '../containers/SideBarDropdown'
import SideBarSlider from '../containers/SideBarSlider'

class EditCatch extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const fish = this.props.catches.find(x => x.id === this.props.editingCatch) || {}
    const speciesName = fish.species ? this.props.species.find(x => x.id === fish.species).name : 'None'
    const locationName = fish.location ? this.props.locations.find(x => x.id === fish.location).name : 'None'
    return (
      <li className="sidebar-menu opacity-toggle">
        <ul>
          <SideBarDropdown title="Species" list={this.props.species} value={speciesName} target={fish} property="species" updateValue={this.props.saveCatch} />
          <SideBarSlider title="Size" range={100} value={fish.size} target={fish} propery="size" updateValue={this.props.saveCatch} />
          <SideBarDropdown title="Location" list={this.props.locations} value={locationName} target={fish} proprty="locations" updateValue={this.props.saveCatch} />
          <li 
            onClick={() => this.props.changeUri('editcatch', false)}
            className="sidebar-button">
            Done 
          </li>
        </ul>
      </li>
    )
  }
}

export default EditCatch
