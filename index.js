var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

global.sharedObj = {month: null, day: null,year:null,week:null,db:null};

var mainWindow = null;
app.getPath('userData');

app.on('ready', function(){
  mainWindow = new BrowserWindow({
  width: 800,
  height: 600
  })
  mainWindow.loadURL('file://'+__dirname + '/index.html');
})
