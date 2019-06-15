import { connect } from 'react-redux'
import { actions } from '../slices'
import EditCatch from '../components/EditCatch'

const mapStateToProps = state => ({
  center: state.ui.center,
  species: state.species,
  catches: state.catches,
  locations: state.locations,
})

const mapDispatchToProps = dispatch => ({
  saveCatch: catchObj => dispatch(actions.saveCatch(catchObj)),
  saveSpecies: species => dispatch(actions.saveSpecies(species)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCatch)
