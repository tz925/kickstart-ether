export const conciseError = (message) => {
  const period = message.indexOf('.') + 1
  return message.substr(0,period)
}
