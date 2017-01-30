var getHumanDate = function(epochDate){
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

export default getHumanDate;
