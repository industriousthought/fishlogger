import {GoogleApiWrapper} from 'google-maps-react';
import App from '../components/App'
import { connect } from 'react-redux'
import { actions } from '../slices'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  setCenter: pos => dispatch(actions.setCenter(pos)),
})

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAQSPw1FNfMGRAtgcGwDWLgXifZYK2L-IE')
})(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
