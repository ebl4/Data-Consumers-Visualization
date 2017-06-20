//margin
var margin = {top: 10, right: 5, bottom: 40, left: 100},
   width = 450 - margin.left - margin.right,
   height = 300 - margin.top - margin.bottom;

var xGrafSegmento= d3.scale.linear()
   .range([0, width-100]);

var yGrafSegmento = d3.scale.ordinal()
   .rangeRoundBands([0, height], 0.1);

var xAxisGrafSegmento = d3.svg.axis()
   .scale(xGrafSegmento)
   .ticks(4, "s")
   .orient("bottom");

var yAxisGrafSegmento = d3.svg.axis()
   .scale(yGrafSegmento)
   .orient("left")
   .tickSize(0)
   .tickPadding(5);

var svgGrafSegmento = d3.select("#svg-segmento").append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function exibirGraficoRecPorSegmento() {

   removerGraficoRecPorSegmento();
  
   setDomainGraficoRecPorSegmento();
  
   var barras = svgGrafSegmento.selectAll(".rect").data(reclamacaoPorSegmentoTopOrd);
  
   div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  
   barras.enter()
      .append("g")
      .append("rect")
      .attr("x", 0)
      .attr("class", "barras")
      .attr("y", function(d) { return yGrafSegmento(d.key); })
      .attr("width", function(d) { return Math.abs(xGrafSegmento(d.values) - xGrafSegmento(0)); })
      .attr("height", yGrafSegmento.rangeBand())
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
      .attr("x", function(d) { return Math.abs(xGrafSegmento(d.values) - xGrafSegmento(0)); })
      .attr("y", function(d) { return  yGrafSegmento(d.key)+ (yGrafSegmento.rangeBand()/2);} )
      .attr("dx", -5)
      .attr("dy", ".36em")
      .attr("text-anchor", "end")
      .style('fill', 'white')
      .style("font-size", "10px")
      .text(function(d){ return d.values; } );

   svgGrafSegmento.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .style("font-size", "10px")
      .call(xAxisGrafSegmento);

   svgGrafSegmento.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + xGrafSegmento(0) + ",0)")
      .style("font-size", "12px")
      .call(yAxisGrafSegmento); 

   svgGrafSegmento.append("g")
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

   svgGrafSegmento.append("text") 
      .attr("class", "textoLegenda")
      .attr("x", -34 )
      .attr("y",  0 )
      .style("text-anchor", "middle")
      .text("Segmento")
      .style("font-size", "12px")
      .style("font-weight","bold");
}

function setDomainGraficoRecPorSegmento() {
   xGrafSegmento.domain(d3.extent(reclamacaoPorSegmento, function(d) { return d.values; })).nice();  
   yGrafSegmento.domain(reclamacaoPorSegmentoTopOrd.map(function(d) { return d.key; }));
}

function removerGraficoRecPorSegmento() {
   svgGrafSegmento.selectAll(".barras").remove();
   svgGrafSegmento.selectAll(".axis").remove();
   svgGrafSegmento.selectAll(".label-score").remove();
   svgGrafSegmento.selectAll(".legend").remove();
}
