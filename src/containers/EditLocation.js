import { connect } from 'react-redux'
import { actions } from '../slices'
import EditLocation from '../components/EditLocation'

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
)(EditLocation)
