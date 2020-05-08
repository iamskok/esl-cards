export default () => {
  try {
    document.createEvent(`TouchEvent`)
    return true
  } catch (error) {
    return false
  }
}
