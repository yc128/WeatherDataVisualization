//====================Config====================
const tableUpdateInterval = 1000*3 //millisec



// Get a reference to the table body
const tableBody = document.getElementById('tableBody');


setInterval(updateTableData, tableUpdateInterval);

function updateTableData(){
    // Example data (replace with your actual data)
    const rowData = [
    ];

    if(dbData === undefined){
        return;
    }
    let latestData = dbData[dbData.length-1];
    let latestDataRow = [];
    latestDataRow.push(convertToDateStr(latestData[DATE_TIME_COLUMN]));
    latestDataRow.push(parseInt(latestData[chartNameColumnNameDict['Temperature']]) / 10 + "\u00B0C");
    latestDataRow.push(latestData[chartNameColumnNameDict['Humidity']] + "%");
    latestDataRow.push(parseInt(latestData[chartNameColumnNameDict['AtmosphericPressure']]) / 10 + "hPa");
    latestDataRow.push(latestData[chartNameColumnNameDict['WindSpeed']] / 10 + "m/s");
    latestDataRow.push(latestData[chartNameColumnNameDict['WindDirection']] + "\u00B0");
    latestDataRow.push(latestData[chartNameColumnNameDict['Rainfall']] / 10 + "mm");
    latestDataRow.push(latestData[chartNameColumnNameDict['RainfallDay']] / 10 + "mm");



    rowData.push(latestDataRow);

    tableBody.innerHTML = '';
    // Loop through the data and add rows and cells to the table
    rowData.forEach(row => {
        const tableRow = document.createElement('tr');

        row.forEach(cellData => {
            const cell = document.createElement('td');
            cell.textContent = cellData;
            tableRow.appendChild(cell);
        });

        tableBody.appendChild(tableRow);
    });
}


//Convert string format 'YYYYMMDDHHMMSS into standard date object in js'
function convertToDateStr(dateString) {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    const hour = dateString.slice(8, 10);
    const minute = dateString.slice(10, 12);
    const second = dateString.slice(12, 14);

    return "" + year + "/" + month + "/" + day + " " +
        hour + ":" + minute + ":" +second;
}

