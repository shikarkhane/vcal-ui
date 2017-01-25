function getHumanDate(epochDate){
  var date = new Date( epochDate);
  return(
      (date.getMonth() + 1) + "-" +
      date.getDate() + "-" +
      date.getFullYear() + " "
  );
};

export default getHumanDate;
