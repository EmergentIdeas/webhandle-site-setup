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
				NODE_ENV: 'development',
				trackerSecretKey: 'CHANGE THIS: I believe that at the end of the century the use of words and general educated opinion will have altered so much that one will be able to speak of machines thinking without expecting to be contradicted.',
				// webhandleEmail: {
                //     transport: {
                //         service: "gmail",
                //         auth: {
                //             user: "username",
                //             pass: "pass"
                //         }
                //     },
                //     destDefault: "dan@example.com"
				// }
				// webhandleEmail: {
                //     transport: {
                //         host: "smtp.office365.com",
                //         port: 587,
                //         secure: false, // true for 465, false for other ports
                //         auth: {
                //             user: 'username',
                //             pass: 'pass'
                //         }
                //     },
                //     destDefault: "dan@example.com"
                // }
				// , dbs: [
                //    {
                //        "type": "mongodb",
                //        "dbName": "dbname",
                //        "url": "mongodb://localhost:27017/",
                //        "collectionNames": [ "webhandleusers_users" ]
                //    }
                // ]


            }
        },
        {
            "name": appName + '-bg',
            "script": "npm",
            "args": "run pm2-bg"
        }
    ]
};
