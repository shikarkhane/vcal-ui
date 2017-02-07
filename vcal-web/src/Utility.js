var _makeId = function() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
var _getDayOfWeek = function(day){
  var weekday=new Array(7);
  weekday[0]="Sunday";
  weekday[1]="Monday";
  weekday[2]="Tuesday";
  weekday[3]="Wednesday";
  weekday[4]="Thursday";
  weekday[5]="Friday";
  weekday[6]="Saturday";

  return ( weekday[day]);
};

const _getDateFormat = function(epochDate){
  var date = new Date( epochDate*1000);
  var mon = date.getMonth()+1;
  var day = date.getDate();

  if( mon < 10){
    mon = '0' +  (date.getMonth()+1);
  }
  if( day < 10){
    day = '0' +  date.getDate();
  }

  return(date.getFullYear() + "-"+ mon + "-" + day);
};

const _getHumanDate = function(epochDate){
  var date = new Date( epochDate*1000);
  var mon = date.getMonth()+1;
  var day = date.getDate();

  if( mon < 10){
    mon = '0' +  (date.getMonth()+1);
  }
  if( day < 10){
    day = '0' +  date.getDate();
  }

  return(date.getFullYear() + "-"+ mon + "-" + day+ ", " + _getDayOfWeek(date.getDay()));
};

const _isNonWorkingDay = function(epochDate){
  return ( _isWeekend(epochDate) || _isHoliday(epochDate) );
}
const _isWeekend = function(epochDate){
  var date = new Date( epochDate*1000);
  var day = date.getDay();
  return ((day == 6) || (day == 0))
}
const _isHoliday = function(epochDate){
  var holidays = JSON.parse(localStorage.getItem("holidays"));
  return (holidays.indexOf(epochDate) >= 0 );
}


var _getUserInfo = function(userId){
  var users = JSON.parse(localStorage.getItem("usersObj"));
  var returnValue = false;
  users.forEach( function (user)
  {
    if ( user.id === userId ) {
      returnValue = user;
    }
  });
  return (returnValue);
};
export const getHumanDate = _getHumanDate;
export const isNonWorkingDay = _isNonWorkingDay;
export const getDateFormat = _getDateFormat;
export const getUserInfo = _getUserInfo;
export const makeId = _makeId;