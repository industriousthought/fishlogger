import { connect } from 'react-redux'
import { actions } from '../slices'
import SideBar from '../components/SideBar'

const mapStateToProps = state => ({
  locations: state.locations,
  species: state.species,
  catches: state.catches,
  trips: state.trips,
  center: state.ui.center,
})

const mapDispatchToProps = dispatch => ({
  setCenter: pos => dispatch(actions.setCenter(pos)),
  setZoom: zoom => dispatch(actions.setZoom(zoom)),
  setVisibility: filter => dispatch(actions.setVisibility(filter)),
  saveTrip: trip => dispatch(actions.saveTrip(trip)),
  saveCatch: pos => dispatch(actions.saveCatch(pos)),
  saveLocation: pos => dispatch(actions.saveLocation(pos)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar)



