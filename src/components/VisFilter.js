import { TransitionGroup, CSSTransition } from 'react-transition-group' 
import { NavLink, Route } from 'react-router-dom'
import history from '../history'
import React, { Component } from 'react'
import './VisFilter.css'

class VisibilityFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {currentMenu: ''}
  }
  render() {
    const showMenu = !(this.props.location.pathname.includes('/editcatch') || this.props.location.pathname.includes('/editlocation') )
    return (
      <div>
        <CSSTransition
          in={showMenu}
          classNames="filter-menu-toggle"
          timeout={300}
        >
          <ul className="filter-editor">
            {[{title: 'Location', slice: 'locations'},{title: 'Trip', slice: 'trips'},{title: 'Species', slice: 'species'},].map(item => {
              const selectedItem = this.props[item.slice].find(x => x.id === this.props.currentFilter[item.slice]) || ''
              const currentMenu = (this.state.currentMenu === item.title)
              const deselectMenu = () => {
                if (item.title === this.state.currentMenu) this.setState({currentMenu: ''})
                document.removeEventListener('click', deselectMenu)
              }
              return (
                <CSSTransition
                  in={showMenu}
                  classNames="filter-buttons-toggle"
                  timeout={300}
                >
                  <CSSTransition
                    in={currentMenu}
                    classNames="selected-button"
                    timeout={300}
                  >
                    <li  
                      onClick={() => {
                        if (!currentMenu) {
                          document.addEventListener('click', deselectMenu)
                          this.setState({currentMenu: item.title})
                        }
                      }}
                      className="filter-buttons"
                    >
                      <div className="dropdown-title">
                        {selectedItem ? 
                            <div> 
                              <div onClick={(e) => {
                                e.stopPropagation(); 
                                this.props.setVisibility({...this.props.currentFilter, [item.slice]: null})}}
                                className="deselect-button"
                              >
                                X
                              </div>
                              {selectedItem.name} 
                            </div> 
                            : item.title
                        }
                      </div>
                      <CSSTransition
                        in={currentMenu && showMenu}
                        classNames="dropdown-transition"
                        timeout={300}
                      >
                        <ul className="dropdown">
                          {this.props[item.slice].map(menuItem => {
                            if (!selectedItem || this.props.currentFilter[item.slice] !== menuItem.id) return (
                              <CSSTransition
                                in={(this.state.currentMenu === item.title) && showMenu}
                                classNames="dropdown-item-transition"
                                timeout={300}
                              >
                                <li 
                                  className="dropdown-item"
                                  onClick={() => {this.props.setVisibility({...this.props.currentFilter, [item.slice]: menuItem.id})}} >
                                  {menuItem.name}
                                </li>
                              </CSSTransition>
                            )
                          })}
                        </ul>
                      </CSSTransition>
                    </li>
                  </CSSTransition>
                </CSSTransition>
              )})
            }
          </ul>
        </CSSTransition>
      </div>
    )
  }
}

export default VisibilityFilter
