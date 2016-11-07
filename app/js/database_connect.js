var remote = require('electron').remote;
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Trakit');
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' +
    'mongodb://127.0.0.1:27017/Trakit');
});


mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});


mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});


process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

var Contracts = new mongoose.Schema({
  id: String,
  contracts: Array,
  hours_remaining: Array,

});

var HoursWorked = new mongoose.Schema({
  id: String,
  week: String,
  month: String,
  contracts_worked: Array
});

var con;
try{
  con = mongoose.model('Contracts');
}
catch (e) {
  con = mongoose.model('Contracts', Contracts, 'Contracts');
}
var hws;
try{
  hws = mongoose.model('HoursWorked');
}
catch (e) {
  hws = mongoose.model('HoursWorked', HoursWorked, 'HoursWorked');
}
remote.getGlobal('sharedObj').con = con;
remote.getGlobal('sharedObj').hws = hws;
