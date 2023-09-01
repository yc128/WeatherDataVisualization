const dataFetcherConfig = {
    serverIP : "localhost",
    serverPort: 3000
}


//*********************FOR ACTUAL DATABASE************
var formattedDateYesterday = undefined;
var formattedDateToday = undefined;
var formattedDateTomorrow = undefined;
var usingTestDate = false;
//**********************FOR STATIC DATABASE TESTING, UNCOMMENT***********
usingTestDate = true;
formattedDateYesterday = '20230810000000';
formattedDateToday = '20230811000000';
formattedDateTomorrow = '20230812000000';
//**********************************************************