import { connect } from 'react-redux'
import { actions } from '../slices'
import FilterEditor from '../components/FilterEditor'
import filterCatches from './filterCatches'

const mapStateToProps = state => ({
  currentFilter: state.ui.visibilityFilter,
  locations: state.locations,
  trips: state.trips,
  catches: state.catches,
  species: state.species,
})

const mapDispatchToProps = dispatch => ({
  setVisibility: filter => dispatch(actions.setVisibility(filter)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterEditor)

