const getItem = (id, list) => {
  return list.find(x => x.id === id)
}

export default getItem
