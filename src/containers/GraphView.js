import { connect } from 'react-redux'
import { actions } from '../slices'
import GraphView from '../components/GraphView'

const mapStateToProps = state => ({
  graph: state.ui.graph,
  locations: state.locations,
  species: state.species,
})

const mapDispatchToProps = dispatch => ({
  setGraph: graph => dispatch(actions.setGraph(graph)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphView)



