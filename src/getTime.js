if (!window.timeOffset) window.timeOffset = 0
const getTime = () => window.timeOffset + Date.now()

export default getTime
