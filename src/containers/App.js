import {GoogleApiWrapper} from 'google-maps-react';
import App from '../components/App'
import { connect } from 'react-redux'
import { actions } from '../slices'

const mapStateToProps = state => ({
  catches: state.catches,
})

const mapDispatchToProps = dispatch => ({
})

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAQSPw1FNfMGRAtgcGwDWLgXifZYK2L-IE')
})(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
