let appName = 'change-me'

module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [{
            name: appName + '-web',
            script: './web-server.js',
			node_args: ['--inspect', '--inspect-brk'],
            "env": {
                PORT: 3000,
				NODE_ENV: 'development',
				trackerSecretKey: 'CHANGE THIS: I believe that at the end of the century the use of words and general educated opinion will have altered so much that one will be able to speak of machines thinking without expecting to be contradicted.'
            }
        },
        {
            "name": appName + '-bg',
            "script": "npm",
            "args": "run pm2-bg"
        }
    ]
};