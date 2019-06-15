import { connect } from 'react-redux'
import { actions } from '../slices'
import MapComponent from '../components/Map'
import getItem from './getItem'
import filterCatches from './filterCatches'

const mapStateToProps = state => ({
  locations: state.locations,
  center: state.ui.center,
  bounds: state.ui.bounds,
  zoom: state.ui.zoom,
  allCatches: state.catches,
  catches: filterCatches(state.catches, state.ui.visibilityFilter),
  trips: state.trips,
})

const mapDispatchToProps = dispatch => ({
  setCenter: pos => dispatch(actions.setCenter(pos)),
  setBounds: bounds => dispatch(actions.setBounds(bounds)),
  setVisibility: filter => dispatch(actions.setVisibility(filter)),
  setZoom: zoom => dispatch(actions.setZoom(zoom)),
  setActiveMarker: marker => dispatch(actions.setActiveMarker(marker)),
  saveTrip: trip => dispatch(actions.saveTrip(trip)),
  setCenter: pos => dispatch(actions.setCenter(pos)),
  saveCatch: pos => dispatch(actions.saveCatch(pos)),
  saveLocation: pos => dispatch(actions.saveLocation(pos)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapComponent)




