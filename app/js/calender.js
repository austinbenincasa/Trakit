window.$ = window.jQuery = require('jquery');
var remote = require('electron').remote;

$(document).ready(function(){
  function loadcalender()
  {
    var months = ["January","February","March","April","May","June","July",
      "August","September","October","November","December"];
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday",
      "Saturday"];
    var cur_date = getDate();
    $(".month-title").html(months[cur_date[1]] + " " + cur_date[2]);
    $(".current-date").html(days[cur_date[3]] + ", " +
      months[cur_date[1]]+ " " + cur_date[0] + ", " + cur_date[2]);
    $(".time-enter").html("Timesheet: " + months[cur_date[1]] + " " +
      cur_date[0] + ", " + cur_date[2]);
    var month_len = getMonthLength(cur_date[1],cur_date[2]);
    var fotm = new Date(cur_date[2], cur_date[1], 1).getDay();
    var week = 0;
    var day = fotm;
    $("#week_" + week).css("display", "table-row");
    for(var i = 0; i < month_len; i++)
    {
      var id = week.toString() + day.toString();
      $("#" + id).html((i+1).toString());
      if(i+1 == cur_date[0])
      {
        $("#" + id).addClass("today");
        remote.getGlobal('sharedObj').week = "week_" + week;
      }
      $("#" + id).addClass("active-day");
      if(day == 6)
      {
        week = week + 1;
        $("#week_" + week).css("display","table-row");
        day = 0;
      }
      else{
        day = day + 1;
      }
    }
  }
  function getDate() {
    var d = new Date();
    var day = d.getDate();
    var wd = d.getDay();
    var year = d.getFullYear();
    var month = d.getMonth();
    var date = [day,month,year,wd];
    remote.getGlobal('sharedObj').day = day;
    remote.getGlobal('sharedObj').month = month;
    remote.getGlobal('sharedObj').year = year;
    return date;
  }

  function getMonthLength(month,year){
    return new Date(year,month+1,0).getDate();
  }
  loadcalender();
});
