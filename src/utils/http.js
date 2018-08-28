import axios from 'axios'
axios.defaults = {
  ...axios.defaults,
  timeout: 15000
}
export default axios
