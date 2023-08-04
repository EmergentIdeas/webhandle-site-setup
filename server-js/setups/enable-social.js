const webhandle = require('webhandle')

function enableSocial() {
    webhandle.routers.primary.use((req, res, next) => {
        let pageInfo = res.locals.pageInfo = res.locals.pageInfo || {}
        const url = req.originalUrl;

        const fullUrl = `https://www.thesitename.com${url}`
        pageInfo.reqURL = fullUrl
        next()
    })

	webhandle.addTemplateDir(path.join(webhandle.projectRoot, 'node_modules/@dankolz/social-head-attributes/views'))

}

module.exports = enableSocial