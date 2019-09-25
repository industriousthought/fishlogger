import { connect } from 'react-redux'
import { actions } from '../slices'
import MapComponent from '../components/Map'

const mapStateToProps = state => ({
  locations: state.locations,
  center: state.ui.center,
  bounds: state.ui.bounds,
  zoom: state.ui.zoom,
  allCatches: state.catches,
})

const mapDispatchToProps = dispatch => ({
  setCenter: pos => dispatch(actions.setCenter(pos)),
  setBounds: bounds => dispatch(actions.setBounds(bounds)),
  setVisibility: filter => dispatch(actions.setVisibility(filter)),
  setZoom: zoom => dispatch(actions.setZoom(zoom)),
  setActiveMarker: marker => dispatch(actions.setActiveMarker(marker)),
  saveCatch: pos => dispatch(actions.saveCatch(pos)),
  saveLocation: pos => dispatch(actions.saveLocation(pos)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapComponent)




