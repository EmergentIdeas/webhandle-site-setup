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
				trackerSecretKey: 'CHANGETHISTRACKERSECRETKEY'
				, initialAdminPassword: 'changethisadminpassword'
				// , dbs: [
                //    {
                //        "type": "mongodb",
                //        "dbName": "changethisdbname",
                //        "url": "mongodb://localhost:27017/",
                //        "collectionNames": [ "webhandleusers_users" ]
                //    }
                // ]
            }
        }
    ]
};