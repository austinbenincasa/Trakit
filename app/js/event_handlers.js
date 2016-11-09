window.$ = window.jQuery = require('jquery');
var remote = require('electron').remote;
var db = require('./app/js/datastore.js');

$(document).ready(function(){
  $(".active-day").click(function(){
      var months = ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];
      var month = remote.getGlobal('sharedObj').month;
      var year = remote.getGlobal('sharedObj').year;
      var day = $(this).text();
      var week = $(this).parent().prop("id");
      remote.getGlobal('sharedObj').day = day;
      remote.getGlobal('sharedObj').week = week;
      $(".today").removeClass("today");
      $(this).addClass("today");
      $(".time-enter").empty();
      $(".time-enter").html("Timesheet: " + months[month] + " " + day + ", " + year);
      $.getScript('app/js/hours_summary.js').done(function () {
          week_overview();
      });
      $.getScript('app/js/timesheet.js').done(function () {
          load_timesheet();
      });
  });
  $(".add-time").click(function(){
    $(".modual-overlay").css("display", "block");
    $('html, body').css('overflow', 'hidden');
  });
  $(".exit-button").click(function(){
      $(".modual-overlay").css("display", "none");
      $('html, body').css('overflow', 'auto');

  });
  $('.add-button').click(function() {
     var name = $("#add-con-name").val();
     var hours = $("#add-con-hours").val();
     $("#add-con-name").val();
     $("#add-con-hours").val();
     var month = remote.getGlobal('sharedObj').month;
     var year = remote.getGlobal('sharedObj').year;
     $(".modual-overlay").css("display", "none");
     db.add_contract(name,hours,month,year);
     $('html, body').css('overflow', 'auto');
     $(".contract-selector").append(
       $("<option></option>").attr("value",name).text(name));

  });
  $('.submit-time').click(function() {
    var day = remote.getGlobal('sharedObj').day;
    var month = remote.getGlobal('sharedObj').month;
    var year = remote.getGlobal('sharedObj').year;
    var week = remote.getGlobal('sharedObj').week;
    var name = $(".contract-selector option:selected").text()
    var hours = $(".contract-hours-input").val();
    if($.isNumeric(hours) && hours != 0)
    {
      db.add_hours_worked(month,day,year,week,name,hours);
    }
    else{
      alert("Not a valid time input");
    }
    var title = $("<td>").html(name);
    var hours = $("<td>").html(hours);
    var row = $("<tr>").append(title,hours);
    $(".timesheet-table").append(row);
    $.getScript('app/js/hours_summary.js').done(function () {
        week_overview();
    });
  });
  $('.leftarrow').click(function(){
    var month = remote.getGlobal('sharedObj').month;
    var year = remote.getGlobal('sharedObj').year;
    if(month === 0)
    {
      remote.getGlobal('sharedObj').month = 11;
      remote.getGlobal('sharedObj').year = year - 1;
    }
    else{
      remote.getGlobal('sharedObj').month = month - 1;
    }
    $.getScript('app/js/calendar.js').done(function () {
      change_calendar();
    });
    $.getScript('app/js/timesheet.js').done(function () {
        load_contracts();
    });
    $.getScript('app/js/hours_summary.js').done(function () {
        week_overview();
    });
    $.getScript('app/js/timesheet.js').done(function () {
        load_timesheet();
    });
  });
  $('.rightarrow').click(function(){
    var month = remote.getGlobal('sharedObj').month;
    var year = remote.getGlobal('sharedObj').year;
    if(month === 11)
    {
      remote.getGlobal('sharedObj').year = year + 1;
      remote.getGlobal('sharedObj').month = 0;
    }
    else{
      remote.getGlobal('sharedObj').month = month + 1;
    }
    $.getScript('app/js/calendar.js').done(function () {
        change_calendar();
    });
    $.getScript('app/js/timesheet.js').done(function () {
        load_contracts();
    });
    $.getScript('app/js/hours_summary.js').done(function () {
        week_overview();
    });
    $.getScript('app/js/timesheet.js').done(function () {
        load_timesheet();
    });
  });
});
