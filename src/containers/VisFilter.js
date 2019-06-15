import { connect } from 'react-redux'
import { actions } from '../slices'
import VisibilityFilter from '../components/VisFilter'
import filterCatches from './filterCatches'

const mapStateToProps = state => ({
  currentFilter: state.ui.visibilityFilter,
  history: state.ui.visibilityHistory,
  locations: state.locations,
  species: state.species,
  trips: state.trips,
})

const mapDispatchToProps = dispatch => ({
  setVisibility: filter => dispatch(actions.setVisibility(filter)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibilityFilter)

