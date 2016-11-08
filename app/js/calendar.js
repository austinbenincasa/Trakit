window.$ = window.jQuery = require('jquery');
var remote = require('electron').remote;

function loadcalendar()
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
      if(i != 30)
      {
        $("#week_" + week).css("display","table-row");
      }
      day = 0;
    }
    else{
      day = day + 1;
    }
  }
}
function change_calendar(){
  $('.today').removeClass('today');
  $('.day').empty();
  var week = 0
  for(var i = 0; i <=5; i++)
  {
    $("#week_" + parseInt(i)).css("display", "none");
  }
  var months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday",
    "Saturday"];
  var month = remote.getGlobal('sharedObj').month;
  var year = remote.getGlobal('sharedObj').year;
  var tday = remote.getGlobal('sharedObj').day;

  $(".month-title").html(months[month] + " " + year);
  $(".time-enter").html("Timesheet: " + months[month] + " " +
    tday + ", " + year);
  var month_len = getMonthLength(month,year);
  var fotm = new Date(year,month, 1).getDay();
  var week = 0;
  var day = fotm;
  $("#week_" + week).css("display", "table-row");
  for(var i = 0; i < month_len; i++)
  {
    var id = week.toString() + day.toString();
    $("#" + id).html((i+1).toString());
    if(i+1 == tday)
    {
      $("#" + id).addClass("today");
      remote.getGlobal('sharedObj').week = "week_" + week;
    }
    $("#" + id).addClass("active-day");
    if(day == 6)
    {
      week = week + 1;
      if(i != 30)
      {
        $("#week_" + week).css("display","table-row");
      }
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
  return date;
}

function getMonthLength(month,year){
  return new Date(year,month+1,0).getDate();
}
