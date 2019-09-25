import { CSSTransition } from 'react-transition-group' 
import EditLocation from '../containers/EditLocation'
import EditCatch from '../containers/EditCatch'
import MoveLocation from '../containers/MoveLocation'
import React, { Component } from 'react'
import getTime from '../getTime'
import uuid from 'uuid'

class SideBar extends Component {
  catchFish = () => {
    const id = uuid()
    let currentTrip = this.props.trips[0]
    const lastFish = this.props.catches[0]
    if (currentTrip) {
      if (!currentTrip.stop && getTime() - lastFish.time > 21600000) {
        currentTrip = {...currentTrip, stop: lastFish.time}
        this.props.saveTrip(currentTrip)
      }
    }
    if (!currentTrip || currentTrip.stop) {
      currentTrip = {
        id: uuid(),
        name: new Date(getTime()).toDateString(),
        start: getTime(),
        stop: false,
      }
      this.props.saveTrip(currentTrip)
    }
    this.props.saveCatch({
      id,
      trip: currentTrip.id,
      pos: this.props.center,
      time: getTime(),
      ...defaultCatch
    })
    this.props.setZoom({zoom: 19})
    this.props.changeUri('editcatch', id)
  }
  geolocate = pos => {
    geolocate(pos => {
      if (this.props.filter.editcatch) {
        const fish = this.props.catches.find(x => x.id === this.props.filter.editcatch)
        this.props.saveCatch({...fish, pos: pos})
      }
      this.props.setCenter(pos)
      this.props.setZoom({zoom: 19})
    })
  }
  render() {
    const filter = this.props.filter
    return (
      <ul className="sidebar">
        <CSSTransition
          in={!filter.list && !filter.graph && !filter.list && !filter.movelocation}
          classNames="opacity-toggle"
          timeout={300}
        >
          <li 
            onClick={this.geolocate}
            className="sidebar-button">
            Geolocate
          </li>
        </CSSTransition>
        <CSSTransition
          in={filter.location && !filter.editcatch && !filter.movelocation && !filter.list && !filter.graph && !filter.list}
          classNames="opacity-toggle"
          timeout={300}
          unmountOnExit
        >
          <EditLocation {...this.props} />
        </CSSTransition>
        <CSSTransition
          in={filter.movelocation}
          classNames="opacity-toggle"
          timeout={300}
          unmountOnExit
        >
          <MoveLocation movingLocation={filter.movelocation} changeUri={this.props.changeUri}/>
        </CSSTransition>
        <CSSTransition
          in={filter.editcatch}
          classNames="opacity-toggle"
          timeout={300}
          unmountOnExit
        >
          <EditCatch changeUri={this.props.changeUri} editingCatch={filter.editcatch} />
        </CSSTransition>
        <CSSTransition
          in={(!filter.list && !filter.graph && !filter.movelocation && !filter.editcatch)}
          classNames="opacity-toggle"
          timeout={300}
        >
          <li
            onClick={() => {
              this.props.changeUri('list', true)
            }}
            className="sidebar-button">
            List
          </li>
        </CSSTransition>
        <CSSTransition
          in={(!filter.list && !filter.graph && !filter.movelocation && !filter.editcatch)}
          classNames="opacity-toggle"
          timeout={300}
        >
          <li
            onClick={() => {
              this.props.changeUri('graph', true)
            }}
            className="sidebar-button">
            Graph
          </li>
        </CSSTransition>
        <CSSTransition
          in={(!filter.list && !filter.graph && !filter.movelocation && !filter.editcatch)}
          classNames="opacity-toggle"
          timeout={300}
        >
          <li 
            className="sidebar-button" 
            onClick={this.catchFish}>
            Catch Fish
          </li>
        </CSSTransition>
        <CSSTransition
          in={(!filter.graph && !filter.list && !filter.movelocation && !filter.editcatch)}
          classNames="opacity-toggle"
          timeout={300}
        >
          <li 
            className="sidebar-button" 
            onClick={() => {
              const id = uuid()
              this.props.saveLocation({
                name: 'New Location',
                id,
                pos: this.props.center,
              })
              this.props.changeUri('movelocation', id)
            }}
          >
            Save Location
          </li>
        </CSSTransition>
      </ul>
    )
  }
}

const geolocate = (f) => {
  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(position => {
     f({
       lat: position.coords.latitude,
       lng: position.coords.longitude
     })
   }, () => {
   })
  }
};

const defaultCatch = {
  species: '',
  length: 0,
  weight: 0,
  notes: '',
}

export default SideBar
