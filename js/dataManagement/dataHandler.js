var prevValue = 0;
var rawData = undefined;

var dataForToday = [];
var dataForYesterday = [];





// var isDrawable = false;

rawData = dbData;

/**
 * generate random x data. For testing
 * @param count
 * @returns {*[]}
 */
function generateIncrementingXDataPoint(count, intervalMinutes) {
    var xData = [];
    var currentDate = new Date();
    currentDate.setHours(0,0,0,0);

    for (var i = 0; i < count; i++) {
        var newDate = new Date((currentDate.getTime() + (i * intervalMinutes * 60 * 1000)));
        xData.push(newDate);
    }

    return xData;
}

function generateRandomYDataPoint(count){
    var yData = [];
    for(var i = 0; i < count; i++){
        var newData = prevValue + (Math.random() * 2 - 1);

        if(Math.random() < 0.1){
            newData = Math.floor(Math.random() * 40-20);
        }
        prevValue = newData;
        yData.push(Math.floor(newData));
    }
    return yData;
}

/**
 * Raw data processing.
 * Divided into two lists: today's data and yesterday's data
 * Sort lists by time
 * trimmed yesterday's data ensuring yesterday's data not later than today's (in 'HHMMSS')
 */
function sortDataByDate(){
    if(rawData === undefined){
        console.log("no data from db");
        return;
    }

    updateDate();


    if(rawData !== undefined){
        dataForYesterday = [];
        dataForToday = [];

        var dataForYesterdayUntrimmed = [];
        //Divide rawData to put in relative data lists
        rawData.forEach(singleData => {
            //append to yesterday's data (untrimmed)
            if(compareDateStrings(singleData[DATE_TIME_COLUMN], formattedDateYesterday) >= 0 &&
            compareDateStrings(singleData[DATE_TIME_COLUMN], formattedDateToday) < 0){
                dataForYesterdayUntrimmed.push(singleData);
            }

            //append to today's data
            if(compareDateStrings(singleData[DATE_TIME_COLUMN], formattedDateToday) >= 0 &&
                compareDateStrings(singleData[DATE_TIME_COLUMN], formattedDateTomorrow) < 0){
                dataForToday.push(singleData);
            }
        });

        //Sort data by date
        dataForToday.sort((a, b) => compareDateStrings(a[DATE_TIME_COLUMN], b[DATE_TIME_COLUMN]));
        dataForYesterdayUntrimmed.sort((a, b) => compareDateStrings(a[DATE_TIME_COLUMN], b[DATE_TIME_COLUMN]));

        //trim yesterday's data to ensure yesterday's data's time(HHMMSS) not later than today's latest
        const maxTimeToday = dataForToday[dataForToday.length-1][DATE_TIME_COLUMN].slice(SLICE_VALUE_FOR_DATE_HHMMSS);
        const maxTimeTodayValue = parseInt(maxTimeToday, 10);
        dataForYesterdayUntrimmed.forEach(singleData => {
            const timeValue = parseInt(singleData[DATE_TIME_COLUMN].slice(SLICE_VALUE_FOR_DATE_HHMMSS), 10);
            if(timeValue <= maxTimeTodayValue){
                dataForYesterday.push(singleData);
            }
        })

        //***********************TEST***************
        console.log("data processing completed");
        console.log(dataForToday[0][DATE_TIME_COLUMN]+' - '+dataForToday[dataForToday.length-1][DATE_TIME_COLUMN]);
        console.log(dataForYesterday[0][DATE_TIME_COLUMN]+' - '+dataForYesterday[dataForYesterday.length-1][DATE_TIME_COLUMN]);
        //******************************************
    }

}

//Update date parameter
function updateDate(){
    if(usingTestDate){
        return;
    }
    //date setting
    const today = new Date();
    const yesterday = new Date(today);
    const tomorrow = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    tomorrow.setDate(today.getDate() + 1);
    formattedDateYesterday = formattingDate(yesterday);
    formattedDateToday = formattingDate(today);
    formattedDateTomorrow = formattingDate(tomorrow);
}


//Convert standard date object in js into string format 'YYYYMMDDHHMMSS'
//Where 'HHMMSS' be set to '000000'
//'YYYYMMDD000000'
function formattingDate(targetDate){
    return targetDate.getFullYear().toString() +
        (targetDate.getMonth() + 1).toString().padStart(2, '0') +
        targetDate.getDate().toString().padStart(2, '0') +
        '000000'; // HHMMSS is set to zero
}


//Suitable for string data format: 'YYYYMMDDHHMMSS'
function compareDateStrings(dateString1, dateString2) {
    const dateToInt1 = parseInt(dateString1);
    const dateToInt2 = parseInt(dateString2);

    if (dateToInt1 < dateToInt2) {
        return -1; // dateString1 is earlier
    } else if (dateToInt1 > dateToInt2) {
        return 1; // dateString2 is earlier
    } else {
        return 0; // Both are the same
    }
}

//Convert string format 'YYYYMMDDHHMMSS into standard date object in js'
function convertToDateObj(dateString) {
    const year = parseInt(dateString.slice(0, 4), 10);
    const month = parseInt(dateString.slice(4, 6), 10) - 1; // Month is 0-indexed
    const day = parseInt(dateString.slice(6, 8), 10);
    const hour = parseInt(dateString.slice(8, 10), 10);
    const minute = parseInt(dateString.slice(10, 12), 10);
    const second = parseInt(dateString.slice(12, 14), 10);

    return new Date(year, month, day, hour, minute, second);
}
