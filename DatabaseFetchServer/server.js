const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const fs = require("fs");
const app = express();

var formattedDateYesterday = undefined;
var usingTestDate = false;

//=====================Config=================
let port = 3000; // Choose a port number
//===========================================


//**********************TEMP FOR TESTING***********
// usingTestDate = true;
// formattedDateYesterday = '20230803000000'
//*************************************************


// Read and parse the config.json file
const configPath = './server-config.json';
const rawConfig = fs.readFileSync(configPath);
const config = JSON.parse(rawConfig).dbConfig;
port = JSON.parse(rawConfig).serverPort;



//=========================End of Config==============

// Use the cors middleware to enable CORS
app.use(cors());

// Handle requests
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

    const sqlCommand = `SELECT * FROM fsxy0001 WHERE 日期时间 > ` + formattedDateYesterday + ` ORDER BY 日期时间`;
    try {
        const result = await executeQuery(sqlCommand);
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/getUpdate', async (req, res) => {
    const updateValue = req.query.value; // Retrieve the value from the query string
    console.log("Update data later than: "+ updateValue);
    //Generate SQL command string
    const sqlCommand = `SELECT * FROM fsxy0001 WHERE 日期时间 > ` + updateValue + ` ORDER BY 日期时间`;
    try {
        const result = await executeQuery(sqlCommand);
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


async function executeQuery(query) {
    try {
        const pool = await sql.connect(config);
        console.log("Executing database query...")
        const result = await pool.request().query(query);
        console.log("Query Completed. \nResult:\n");
        console.log(result.recordset);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Database Error');
    }
}