

var currentPage = 'SixCharts'

// Function to switch between pages in the iframe
function switchPages() {


    switch (currentPage) {
        case 'SixCharts':
            changeChart('Temperature');
            break;
        case 'Temperature':
            changeChart('Humidity');
            break;
        case 'Humidity':
            changeChart('AtmosphericPressure');
            break;
        case 'AtmosphericPressure':
            changeChart('WindSpeed');
            break;
        case 'WindSpeed':
            changeChart('WindDirection');
            break;
        case 'WindDirection':
            changeChart('Rainfall');
            break;
        case 'RainFall':
            changeChart('SixCharts');
            break;
        default:
            changeChart('SixCharts');
    }

}


function changeChart(chartName){
    if(chartName === 'SixCharts'){
        createSixChartsOnHTML();
    }else{
        createSingleChartOnHTML(chartName);
    }

    currentPage = chartName;
}




changeChart('SixCharts');
// Call the switchPages function repeatedly at the specified time interval
setInterval(switchPages, switchInterval);
