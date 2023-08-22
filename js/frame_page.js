var currentPage = 'SixCharts'

// Function to switch between pages in the iframe
function switchPages() {
    var currentSrc = document.getElementById('contentFrame').src;


    switch (currentPage) {
        case 'SixCharts':
            changeSingleChart('Temperature');
            break;
        case 'Temperature':
            changeSingleChart('Humidity');
            break;
        case 'Humidity':
            changeSingleChart('AtmosphericPressure');
            break;
        case 'AtmosphericPressure':
            changeSingleChart('WindSpeed');
            break;
        case 'WindSpeed':
            changeSingleChart('WindDirection');
            break;
        case 'WindDirection':
            changeSingleChart('Rainfall');
            break;
        default:
            document.getElementById('contentFrame').contentWindow.location.href = 'six_charts.html';
            currentPage = 'SixCharts';
    }

    var iframe = document.getElementById('contentFrame'); // Use the correct iframe ID
    iframe.addEventListener('load', function () {
        // Wait for the iframe's content to fully load
        sendDbData();
    });

}


function changeSingleChart(chartName){
    document.getElementById('contentFrame').contentWindow.location.href = ('single_chart.html?chart=' + chartName);
    currentPage = chartName;
}


// Set the time interval for switching (ms)
var switchInterval = 12000;

// Call the switchPages function repeatedly at the specified time interval
setInterval(switchPages, switchInterval);
