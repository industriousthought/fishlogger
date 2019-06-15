const filterCatches = (catches, filters) => {
  //console.log(catches)
  return catches.map(catchObj => {
    return Object.keys(filters).reduce((catchObj, filter) => {
      if (filters[filter]) {
        switch (filter) {
          case 'id':
            if (filters[filter] !== catchObj.id) return false
            break
          case 'species':
            if (filters[filter] !== catchObj.species) return false
            break
          case 'locations':
            if (filters[filter] !== catchObj.location) return false
            break
          case 'trips':
            if (filters[filter] !== catchObj.trip) return false
            break
          default:
        }
      }
      return catchObj
    }, catchObj)
  }).filter(obj => { return obj })
}

export default filterCatches
