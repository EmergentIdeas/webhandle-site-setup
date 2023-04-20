let appName = 'change-me'

module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [{
            name: appName + '-web',
            script: './web-server.js',
            "env": {
                PORT: 3000,
				trackerSecretKey: 'CHANGE THIS: I believe that at the end of the century the use of words and general educated opinion will have altered so much that one will be able to speak of machines thinking without expecting to be contradicted.'
            }
        }
    ]
};