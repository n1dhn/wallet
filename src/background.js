'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const fixPath = require('fix-path');
import { rootPath } from 'electron-root-path';
const isDevelopment = process.env.NODE_ENV !== 'production'
const { exec } = require("child_process");
import path from 'path'

import { platform } from 'os';
var kill  = require('tree-kill');

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

exec("ipfs daemon", (error, data, getter) => {
	if(error){
		console.log("error",error.message);
		return;
	}
	if(getter){
		console.log("data",data);
		return;
	}
	console.log("data",data);

});
const root = rootPath;

console.log("root path")
console.log(root)
// const binariesPath = path.join(root, './resources');
// export const jarPath = path.resolve(path.join(binariesPath, './rubix_api.jar'));

// var jarPath = __dirname + '/resources/app.asar.unpacked/rubix_api.jar';
fixPath();

const dirPath = __dirname.replace('app.asar', 'app.asar.unpacked');

console.log(dirPath)
if(process.platform=='macos') {
  jarPath.concat('/')
}

var jarPath = dirPath + '/rubix_api.jar';
// var jarPath = path.join(app.getAppPath(), '/rubix_api.jar')
// var jarPath = path.resolve(`${process.resourcesPath}/../bin/rubix_api.jar`);
// var jarPath = 'app://./rubix_api.jar'
// var jarPathProd = 'app://./resources/app.asar.unpacked/rubix_api.jar';
console.log("final jarpath here")
console.log(jarPath)

var child = require('child_process').spawn(
 'java', ['-jar', jarPath, '']
);

child.stdout.on('data', (d) => {
  console.log(d.toString())
})

const nativeImage = require('electron').nativeImage;
    var image = nativeImage.createFromPath(__dirname + '/build/icon.png');

    image.setTemplateImage(true);

async function createWindow() {
  console.log("Static path")
  console.log(__static)
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1410,
    height: 1000,
    title: "RubiX Wallet",
    icon: image,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      defaultEncoding: 'UTF-8',
      contextIsolation: false
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

app.on('window-all-closed', () => {
    kill(child.pid);
    app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
