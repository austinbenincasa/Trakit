var path = require('path');
var remote = require('electron').remote;
var con = remote.getGlobal('sharedObj').con;
var hws = remote.getGlobal('sharedObj').hws;

var add_contract = function(name,hours,month,year)
{
  var key = month + "_" + year;
  con.count({ id: key }, function (err, count) {
    if(count > 0)
    {
        var contract = {"name": name, "hours": hours};
        con.update({ id : key }, { $push: { contracts: contract,
          hours_remaining: contract } }, {}, function () {
        });
    }
    else if (count == 0)
    {
      var contract = new con({ id : key, contracts: [
        {"name": name, "hours": hours} ],hours_remaining: [
          {"name": name, "hours": hours} ]});
      contract.save(function(err){
      });
    }
  });
};

var add_hours_worked = function(month,day,year,week,name,hours)
{
  var key = month + "_" + day + "_" + year;
  var month_id = month + "_" + year;
  hws.count({ id: key, month : month_id }, function (err, count) {
    if(count > 0)
    {
      var contract = {"name": name, "hours": hours};
      hws.update({ id : key, month: month_id },
        { $push: { contracts_worked: contract } }, {}, function () {
      });
    }
    else if(count == 0)
    {
      var entry = new hws({ id : key, week : week, month: month_id
                 ,contracts_worked: [ {"name": name, "hours": hours} ]
               });
      entry.save(function(err){
      })
    }
  });
};

var get_week_hours = function(month,year,week,callback)
{
  var key = month + "_" + year;
  hws.find({ month: key, week : week }, function (err, docs) {
    if(docs)
    {
      week_hours = [];
      for (var i = 0; i < docs.length; i++)
      {
        var length = docs[i]["contracts_worked"].length;
        for (var j = 0; j < length; j++) {
          var name = docs[i]["contracts_worked"][j].name;
          var hours = docs[i]["contracts_worked"][j].hours;
          if(week_hours[name])
          {
            week_hours[name] = week_hours[name] + parseInt(hours);
          }
          else{
            week_hours[name] = parseInt(hours);
          }
        }
      }
      callback(null,null,null,week_hours);
    }
  });
};

var get_day_hours = function(month,year,day, callback)
{
  var key = month + "_" + day + "_" + year;
  hws.find({id: key}, function (err, docs) {
    if(docs)
    {
      day_hours = [];
      for (var i = 0; i < docs[0]["contracts_worked"].length; i++)
      {
        var name = docs[0]["contracts_worked"][i].name;
        var hours = docs[0]["contracts_worked"][i].hours;
        if(day_hours[name])
        {
          day_hours[name] = day_hours[name] + parseInt(hours);
        }
        else{
          day_hours[name] = parseInt(hours);
        }
      }
      callback(null,null,null,day_hours);
    }
  });
};

var get_contracts = function(month,year,callback)
{
  var key = month + "_" + year;
  con.find({ id: key }, function (err, docs)
  {
    contracts = [];
    if(docs)
    {
      for (var i = 0; i < docs[0]["contracts"].length; i++) {
        contracts.push(docs[0]["contracts"][i].name);
      }
      callback(null,null,contracts);
    }
  });
};
var get_remaining_hours = function(month,year,callback) {
  var key = month + "_" + year;
  con.find({ id: key }, function (err, docs)
  {
    totals = [];
    if(docs)
    {
      for (var i = 0; i < docs[0]["hours_remaining"].length; i++)
      {
        var name = docs[0]["hours_remaining"][i].name;
        var time = docs[0]["hours_remaining"][i].hours;
        totals[name] = parseInt(time);
      }
      callback(null,null,totals);
    }
  });
}

module.exports = {get_contracts, get_day_hours, get_week_hours,add_contract,
   add_hours_worked,get_remaining_hours};
