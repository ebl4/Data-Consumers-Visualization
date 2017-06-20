//margin
var margin = {top: 10, right: 5, bottom: 40, left: 100},
   width = 450 - margin.left - margin.right,
   height = 300 - margin.top - margin.bottom;

var xGrafEmpresa = d3.scale.linear()
   .range([0, width-100]);

var yGrafEmpresa = d3.scale.ordinal()
   .rangeRoundBands([0, height], 0.1);

var xAxisGrafEmpresa = d3.svg.axis()
   .scale(xGrafEmpresa)
   .ticks(4, "s")
   .orient("bottom");
    
var yAxisGrafEmpresa = d3.svg.axis()
   .scale(yGrafEmpresa)
   .orient("left")
   .tickSize(0)
   .tickPadding(5);
    
var svgGrafEmpresa = d3.select("#svg-empresa").append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function exibirGraficoRecPorEmpresa() {
   
   removerGraficoRecPorEmpresa();
  
   setDomainGraficoRecPorEmpresa();
  
   var barras = svgGrafEmpresa.selectAll(".rect").data(reclamacaoPorEmpresaTopOrd);
  
   div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  
   barras.enter()
      .append("g")
      .append("rect")
      .attr("x", 0)
      .attr("class", "barras")
      .attr("y", function(d) { return yGrafEmpresa(d.key); })
      .attr("width", function(d) { return Math.abs(xGrafEmpresa(d.values) - xGrafEmpresa(0)); })
      .attr("height", yGrafEmpresa.rangeBand())
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
      .attr("x", function(d) { return Math.abs(xGrafEmpresa(d.values) - xGrafEmpresa(0)); })
      .attr("y", function(d) { return  yGrafEmpresa(d.key)+ (yGrafEmpresa.rangeBand()/2);} )
      .attr("dx", -5)
      .attr("dy", ".36em")
      .attr("text-anchor", "end")
      .style('fill', 'white')
      .style("font-size", "10px")
      .text(function(d){ return d.values; } );

   svgGrafEmpresa.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .style("font-size", "10px")
      .call(xAxisGrafEmpresa);
      
   svgGrafEmpresa.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + xGrafEmpresa(0) + ",0)")
      .style("font-size", "12px")
      .call(yAxisGrafEmpresa); 
      
   svgGrafEmpresa.append("g")
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

   svgGrafEmpresa.append("text") 
      .attr("class", "textoLegenda")
      .attr("x", -32 )
      .attr("y",  0 )
      .style("text-anchor", "middle")
      .text("Empresa")
      .style("font-size", "12px")
      .style("font-weight","bold");
}


function setDomainGraficoRecPorEmpresa() {
   xGrafEmpresa.domain(d3.extent(reclamacaoPorEmpresa, function(d) { return d.values; })).nice();
   yGrafEmpresa.domain(reclamacaoPorEmpresaTopOrd.map(function(d) { return d.key; }));
}

function removerGraficoRecPorEmpresa() {
   svgGrafEmpresa.selectAll(".barras").remove();
   svgGrafEmpresa.selectAll(".axis").remove();
   svgGrafEmpresa.selectAll(".label-score").remove();
   svgGrafEmpresa.selectAll(".legend").remove();
}
