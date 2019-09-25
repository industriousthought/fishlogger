import { CSSTransition } from 'react-transition-group' 
import React, { Component } from 'react'
import './VisFilter.css'

class VisibilityFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {currentMenu: ''}
  }
  render() {
    const showMenu = !(this.props.filter.editcatch || this.props.filter.movelocation)
    return (
      <div>
        <CSSTransition
          in={showMenu}
          classNames="filter-menu-toggle"
          timeout={300}
        >
          <ul className="filter-editor">
            {[{title: 'Location', slice: 'locations', uri: 'location'},{title: 'Trip', slice: 'trips', uri: 'trip'},{title: 'Species', slice: 'species', uri: 'species'},].map(item => {
              const selectedItem = this.props[item.slice].find(x => x.id === this.props.filter[item.uri]) || ''
              const currentMenu = (this.state.currentMenu === item.title)
              const deselectMenu = () => {
                this.setState({currentMenu: ''})
                document.removeEventListener('click', deselectMenu)
              }
              return (
                <CSSTransition
                  key={item.title}
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
                                this.props.changeUri(item.uri, null) }}
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
                                key={menuItem.id}
                                in={(this.state.currentMenu === item.title && showMenu)}
                                classNames="dropdown-item-transition"
                                timeout={300}
                              >
                                <li 
                                  key={menuItem.id}
                                  className="dropdown-item"
                                  onClick={() => this.props.changeUri(item.uri, menuItem.id)} >
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
