window.$ = window.jQuery = require('jquery');
var remote = require('electron').remote;
var db = require('./app/js/datastore.js');
var month =remote.getGlobal('sharedObj').month;
var day = remote.getGlobal('sharedObj').day;
var year = remote.getGlobal('sharedObj').year;

function load_contracts(){
  $(".contract-selector").empty();
  db.get_contracts(month,year, function() {
    for (var i = 0; i < contracts.length; i++) {
      var name = contracts[i];
      $(".contract-selector").append(
        $("<option></option>").attr("value",name).text(name));
    }
  });
}
function load_timesheet(){
  clear_timesheet();
  db.get_day_hours(month,year,day, function() {
    for(var key in day_hours)
    {
      var name = key;
      var hours = day_hours[key];
      var title = $("<td>").html(name);
      var hours = $("<td>").html(hours);
      var row = $("<tr>").append(title,hours);
      $(".timesheet-table").append(row);
    }
  });

}
function clear_timesheet()
{
  $('.timesheet-table tr:not(:first)').remove();
}
