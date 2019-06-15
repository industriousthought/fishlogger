import React, { Component } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group' 
import history from '../history'
import { NavLink, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import Map from '../containers/Map'
import GraphView from '../containers/GraphView'
import SideBar from '../containers/SideBar'
import VisibilityFilter from '../containers/VisFilter'
import EditCatch from '../containers/EditCatch'
import EditLocation from '../containers/EditLocation'
import './App.css'

class App extends Component { 
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Route
        render={({ location }) => (
          <div className="App">
            <Route path={['*/editcatch/:id', '*/editlocation/:id', '*']} render={(props) => <Map {...props} google={this.props.google} />} />
            <Route path={['*/editlocation/:id', '*/editcatch/:id', '*']} render={(props) => <SideBar {...props} location={this.props.location} />} />
            <CSSTransition
              in={/^(?!.*(\/editcatch|\/editlocation)).*$/.test(location.pathname)}
              classNames="opacity-toggle"
              timeout={300}
            >
              <div className="opacity-toggle">
                <VisibilityFilter location={this.props.location}/>
              </div>
            </CSSTransition>
            <TransitionGroup 
              childFactory={child => React.cloneElement(child, { classNames: "opacity-toggle" })} >
              <CSSTransition
                key={(() => 
                  ['graph', 'editcatch', 'editlocation'].reduce((acc, item) => {
                    if (location.pathname.includes('/' + item)) return item
                    return acc
                  }, '')
                )()}
                classNames="opacity-toggle"
                timeout={300}
              >
                <Switch location={location} >
                  <Route path="*/graph" render={(props) => <GraphView {...props} />}  />
                  <Route path="*/editcatch/:id" render={(props) => <EditCatch {...props} google={this.props.google} />} />
                  <Route path="*/editlocation/:id" render={(props) => <EditLocation {...props} google={this.props.google} />} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </div>
        )} />
    )
  }
}

export default App;
