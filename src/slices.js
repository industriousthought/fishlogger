import defaultState from './defaultState'
import { combineReducers } from 'redux'
import { createSlice } from 'redux-starter-kit'

function saveRecord(state, action) {
  let index = state.findIndex(item => (item.id === action.payload.id))
  if (index === -1) state.splice(0, 0, action.payload)
  else state[index] = action.payload
}

const trips = createSlice({
  slice: 'trips',
  initialState: [],
  reducers: {
    saveTrip: saveRecord,
  },
  extraReducers: {},
})

const locations = createSlice({
  slice: 'locations',
  initialState: [],
  reducers: {
    saveLocation: saveRecord,
  },
  extraReducers: {},
})

const catches = createSlice({
  slice: 'catches',
  initialState: [],
  reducers: {
    saveCatch: saveRecord,
  },
  extraReducers: {},
})

const species = createSlice({
  slice: 'species',
  initialState: [],
  reducers: {
    saveSpecies: saveRecord,
  },
  extraReducers: {},
})

const ui = createSlice({
  slice: 'ui',
  initialState: [],
  reducers: {
    setGraph: (state, action) => {
      state.graph = action.payload
    },
    setActiveMarker: (state, action) => {
      state.activeMarker = action.payload
    },
    setBounds: (state, action) => {
      state.bounds = action.payload
    },
    setVisibility: (state, action) => {
      state.visibilityFilter = action.payload
    },
    setCenter: (state, action) => {
      state.center = action.payload
    },
    setZoom: (state, action) => {
      state.zoom = action.payload
    },
  },
  extraReducers: {},
})

export const reducer = combineReducers({
  ui: ui.reducer,
  locations: locations.reducer,
  catches: catches.reducer,
  species: species.reducer,
  trips: trips.reducer,
})

export const actions = {...ui.actions, ...locations.actions, ...trips.actions, ...species.actions, ...catches.actions}



