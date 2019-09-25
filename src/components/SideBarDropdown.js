import { CSSTransition } from 'react-transition-group' 
import React, { Component } from 'react'

class SideBarDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {selected: false}
  }
  render() {
    const deselectMenu = () => {
      this.setState({selected: false})
      document.removeEventListener('click', deselectMenu)
    }
    console.log(this.props)
    return (
      <li className="sidebar-button">
        <span className="selected-edit-item" onClick={() => {
          if (!this.state.selected) {
            document.addEventListener('click', deselectMenu)
            this.setState({selected:true})
          }}}> 
          {this.props.title + ': ' + this.props.value} 
          <CSSTransition
            in={this.state.selected}
            classNames="opacity-toggle"
            timeout={300}
          >
            <ul className="sidebar-vertical-menu">
              {this.props.list.map(menuOption => (
                <li onClick={() => {
                  this.props.updateValue({...this.props.target, [this.props.property]: menuOption.id})
                }}>{menuOption.name}</li>
              ))}
            </ul>
          </CSSTransition>
        </span>
      </li>
    )
  }
}

export default SideBarDropdown
