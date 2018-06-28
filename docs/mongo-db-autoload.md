# MongoDB autoload

Webhandle will automatically try to load a webhandle database. In the pm2 config.js
file, add a section like below to the env member:

"env": {
	dbs: [
		{
			"type": "mongodb",
			"dbName": "the-db-name",
			"url": "mongodb://localhost:27017/",
			"collectionNames": [ "a", "list", "of", "collections", "to", "touch", "(optional)"]
		}
	]
}
