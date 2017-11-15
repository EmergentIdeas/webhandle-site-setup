# webhandle-site-setup
Set up a project to be ready to run as webhandle js site

Run:
```
npm install --save webhandle-site-setup
./node_modules/.bin/webhandle-site-setup

```
Then change `dev.config.js` setting appName to the name of your app or site.

If you don't have PM2 installed, install like:
```
sudo npm install -g pm2
```

You can start both the runtime environment by running:
```
pm2 start dev.config.js
```
This will run the server on port 3000, compile less files on change, and restart the server if there are changes in `server-js`.
You can restart manually by running:
```
pm2 restart all
```
