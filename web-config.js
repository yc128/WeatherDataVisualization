//======================DATABASE RELATED=========================
//server config
const dataFetcherConfig = {
    serverIP : "localhost",
    serverPort: 3000
}
//time interval for fetching update data from server (millisecond)
const updateTimeInterval = 1000 * 30

//*********************FOR ACTUAL DATABASE************
var formattedDateYesterday = undefined;
var formattedDateToday = undefined;
var formattedDateTomorrow = undefined;
var usingTestDate = false;
//**********************FOR STATIC DATABASE TESTING, UNCOMMENT***********
// usingTestDate = true;
// formattedDateYesterday = '20230810000000';
// formattedDateToday = '20230811000000';
// formattedDateTomorrow = '20230812000000';
//**********************************************************

//column name config, different depends on database
const chartNameColumnNameDict = {
    'Temperature': '气温',
    'Humidity': '湿度',
    'AtmosphericPressure': '气压',
    'WindSpeed': '分钟风速',
    'WindDirection': '分钟风向',
    'Rainfall': '小时雨量',
    'RainfallDay': '日雨量'
}


//==============================WEB RELATED===========================
//time interval for web chart switching (ms)
var switchInterval = 12 * 1000;