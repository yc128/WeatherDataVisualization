const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const fs = require("fs");
const app = express();

var formattedDateYesterday = undefined;
var usingTestDate = false;


//Cache data
var cacheData = undefined;
var cacheDataTimestamp = undefined;

var cacheUpdateData = undefined;
var cacheUpdateDataTimestamp = undefined;


//**********************TEMP FOR TESTING***********
usingTestDate = true;
formattedDateYesterday = '20230803000000'
//*************************************************


// Read and parse the config.json file
const configPath = './server-config.json';
const rawConfig = fs.readFileSync(configPath);
const config = JSON.parse(rawConfig).dbConfig;
const port = JSON.parse(rawConfig).serverPort;
const tableName = JSON.parse(rawConfig).tableName;
const updateDataInterval  = JSON.parse(rawConfig).updateDataInterval;


//=========================End of Config==============

// Use the cors middleware to enable CORS
app.use(cors());

setInterval(fetchUpdateDataFromDb, 5000);



/**
 * Handle get data requests from the web
 * query and return recent two day's data (today's and yesterday's)
 */
app.get('/api/getData', async (req, res) => {
    console.log("getdata...");

    //date setting
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if(usingTestDate == false){
        console.log("Using current date");
        formattedDateYesterday = yesterday.getFullYear().toString() +
            (yesterday.getMonth() + 1).toString().padStart(2, '0') +
            yesterday.getDate().toString().padStart(2, '0') +
            '000000'; // HHMMSS is set to zero
    }

    const sqlCommand = `SELECT * FROM ` + tableName + ` WHERE 日期时间 > ` + formattedDateYesterday + ` ORDER BY 日期时间`;
    try {
        //Cache the data to avoid redundant database queries.
        if(cacheData !== undefined &&
            cacheDataTimestamp === formattedDateYesterday){
            console.log("returning cache data, timestamp: "+cacheDataTimestamp);
            res.json(cacheData);
        }else{
            const result = await executeQuery(sqlCommand);
            cacheData = result.recordset;
            cacheDataTimestamp = formattedDateYesterday;
            res.json(cacheData);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * query and return data later than given date.
 */
app.get('/api/getUpdate', async (req, res) => {
    const updateValue = req.query.value; // Retrieve the value from the query string
    console.log("Update data later than: "+ updateValue);

    try {
        let responseDataSet = [];
        cacheData.forEach(singleData => {
            if(singleData['日期时间'] > updateValue){
                responseDataSet.push(singleData);
            }
        })
        res.json(responseDataSet);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


/**
 * Update the caching data
 * @returns {Promise<void>}
 */
async function fetchUpdateDataFromDb(){
    if(cacheData === undefined || cacheData.length < 1){
        console.log("Cannot fetch update data from db");
        return;
    }

    let updateValue = cacheData[cacheData.length - 1]['日期时间'];
    console.log("Fetching update data from db... \n data later than "+updateValue);
    const sqlCommand = `SELECT * FROM ` + tableName + ` WHERE 日期时间 > ` + updateValue + ` ORDER BY 日期时间`;
    const result = await executeQuery(sqlCommand);
    processUpdateResult(result);
}


/**
 * Add updated result to cache data.
 * @param result
 */
function processUpdateResult(result){
    let resultSet = result.recordset;
    if(resultSet === undefined ||
        resultSet.length === 0 ||
        cacheData === undefined){
        return;
    }

    resultSet.forEach(singleData => {
        cacheData.push(singleData);
    })

}


async function executeQuery(query) {
    try {
        const pool = await sql.connect(config);
        console.log("Executing database query...")
        const result = await pool.request().query(query);
        console.log("Query Completed. \nResult:\n");
        if(result.recordset !== undefined && result.recordset.length > 0){
            console.log("First data: \n");
            console.log(result.recordset[0]);
            console.log("Last data: \n");
            console.log(result.recordset[result.recordset.length-1]);
        }else{
            console.log("empty");
        }

        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Database Error');
    }
}