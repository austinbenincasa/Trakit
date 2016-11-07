window.$ = window.jQuery = require('jquery');
var remote = require('electron').remote;
var db = require('./app/js/datastore.js');

function week_overview()
{
  var month = remote.getGlobal('sharedObj').month;
  var week = remote.getGlobal('sharedObj').week;
  var year = remote.getGlobal('sharedObj').year;
  clear_overview();
  db.get_week_hours(month,year,week, function() {
    db.get_remaining_hours(month,year,function() {
      for(var key in week_hours)
      {
        var n = key;
        var h = week_hours[key];
        var r = totals[key];
        var t = r - h;
        var name = $("<td>").html(n);
        var total = $("<td>").html(h);
        var remain = $("<td>").html(t);
        var row = $("<tr>").append(name,total,remain);
        $(".con-table").append(row);
      }
    });
  });
}
function clear_overview(){
  $('.con-table tr:not(:first)').remove();
}
