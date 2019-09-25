import React, { Component } from 'react'
import FishIcon from '../img/fish.png'
import Map, { Circle, Marker } from 'google-maps-react';

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
    const view = 
      this.props.filter.editcatch ? 'editcatch' : 
      this.props.filter.movelocation ? 'movelocation' : 'map'
    let fish
    let location
    const id = this.props.filter[view]
    if (view === 'editcatch') fish = this.props.allCatches.find(x => x.id === id)
    if (view === 'movelocation') location = this.props.locations.find(x => x.id === id)
    const visibleItems = [...this.props.filteredCatches]
    if (this.props.filter.location) visibleItems.push(this.props.locations.find(x => x.id === this.props.filter.location))
    const bounds = getBounds(visibleItems)
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
          bounds={(view === 'map' && boundsChanged) ? bounds : null}
          google={this.props.google} 
          onDragend={(mapProps, map) => { 
            setCenter(map)
          }} 
          onZoom_changed={(mapProps, map) => { 
            setCenter(map)
          }}
          onBounds_changed={(mapProps, map) => { 
            if (this.bounds !== 'first') {
              if (view === 'map' && boundsChanged) {
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
            case 'movelocation':
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
                  radius={location.size * 10}
                />
              )
              break
            default:
              return this.props.locations.map((item, index) => {
                if (!this.props.filter.location || this.props.filter.location === item.id) return (
                  <Circle 
                    key={item.id}
                    onClick={(props, location, e) => {
                    }}
                    strokeColor='transparent'
                    strokeOpacity={0}
                    strokeWeight={5}
                    fillColor='#FF0000'
                    fillOpacity={0.2}
                    center={item.pos}
                    radius={item.size * 10}
                  />
                )
              }).concat(this.props.filteredCatches.map((item, index) => {
                return (
                  <Marker 
                    key={item.id}
                    onClick={(props, marker, e) => {
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
