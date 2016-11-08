var remote = require('electron').remote;
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Trakit?poolSize=10');
mongoose.Promise = global.Promise;


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

var con = mongoose.model('Contracts', Contracts, 'Contracts');

var hws = mongoose.model('HoursWorked', HoursWorked, 'HoursWorked');

remote.getGlobal('sharedObj').con = con;
remote.getGlobal('sharedObj').hws = hws;
