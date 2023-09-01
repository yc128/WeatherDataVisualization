
const updateTimeInterval = 1000 * 30 //millisecond
let serverIP = 'localhostdddd';
let port = '30003';


// Read and parse the config.json file
serverIP = dataFetcherConfig.serverIP;
port = dataFetcherConfig.serverPort;

var dateOfLatestData = '0';
var dateOfOldestData = '0';
var previousDate = generateTodayDate();
var dbData;


async function fetchData() {
    const response = await fetch(`http://${serverIP}:${port}/api/getData`);
    dbData = await response.json();
    console.log('data fetched');
    dateOfLatestData = dbData[dbData.length-1][DATE_TIME_COLUMN];
    dateOfOldestData = dbData[0][DATE_TIME_COLUMN];
    console.log('date range: '+dateOfOldestData+" - "+dateOfLatestData);
}

async function updateData() {
    const response = await fetch(`http://${serverIP}:${port}/api/getUpdate?value=${dateOfLatestData}`);
    var result = await response.json();
    console.log(result);
    console.log("Size before update: "+dbData.length);
    result.forEach(singleData => {
        dbData.push(singleData);
    })
    dateOfLatestData = dbData[dbData.length - 1][DATE_TIME_COLUMN];
    dateOfOldestData = dbData[0][DATE_TIME_COLUMN];
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



fetchData();
setInterval(intervalUpdate, updateTimeInterval);

