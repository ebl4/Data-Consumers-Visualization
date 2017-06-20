//margin
var margin = {top: 10, right: 5, bottom: 40, left: 100},
   width = 450 - margin.left - margin.right,
   height = 300 - margin.top - margin.bottom;

var xGrafSTRecSol= d3.scale.ordinal()
   .range([0, width-100]);
   
var yGrafSTRecSol = d3.scale.linear()
   .range([height-10,0], 0);

var xAxisGrafSTRecSol = d3.svg.axis()
   .scale(xGrafSTRecSol)
   .orient("bottom");
   
var yAxisGrafSTRecSol = d3.svg.axis()
   .scale(yGrafSTRecSol)
   .orient("left")
	.tickSize(5)
   .tickPadding(3);

var color_scale = d3.scale.category10()
	.domain(d3.range(2));

var line = d3.svg.line()
	.x(function(d) {return xGrafSTRecSol(d.key);})
	.y(function(d) {return yGrafSTRecSol(d.values);})
	.interpolate("linear");
   
var svgGrafSTRecSol = d3.select("#svg-strecsol").append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   
function exibirGraficoSTRecSol() {

   removerGraficoSTRecSol();
   setDomainGraficoSTRecSol();

   //console.log(reclamacaoResolPorMes);

   svgGrafSTRecSol.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + (height-10) + ")")
      .style("font-size", "10px")
      .call(xAxisGrafSTRecSol);

   svgGrafSTRecSol.append("g")
      .attr("class", "yaxis")
      .style("font-size", "10px")
      .call(yAxisGrafSTRecSol); 

   svgGrafSTRecSol.append("g").append("path")
      .datum(reclamacaoPorMes)
      .attr("transform", "translate(20," + (0) + ")")
      .attr("class", "linha")
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);

   svgGrafSTRecSol.append("g").append("path")
      .datum(reclamacaoResolPorMes)
      .attr("transform", "translate(20," + (0) + ")")
      .attr("class", "linha")
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
	  
   svgGrafSTRecSol.append("text")
      .attr("transform", "translate(" + (width - 90) + "," + yGrafSTRecSol(reclamacaoPorMes[reclamacaoPorMes.length-1].values) + ")")
      .attr("class", "textoLegenda")
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .style("fill", "red")
      .text("Cadastradas")
      .style("font-size", "15px");
	  
   svgGrafSTRecSol.append("text")
      .attr("class", "textoLegenda")
      .attr("transform", "translate(" + (width - 90) + "," + yGrafSTRecSol(reclamacaoResolPorMes[reclamacaoResolPorMes.length-1].values) + ")")
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .style("fill", "green")
      .text("Resolvidas")
      .style("font-size", "15px");

	svgGrafSTRecSol.append("text") 
      .attr("class", "textoLegenda")
      .attr("x", 50 )
      .attr("y",  yGrafSTRecSol(0) + 30 )
      .style("text-anchor", "middle")
      .text("Mês de Abertura")
      .style("font-size", "12px")
      .style("font-weight","bold");;	  
		
   // text label for the y axis
	svgGrafSTRecSol.append("text")
      .attr("transform", "translate(-35, 130)" + "rotate(-90)")
      .style("text-anchor", "middle")
      .text("Total de Reclamações")
      .attr("class", "textoLegenda")
      .style("font-size", "12px")
      .style("font-weight","bold");	  

};

function type(d) {
  d.value = +d.value;
  return d;
}

function setDomainGraficoSTRecSol() {
   //xGrafSegmento.domain(d3.extent(reclamacaoPorSegmento, function(d) { return d.values; })).nice();  
   //yGrafSegmento.domain(reclamacaoPorSegmentoTopOrd.map(function(d) { return d.key; }));
   //xGrafSTRecSol.domain(reclamacaoPorMes.map(function(d) { return d.key; }));
   //yGrafSTRecSol.domain([0,d3.max(reclamacaoPorMes, function(d) { return d.values; })]).nice();
   console.log("setdomain")
   xGrafSTRecSol.domain(reclamacaoPorMes.map(function(d) { return d.key; }));
   yGrafSTRecSol.domain(d3.extent(reclamacaoPorMes, function(d) { return d.values; }));
  
}

function removerGraficoSTRecSol() {
   svgGrafSTRecSol.selectAll(".linha").remove();
   svgGrafSTRecSol.selectAll(".xaxis").remove();
   svgGrafSTRecSol.selectAll(".yaxis").remove();
   svgGrafSTRecSol.selectAll(".textoLegenda").remove();
}
