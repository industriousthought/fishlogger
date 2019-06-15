import { connect } from 'react-redux'
import { actions } from '../slices'
import GraphView from '../components/GraphView'
import filterCatches from './filterCatches'

const mapStateToProps = state => {
  let data = []
  const catches = filterCatches(state.catches, state.ui.visibilityFilter)
  if (state.ui.graph === 'species') data = catches.reduce((output, item) => {
    const species = output.find(species => species.id === item.species)
    if (species) species.y++
    return output
  }, state.species.map(item => {return {x: item.name, y: 0, id: item.id}})).map(item => {return {x: item.x, y: item.y}})
  if (state.ui.graph === 'location') data = catches.reduce((output, item) => {
    const loc = output.find(loc => loc.id === item.location)
    if (loc) loc.y++
    return output
  }, state.locations.map(item => {return {x: item.name, y: 0, id: item.id}})).map(item => {return {x: item.x, y: item.y}})
  if (state.ui.graph === 'hour') data = catches.reduce((output, item) => {
    const hour = new Date(item.time).getHours()
    output.find(x => x.x === hour).y++
    return output
  }, new Array(24).fill(0).map((_, i) => ({x: i, y: 0})))
  return {
    data: data.filter(x => !!(x.y)),
    graph: state.ui.graph,
  }
}

const mapDispatchToProps = dispatch => ({
  setGraph: graph => dispatch(actions.setGraph(graph)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphView)



