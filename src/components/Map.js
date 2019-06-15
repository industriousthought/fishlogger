import React, { Component } from 'react'
import getTime from '../getTime'
import uuid from 'uuid'
import ReactDOM from 'react-dom'
import history from '../history'
import { NavLink } from 'react-router-dom'
import FishIcon from '../img/fish.png'
import Map, { Circle, Marker, GoogleApiWrapper } from 'google-maps-react';

const getBounds = catches => {
  return catches.reduce((acc, item) => {
      if (item.pos.lat < acc.south) acc.south = item.pos.lat
      if (item.pos.lat > acc.north) acc.north = item.pos.lat
      if (item.pos.lng > acc.east) acc.east = item.pos.lng
      if (item.pos.lng < acc.west) acc.west = item.pos.lng
      return acc
    }, {east: -180, north: -90, west: 180, south: 90})
}

class MapComponent extends Component {
  constructor(props) {
    super(props)
    this.bounds = 'first'
  }
  render() {
    const view = ['editcatch', 'editlocation'].reduce((acc, item) => {
      if (this.props.location.pathname.includes('/' + item)) return item
      return acc
    }, '')
    let fish
    let location
    console.log(this.props.zoom)
    let id
    if (view) id = this.props.location.pathname.split('/').slice(-1)[0]
    if (view === 'editcatch') fish = this.props.allCatches.find(x => x.id === id)
    if (view === 'editlocation') location = this.props.locations.find(x => x.id === id)
    const bounds = getBounds(this.props.catches)
    const boundsChanged = (JSON.stringify(bounds) !== JSON.stringify(this.bounds))
    const setCenter = map => {
      if (Math.abs(map.center.lat() - this.props.center.lat) > 0.000001 &&
        Math.abs(map.center.lng() - this.props.center.lng) > 0.000001) {
        const center = { lat: map.center.lat(), lng: map.center.lng(), }
        this.props.setCenter(center) 
        if (fish) this.props.saveCatch({...fish, pos: center})
        if (location) this.props.saveLocation({...location, pos: center})
      }
    }
    return (
      <div>
        <Map 
          style={{zIndex: '1'}}
          zoom={this.props.zoom}
          mapType={'satellite'}
          center={this.props.center}
          bounds={(!view && boundsChanged) ? bounds : null}
          google={this.props.google} 
          onDragend={(mapProps, map) => { 
            setCenter(map)
          }} 
          onZoom_changed={(mapProps, map) => { 
            setCenter(map)
          }}
          onBounds_changed={(mapProps, map) => { 
            if (this.bounds !== 'first') {
              if (!view && boundsChanged) {
                this.bounds = bounds
                setCenter(map)
              }
            } else {
              this.bounds = null
              this.forceUpdate()
            }
          }}
          zoomControl={false}
          fullscreenControl={false}
          streetViewControl={false}
          mapTypeControl={false}
        >
          {(() => {switch (view) {
            case 'editcatch':
              return (
                <Marker 
                  key={fish.id}
                  onClick={(props, marker, e) => {

                  }}
                  icon={FishIcon}
                  title={fish.length + ' ' + fish.species}
                  name={fish.species}
                  position={fish.pos}
                  itemId={fish.id}
                />
              )
              break
            case 'editlocation':
              return (
                <Circle 
                  key={location.id}
                  onClick={(props, marker, e) => {

                  }}
                  strokeColor='transparent'
                  strokeOpacity={0}
                  strokeWeight={5}
                  fillColor='#FF0000'
                  fillOpacity={0.2}
                  center={location.pos}
                  radius={50}
                />
              )
              break
            default:
              return this.props.locations.map((item, index) => {
                return (
                  <Circle 
                    key={item.id}
                    onClick={(props, location, e) => {
                      history.push(this.props.location.pathname + 'editlocation/' + item.id) 
                    }}
                    strokeColor='transparent'
                    strokeOpacity={0}
                    strokeWeight={5}
                    fillColor='#FF0000'
                    fillOpacity={0.2}
                    center={item.pos}
                    radius={50}
                  />
                )
              }).concat(this.props.catches.map((item, index) => {
                return (
                  <Marker 
                    key={item.id}
                    onClick={(props, marker, e) => {
                      history.push(this.props.location.pathname + 'editcatch/' + item.id) 
                    }}
                    icon={FishIcon}
                    title={item.length + ' ' + item.species}
                    name={item.species}
                    position={item.pos}
                    itemId={item.id}
                  />
                )
              }))
          }})()}
        </Map>
      </div>
    )
  }
}

export default MapComponent
