var margin = {top: 10, right: 5, bottom: 40, left: 100},
    //width = 960 - margin.left - margin.right,
    width = 450 - margin.left - margin.right,
    //width = window.innerWidth/3,
    //height = 500 - margin.top - margin.bottom;
    height = 300 - margin.top - margin.bottom;


function exibirMapa()
{

var data = [
    ['br-sp', 0],
    ['br-ma', 0],
    ['br-pa', 0],
    ['br-sc', 0],
    ['br-ba', 0],
    ['br-ap', 0],
    ['br-ms', 0],
    ['br-mg', 0],
    ['br-go', 0],
    ['br-rs', 0],
    ['br-to', 0],
    ['br-pi', 0],
    ['br-al', 0],
    ['br-pb', 0],
    ['br-ce', 0],
    ['br-se', 0],
    ['br-rr', 0],
    ['br-pe', 0],
    ['br-pr', 0],
    ['br-es', 0],
    ['br-rj', 0],
    ['br-rn', 0],
    ['br-am', 0],
    ['br-mt', 0],
    ['br-df', 0],
    ['br-ac', 0],
    ['br-ro', 0]
];
   
for (var i = 0; i < reclamacaoPorEstadoTopOrd.length; i++) {
  	for (var j = 0; j < data.length; j++) {
      if (reclamacaoPorEstadoTopOrd[i].key == data[j][0]) {
         data[j][0] = reclamacaoPorEstadoTopOrd[i].key;
         data[j][1] = reclamacaoPorEstadoTopOrd[i].values;
      }
   }
}

// Create the chart
Highcharts.mapChart('svg-regiao', {
    chart: {
        map: 'countries/br/br-all'
    },

    title: {
        text: ''
    },
/*
    subtitle: {
        text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/br/br-all.js">Brazil</a>'
    },
*/
    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'top'
        }
    },

    colorAxis: {
        min: 0
    },

    series: [{
        data: data,
        name: 'Total de Reclamações',
        states: {
            hover: {
                color: '#BADA55'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        }
    }]
});

var t = d3.selectAll(".highcharts-root ")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
//  .append("g")
//  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//console.log(t)

}