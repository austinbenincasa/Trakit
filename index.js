var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var d = new Date();
var day = d.getDate();
var wd = d.getDay();
var year = d.getFullYear();
var month = d.getMonth();

global.sharedObj = {month: month, day: day, year:year, week:null, db:null};

var mainWindow = null;
app.on('ready', function(){
  mainWindow = new BrowserWindow({
  width: 800,
  height: 600
  })
  mainWindow.loadURL('file://'+__dirname + '/index.html');
})
