// var chartType = getParameterByName('chart');
const chartDiv = 'singleChart';




function createSingleChartOnHTML(chartType){
    chartNumberEachRow = 1;
    chartNumberEachColumn = 1;
    isSingleChart = true;
    cleanPreviousSixCharts();

    switch (chartType){
        case 'Temperature':
            generateSingleChart('\u6E29\u5EA6', '\u00B0C', 'scatter', chartDiv, 'Temperature'); // Using UTF-8 code for "温度, °C"
            break;
        case 'Humidity':
            generateSingleChart('\u6E7F\u5EA6', '\u0025', 'scatter', chartDiv, 'Humidity') // Using UTF-8 code for "湿度, %"
            break;
        case 'AtmosphericPressure':
            generateSingleChart('\u6C14\u538B', 'hPa', 'scatter', chartDiv, 'AtmosphericPressure') // Using UTF-8 code for "气压"
            break;
        case 'WindSpeed':
            generateSingleChart('\u98CE\u901F', 'm/s', 'scatter', chartDiv, 'WindSpeed') // Using UTF-8 code for "风速"
            break;
        case 'WindDirection':
            generateSingleChart('\u98CE\u5411', '\u00B0', 'scatter', chartDiv, 'WindDirection') // Using UTF-8 code for "风向"
            break;
        case 'Rainfall':
            generateSingleChart('\u964D\u6C34\u91CF', 'mm', 'bar', chartDiv, 'Rainfall') // Using UTF-8 code for "降水量"
            break;

        default:
            generateSingleChart('\u6E29\u5EA6(default)', '\u00B0C', 'scatter', chartDiv, 'Temperature') // Using UTF-8 code for "温度, °C"
    }
}


function cleanPreviousSixCharts(){
    clearSingleDiv('lineChart');
    clearSingleDiv('lineChart2');
    clearSingleDiv('lineChart3');
    clearSingleDiv('lineChart4');
    clearSingleDiv('lineChart5');
    clearSingleDiv('lineChart6');
}

function clearSingleDiv(divName){
    var div = document.getElementById(divName);
    div.innerHTML = "";
}