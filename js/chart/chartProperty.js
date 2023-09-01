//number of data point
var dataPointNumber = 12*12;

//lines' color in the chart, in the format of rgb()
const todayLineColor = 'rgb(255, 100, 0)';
const yesterdayLineColor = 'rgb(0, 100, 255)';

//The style properties for annotations marking maximum/minimum value for each line
const annotationStyle = {
    xref: 'x',
    yref: 'y',
    //x offset for annotation to dataPoint
    ax: 0,

    font: {
        family: 'Courier New, monospace',
        size: 16,
        color: '#ffffff'
    },

    //Whether show arrow to annotation
    showarrow: true,
    //Style of arrowhead
    arrowhead: 0,

    //Border style for annotation
    bordercolor: '#c7c7c7',
    borderwidth: 2,
    borderpad: 4,

    opacity: 0.8
}
// abs value for the y offset of annotation
const absAy = 40;

//The layout properties
// x axis tick interval (step) (millisecond)
const dtickValue = 4 * 60 * 60 * 1000;
const chartUniLayout = {
    xaxis: {
        title: '\u65F6\u95F4', // Using Unicode for "时间"
        type: 'date',
        dtick: dtickValue,
        tickformat: '%H:%M',
        // range: [new Date().setHours(0, 0, 0, 0), new Date().setHours(24, 0, 0, 0)],
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
}


const titleFont = {
    family: 'Arial, sans-serif', // Specify the font family
    size: 20, // Specify the font size for the title
    color: '#000000', // Specify the font color for the title
    bold: true // Make the y-axis title bold
}
