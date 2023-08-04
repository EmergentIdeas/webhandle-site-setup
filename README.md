# webhandle-site-setup
Set up a project to be ready to run as webhandle js site

Run:
```bash
npm install --save webhandle-site-setup
npx webhandle-site-setup
```

If you don't have PM2 installed, install like:
```bash
sudo npm install -g pm2
```

You can start both the runtime environment by running:
```
pm2 start dev.config.js
```
This will run the server on port 3000, compile less files on change, and restart the server if there are changes in `server-js`.
You can restart manually by running:
```bash
pm2 restart all
```
