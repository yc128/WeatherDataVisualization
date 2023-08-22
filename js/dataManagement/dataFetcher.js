const updateTimeInterval = 1000*60*2 //millisecond

var dateOfLatestData = '0';
var dateOfOldestData = '0';
var previousDate = generateTodayDate();
var dbData;


async function fetchData() {
    const response = await fetch('http://localhost:3000/api/getData');
    dbData = await response.json();
    console.log('data fetched');
    dateOfLatestData = dbData[dbData.length-1][DATE_TIME_COLUMN];
    dateOfOldestData = dbData[0][DATE_TIME_COLUMN]
    console.log('date range: '+dateOfOldestData+" - "+dateOfLatestData);
    sendDbData();
}

async function updateData() {
    const response = await fetch(`/api/getUpdate?value=${dateOfLatestData}`);
    const result = await response.json();
    console.log("Size before update: "+dbData.length);
    dbData.concat(result);
    console.log("Size after update: "+dbData.length);
}


//For usual, update data
//Once date changed, fetch data
function intervalUpdate(){
    if(generateTodayDate() == previousDate){
        updateData();
    }else{
        previousDate = generateTodayDate();
        fetchData();
    }
}

function generateTodayDate(){
    var today = new Date();
    return today.getFullYear().toString() +
        (today.getMonth() + 1).toString().padStart(2, '0') +
        today.getDate().toString().padStart(2, '0') +
        '000000'; // HHMMSS is set to zero
}


//Send dbData to script in iframe
function sendDbData(){
    const iframe = document.getElementById("contentFrame");
    iframe.contentWindow.postMessage(dbData, '*');
}



fetchData();
setInterval(intervalUpdate, updateTimeInterval);

