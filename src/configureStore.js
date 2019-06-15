import { configureStore } from 'redux-starter-kit'
import { reducer } from './slices'
import defaultState from './defaultState'
const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer, 
  preloadedState: defaultState
})

export default store
