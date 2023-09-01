const lineChartDiv = document.getElementById('lineChart');

// generateSixCharts();

function createSixChartsOnHTML(){
    chartNumberEachRow = 3;
    chartNumberEachColumn = 2;
    isSingleChart = false;
    cleanPreviousSingleChart();
    generateSingleChart('\u6E29\u5EA6', '\u00B0C', 'scatter', 'lineChart', 'Temperature') // Using UTF-8 code for "温度, °C"
    generateSingleChart('\u6E7F\u5EA6', '\u0025', 'scatter', 'lineChart2', 'Humidity') // Using UTF-8 code for "湿度, %"
    generateSingleChart('\u6C14\u538B', 'hPa', 'scatter', 'lineChart3', 'AtmosphericPressure') // Using UTF-8 code for "气压"
    generateSingleChart('\u98CE\u901F', 'km/h', 'scatter', 'lineChart4', 'WindSpeed') // Using UTF-8 code for "风速"
    generateSingleChart('\u98CE\u5411', '\u00B0', 'scatter', 'lineChart5', 'WindDirection') // Using UTF-8 code for "风向"
    generateSingleChart('\u964D\u6C34\u91CF', 'mm', 'bar', 'lineChart6', 'Rainfall') // Using UTF-8 code for "降水量"
}


function cleanPreviousSingleChart(){
    var div = document.getElementById('singleChart');
    div.innerHTML = "";
}

