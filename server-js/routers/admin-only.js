const webhandle = require('webhandle')
const secureRouter = require('../utils/secure-router')

/**
 * Creates a router which will only allow users of the 'admnistrators' group
 * to access the routes.
 */
let preSecuredRouter = express.Router()
let securedRouter = secureRouter(preSecuredRouter)
webhandle.routers.primary.use(securedRouter)

module.exports = preSecuredRouter