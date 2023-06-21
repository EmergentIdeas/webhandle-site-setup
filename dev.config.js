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
				trackerSecretKey: 'CHANGETHISTRACKERSECRETKEY'
				, initialAdminPassword: 'changethisadminpassword'
				// , webhandleEmail: {
                //     transport: {
                //         service: "gmail",
                //         auth: {
                //             user: "username",
                //             pass: "pass"
                //         }
                //     },
                //     destDefault: "dan@example.com"
				// }
				// , webhandleEmail: {
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
                //        "dbName": "changethisdbname",
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
