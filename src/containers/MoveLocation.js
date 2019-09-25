import { connect } from 'react-redux'
import { actions } from '../slices'
import MoveLocation from '../components/MoveLocation'

const mapStateToProps = state => {
  //console.log(state)
  return {
  locations: state.locations,
}}

const mapDispatchToProps = dispatch => ({
  saveLocation: locationObj => dispatch(actions.saveLocation(locationObj))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveLocation)
