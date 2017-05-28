import Utils from '../utils'

let services = Utils.loadWithDefault(require.context('.', true, /\.\/[a-zA-Z_]+\/index\.js$/));

export default services
