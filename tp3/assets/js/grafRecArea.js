//margin
var margin = {top: 10, right: 5, bottom: 40, left: 100},
   width = 450 - margin.left - margin.right,
   height = 300 - margin.top - margin.bottom;

var xGrafArea= d3.scale.linear()
   .range([0, width-100]);

var yGrafArea = d3.scale.ordinal()
   .rangeRoundBands([0, height], 0.1);

var xAxisGrafArea = d3.svg.axis()
   .scale(xGrafArea)
   .ticks(4, "s")
   .orient("bottom");

var yAxisGrafArea = d3.svg.axis()
   .scale(yGrafArea)
   .orient("left")
   .tickSize(0)
   .tickPadding(5);

var svgGrafArea = d3.select("#svg-area").append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function exibirGraficoRecPorArea() {
   
   removerGraficoRecPorArea();
  
   setDomainGraficoRecPorArea();
  
   var barras = svgGrafArea.selectAll(".rect").data(reclamacaoPorAreaTopOrd);
  
   div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  
   barras.enter()
      .append("g")
      .append("rect")
      .attr("x", 0)
      .attr("class", "barras")
      .attr("y", function(d) { return yGrafArea(d.key); })
      .attr("width", function(d) { return Math.abs(xGrafArea(d.values) - xGrafArea(0)); })
      .attr("height", yGrafArea.rangeBand())
      .style('fill', 'steelblue')
      .on("mouseover", function(d) {
         div.transition()
            .duration(200)
            .style("opacity", .9);
            div.html("<br />TESTEEEE: ") 
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
         })
      .on("mouseout", function(d) {
         div.transition()
            .duration(500)
            .style("opacity", 0);
         });

   barras
      .append("text")
      .attr("class", "label-score")
      .attr("x", function(d) { return Math.abs(xGrafArea(d.values) - xGrafArea(0)); })
      .attr("y", function(d) { return  yGrafArea(d.key)+ (yGrafArea.rangeBand()/2);} )
      .attr("dx", -5)
      .attr("dy", ".36em")
      .attr("text-anchor", "end")
      .style('fill', 'white')
      .style("font-size", "10px")
      .text(function(d){ return d.values; } );

   svgGrafArea.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .style("font-size", "10px")
      .call(xAxisGrafArea);
      
   svgGrafArea.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + xGrafArea(0) + ",0)")
      .style("font-size", "12px")
      .call(yAxisGrafArea); 
      
   svgGrafArea.append("g")
      .append("text")
      .attr("class", "legend")
      .attr("x", 0)
      .attr("y", height+30)
      .attr("dx", -5)
      .attr("dy", ".36em")
      .attr("text-anchor", "center")
      .style("font-size", 8)
      .style('fill', 'black')
      .text("Total de Reclamações")
      .style("font-size", "12px")
      .style("font-weight","bold");

   svgGrafArea.append("text") 
      .attr("class", "textoLegenda")
      .attr("x", -22 )
      .attr("y",  0 )
      .style("text-anchor", "middle")
      .text("Área")
      .style("font-size", "12px")
      .style("font-weight","bold");
}


function setDomainGraficoRecPorArea() {
  xGrafArea.domain(d3.extent(reclamacaoPorArea, function(d) { return d.values; })).nice();
  yGrafArea.domain(reclamacaoPorAreaTopOrd.map(function(d) { return d.key; }));
}

function removerGraficoRecPorArea() {
   svgGrafArea.selectAll(".barras").remove();
   svgGrafArea.selectAll(".axis").remove();
   svgGrafArea.selectAll(".label-score").remove();
   svgGrafArea.selectAll(".legend").remove();
}
