import { connect } from 'react-redux'
import { actions } from '../slices'
import ListView from '../components/ListView'

const mapStateToProps = state => ({
  graph: state.ui.graph,
  locations: state.locations,
  species: state.species,
  trips: state.trips,
})

const mapDispatchToProps = dispatch => ({
  setCenter: pos => dispatch(actions.setCenter(pos)),
  setGraph: graph => dispatch(actions.setGraph(graph)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListView)



