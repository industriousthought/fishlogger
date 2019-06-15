import { TransitionGroup, CSSTransition } from 'react-transition-group' 
import React, { Component } from 'react'
import getTime from '../getTime'
import uuid from 'uuid'
import ReactDOM from 'react-dom'
import history from '../history'

class SideBar extends Component {
  constructor(props) {
    super(props)
  }
  catchFish = () => {
    const id = uuid()
    let currentTrip = this.props.trips[0]
    const lastFish = this.props.catches[0]
    console.log(currentTrip)
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
    history.push(this.props.location.pathname + 'editcatch/' + id) 
  }
  geolocate = pos => {
    geolocate(pos => {
      if (this.props.location.pathname.includes('/editcatch')) {
        const fish = this.props.catches.find(x => x.id === this.props.match.params.id)
        this.props.saveCatch({...fish, pos: pos})
      }
      this.props.setCenter(pos)
      this.props.setZoom({zoom: 19})
    })
  }
  render() {
    return (
      <ul className="sidebar opacity-toggle">
        <CSSTransition
          in={/^(?!.*(\/graph)).*$/.test(this.props.location.pathname)}
          classNames="opacity-toggle"
          timeout={300}
        >
          <li 
            onClick={this.geolocate}
            className="location-button">
            Geolocate
          </li>
        </CSSTransition>
        <CSSTransition
          in={/^(?!.*(\/editcatch|\/graph|\/editlocation)).*$/.test(this.props.location.pathname)}
          classNames="opacity-toggle"
          timeout={300}
        >
          <li
            onClick={() => {
              history.push('/graph') 
            }}
            className="location-button">
            Graph
          </li>
        </CSSTransition>
        <CSSTransition
          in={/^(?!.*(\/editcatch|\/graph|\/editlocation)).*$/.test(this.props.location.pathname)}
          classNames="opacity-toggle"
          timeout={300}
        >
          <li 
            className="location-button" 
            onClick={this.catchFish}>
            Catch Fish
          </li>
        </CSSTransition>
        <CSSTransition
          in={/^(?!.*(\/editcatch|\/graph|\/editlocation)).*$/.test(this.props.location.pathname)}
          classNames="opacity-toggle"
          timeout={300}
        >
          <li 
            className="location-button" 
            onClick={() => {
              const id = uuid()
              this.props.saveLocation({
                name: 'New Location',
                id,
                pos: this.props.center,
              })
              history.push('/editlocation/' + id) 
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
