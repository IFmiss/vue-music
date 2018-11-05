export default {
  parseNumber: (value) => {
    console.log(value)
    return value >= 10000 ? Math.floor(value / 10000) + '万' : value
  }
}
