var chartType = getParameterByName('chart');
var chartNumberEachRow = 1;
var isSingleChart = true;

switch (chartType){
    case 'Temperature':
        generateSingleChart('\u6E29\u5EA6', '\u00B0C', 'scatter', 'lineChart', 'Temperature'); // Using UTF-8 code for "温度, °C"
        break;
    case 'Humidity':
        generateSingleChart('\u6E7F\u5EA6', '\u0025', 'scatter', 'lineChart', 'Humidity') // Using UTF-8 code for "湿度, %"
        break;
    case 'AtmosphericPressure':
        generateSingleChart('\u6C14\u538B', 'hPa', 'scatter', 'lineChart', 'AtmosphericPressure') // Using UTF-8 code for "气压"
        break;
    case 'WindSpeed':
        generateSingleChart('\u98CE\u901F', 'm/s', 'scatter', 'lineChart', 'WindSpeed') // Using UTF-8 code for "风速"
        break;
    case 'WindDirection':
        generateSingleChart('\u98CE\u5411', '\u00B0', 'scatter', 'lineChart', 'WindDirection') // Using UTF-8 code for "风向"
        break;
    case 'Rainfall':
        generateSingleChart('\u964D\u6C34\u91CF', 'mm', 'bar', 'lineChart', 'Rainfall') // Using UTF-8 code for "降水量"
        break;

    default:
        generateSingleChart('\u6E29\u5EA6(default)', '\u00B0C', 'scatter', 'lineChart', 'Temperature') // Using UTF-8 code for "温度, °C"
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}