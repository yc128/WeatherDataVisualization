
var globalYMax = 1;


/**
 * This function generate single chart once the data processing complete, Which is if isDrawable is true.
 * Otherwise, it will keep waiting and attempting.
 * @param chartTitle
 * @param yUnit
 * @param chartType
 * @param chartDiv
 * @param dataId
 * @returns {Promise<unknown>}
 */
function generateSingleChart(chartTitle, yUnit, chartType, chartDiv, dataId){

    return new Promise((resolve) => {
        function tryToGenerate() {
            if (dbData !== undefined/*isDrawable*/) {
                rawData = dbData;
                sortDataByDate();
                const layout = layoutGenerator(chartTitle, yUnit);
                const data = dataGenerator(chartTitle, chartType, dataId);

                maxMinMark(layout, data);
                setAxisRange(layout, data);

                Plotly.newPlot(chartDiv, data, layout);

                resolve(); // Resolve the Promise to signal completion
            } else {
                setTimeout(tryToGenerate, 5); // Poll every
            }
        }

        tryToGenerate();
    });




}






/**
 * Generate data points for the chart
 * @param chartType
 * @returns {{}[]}
 */
function dataGenerator(chartTitle, chartType, dataId){
    var trace1 = {
        x: generateXDataPoint(dataId, true),
        y: generateYDataPoint(dataId, true),
        type: chartType,
        marker: { size: 4 },
        name: '\u4ECA\u65E5' // unicode for "今日"
    };
    var trace2 = {
        x: generateXDataPoint(dataId, false),
        y: generateYDataPoint(dataId, false),
        type: chartType,
        marker: { size: 4 },
        name: '\u6628\u65E5' // unicode for "昨日"
    };

    if(chartType == 'scatter'){
        trace1['mode'] = 'lines+markers';
        trace2['mode'] = 'lines+markers';
        trace1['line'] = {
            shape: 'linear',
            color: todayLineColor
        } // Line shape (linear in this case)
        trace2['line'] = {
            shape: 'linear',
            color: yesterdayLineColor
        } // Line shape (linear in this case)
        if(isSingleChart){
            trace1['line']['width'] = 4;
            trace2['line']['width'] = 4;
        }
    }


    return [trace2, trace1];
}


/**
 * Generate layout (titles, format) for the chart,
 * customizing with given chart title and y axis unit
 * @param chartTitle
 * @param yUnit
 * @returns {{xaxis: {tickformat: string, title: string, type: string}, title, yaxis: {title: string}}}
 */
function layoutGenerator(chartTitle, yUnit){
    const layout = {
        title: {
            text:chartTitle,
            font: titleFont
        },
        width: (window.innerWidth * 0.98)/chartNumberEachRow,
        height: (window.innerHeight * 0.83)/chartNumberEachColumn,
        yaxis: {
            title: chartTitle+' ('+yUnit+')'
        },
        ...chartUniLayout,
    }

    return layout;
}




/**
 * Mark out the maximum and minimum point of single line
 * @param layout
 * @param data
 */
function maxMinMark(layout, data){
    var traceCounter = 0;
    globalYMax = 0;
    data.forEach(function(trace) {
        var maxIndex = trace.y.indexOf(Math.max(...trace.y));
        var minIndex = trace.y.indexOf(Math.min(...trace.y));

        // Add annotations for maximum and minimum points
        if(layout['annotations'] == null){
            layout['annotations'] = [];

        }

        var annotationColor  = 'rgb(0,0,0)';
        if(traceCounter == 0){
            annotationColor = yesterdayLineColor;
        }else{
            annotationColor = todayLineColor;
        }

        if(trace.y[maxIndex] > globalYMax){
            globalYMax = trace.y[maxIndex];
        }


        layout['annotations'].push(
            //max
            {
                x: trace.x[maxIndex],
                y: trace.y[maxIndex],
                text: trace.y[maxIndex],
                bgcolor: annotationColor,
                ay: -absAy,
                ...annotationStyle
            },
            //min
            {
                x: trace.x[minIndex],
                y: trace.y[minIndex],
                text: trace.y[minIndex],
                bgcolor: annotationColor,
                ay: absAy,
                ...annotationStyle
            }
        );

        traceCounter++;

    });
}


function setAxisRange(layout, data){
   const currentDate = data[0].x[0];
   const startTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const endTime = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate());

    layout.xaxis.range = [startTime, endTime];
    // layout.yaxis.range = [0, globalYMax*1.2];

}

