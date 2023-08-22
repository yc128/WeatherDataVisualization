

function generateXDataPoint(chartTitle, isToday){
    switch (chartTitle) {
        case 'Rainfall':
            return generateXDataPointForHourRainfall(chartTitle, isToday);
            break;

        default:
            return generateXDataPointForLineChart(chartTitle, isToday);
    }
}

function generateYDataPoint(chartTitle, isToday){
    switch (chartTitle) {
        case 'Rainfall':
            return generateYDataPointForHourRainfall(chartTitle, isToday);

        case 'AtmosphericPressure':
        case 'Temperature':
            return generateYDataPointForLineChart(chartTitle, isToday).map(element => element / 10);

        default:
            return generateYDataPointForLineChart(chartTitle, isToday);
    }
}



function generateXDataPointForLineChart(chartTitle, isToday){
    let xData = [];

    let targetData = dataForYesterday;
    if(isToday){
        targetData = dataForToday;
    }

    if(targetData.length !== 0){
        targetData.forEach(singleData =>{
            let dateObj = convertToDateObj(singleData[DATE_TIME_COLUMN]);
            if(isToday){
                dateObj.setDate(dateObj.getDate()-1);
            }
            xData.push(dateObj);
        })
    }

    return xData;
}

function generateYDataPointForLineChart(chartTitle, isToday){
    let yData = [];

    const columnName = chartNameColumnNameDict[chartTitle];
    let targetData = dataForYesterday;
    if(isToday){
        targetData = dataForToday;
    }

    if(targetData.length !== 0){
        targetData.forEach(singleData =>{
            yData.push(parseInt(singleData[columnName]));
        })
    }

    return yData;

}

/**
 * Only keeps hour data in bar char.
 * @param chartTitle
 * @param isToday
 * @returns {*[]}
 */
function generateXDataPointForHourRainfall(chartTitle, isToday){
    let xData = [];

    let targetData = dataForYesterday;
    if(isToday){
        targetData = dataForToday;
    }

    if(targetData.length !== 0){
        let dateSet = new Set();
        targetData.forEach(singleData =>{
            let dateObj = convertToDateObj(singleData[DATE_TIME_COLUMN]);
            if(isToday){
                dateObj.setDate(dateObj.getDate()-1);
            }
            dateObj.setMinutes(0);
            dateObj.setSeconds(0);

            if(!dateSet.has(dateObj.getTime())){
                dateSet.add(dateObj.getTime());
                xData.push(dateObj);
            }
        })
    }

    return xData;
}


function generateYDataPointForHourRainfall(chartTitle, isToday){
    let yData = [];

    const columnName = chartNameColumnNameDict[chartTitle];
    let targetData = dataForYesterday;
    if(isToday){
        targetData = dataForToday;
    }

    if(targetData.length !== 0){
        let dateSet = new Set();
        targetData.forEach(singleData =>{
            let dateObj = convertToDateObj(singleData[DATE_TIME_COLUMN]);
            if(isToday){
                dateObj.setDate(dateObj.getDate()-1);
            }
            dateObj.setMinutes(0);
            dateObj.setSeconds(0);
            if(!dateSet.has(dateObj.getTime())){
                dateSet.add(dateObj.getTime());
                yData.push(parseInt(singleData[columnName]));
            }else{
                yData[yData.length-1] = Math.max(yData[yData.length-1],
                    parseInt(singleData[columnName]));

            }


        })
    }

    return yData;

}



