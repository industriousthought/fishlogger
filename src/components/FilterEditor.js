import { TransitionGroup, CSSTransition } from 'react-transition-group' 
import { NavLink } from 'react-router-dom'
import React, { Component } from 'react'
import './FilterEditor.css'
import filterCatches from '../containers/filterCatches'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class FilterEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {currentMenu: ''}
  }
  render() {
    return (
        <ul className="filter-menu ">
        </ul>
    )
  }
}

export default FilterEditor
