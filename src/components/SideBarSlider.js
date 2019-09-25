import { CSSTransition } from 'react-transition-group' 
import React, { Component } from 'react'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

class SideBarSlider extends Component {
  render() {
    return (
      <li className="sidebar-button">
        {this.props.title + ': ' + this.props.value} 
        <div className="sidebar-slider">
          <Slider value={this.props.value} onChange={e => this.props.updateValue({...this.props.target, size: e})}/>
        </div>
      </li>
    )
  }
}

export default SideBarSlider
