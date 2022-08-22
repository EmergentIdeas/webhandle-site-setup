#! /usr/bin/env node
let path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const mkdir = spawn('mkdir', ['-p', 'public/css', 'public/js', 'public/img'])
console.log('creating directories')
mkdir.on('close', function(code) {
	let packageDir = path.resolve(path.dirname(require.main.filename), '..')
	let cwd = process.cwd()
	// console.log('package dir: ' + packageDir)
	// console.log('cwd: ' + cwd)
	spawn('cp', ['-rn', path.resolve(packageDir, 'client-js'), path.resolve(cwd)])
	spawn('cp', ['-rn', path.resolve(packageDir, 'server-js'), path.resolve(cwd)])
	spawn('cp', ['-rn', path.resolve(packageDir, 'less'), path.resolve(cwd)])
	spawn('cp', ['-rn', path.resolve(packageDir, 'views'), path.resolve(cwd)])
	spawn('cp', ['-rn', path.resolve(packageDir, 'menus'), path.resolve(cwd)])
	spawn('cp', ['-rn', path.resolve(packageDir, 'pages'), path.resolve(cwd)])
	spawn('cp', ['-rn', path.resolve(packageDir, 'build'), path.resolve(cwd)])
	spawn('cp', ['-rn', path.resolve(packageDir, 'test'), path.resolve(cwd)])
	spawn('cp', ['-rn', path.resolve(packageDir, 'utils'), path.resolve(cwd)])
	spawn('cp', ['-rn', path.resolve(packageDir, 'page-templates'), path.resolve(cwd)])
	spawn('cp', ['-rn', path.resolve(packageDir, 'dev.config.js'), path.resolve(cwd)])
	spawn('cp', ['-rn', path.resolve(packageDir, 'debug.config.js'), path.resolve(cwd)])
	spawn('cp', ['-rn', path.resolve(packageDir, 'server.config.js'), path.resolve(cwd)])
	spawn('cp', ['-rn', path.resolve(packageDir, 'web-server.js'), path.resolve(cwd)])
	
	let buildPackage = JSON.parse(fs.readFileSync(path.resolve(packageDir, 'package.json')).toString())
	let destPackage = JSON.parse(fs.readFileSync(path.resolve(cwd, 'package.json')).toString())
	
	if(!destPackage.devDependencies) {
		destPackage.devDependencies = {}
	}
	if(!destPackage.dependencies) {
		destPackage.dependencies = {}
	}
	if(!destPackage.scripts) {
		destPackage.scripts = {}
	}
	
	for(let key in buildPackage.devDependencies) {
		if(!destPackage.devDependencies[key]) {
			destPackage.devDependencies[key] = buildPackage.devDependencies[key]
		}
	}
	for(let key in buildPackage.dependencies) {
		if(!destPackage.dependencies[key]) {
			destPackage.dependencies[key] = buildPackage.dependencies[key]
		}
	}
	
	for(let key in buildPackage.scripts) {
		destPackage.scripts[key] = buildPackage.scripts[key]
	}
	fs.writeFileSync(path.resolve(cwd, 'package.json'), JSON.stringify(destPackage, null, "\t"))
	
	const npmInstall = spawn('npm', ['install'])
	npmInstall.on('close', function(code) {
		const compileLess = spawn('npm', ['run', 'less-build'])
		const compileJs = spawn('npm', ['run', 'client-js-build'])

		compileLess.on('close', function(code) {
			console.log('compiled less')
		})
		compileJs.on('close', function(code) {
			console.log('compiled js')
		})

	})
})