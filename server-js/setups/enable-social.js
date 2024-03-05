const webhandle = require('webhandle')
const path = require('path')

function enableSocial() {
    webhandle.routers.primary.use((req, res, next) => {
        let pageInfo = res.locals.pageInfo = res.locals.pageInfo || {}
        const url = req.originalUrl;

        const fullUrl = `https://${process.env.siteDomain || 'www.thesitename.com'}${url}`
        pageInfo.reqURL = fullUrl
        next()
    })

	webhandle.addTemplateDir(path.join(webhandle.projectRoot, 'node_modules/@dankolz/social-head-attributes/views'))

}

module.exports = enableSocial