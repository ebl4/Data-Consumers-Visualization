var baseDados;

var reclamacaoPorMes, reclamacaoResolvPorMes, reclamacaoPorEstado, reclamacaoPorSegmento, reclamacaoPorArea, reclamacaoPorEmpresa;

var reclamacaoPorEstadoTopOrd, reclamacaoPorSegmentoTopOrd, reclamacaoPorAreaTopOrd, reclamacaoPorEmpresaTopOrd;
//var dadosFiltrados;



//dados filtrados por coluna
// var dadosFiltradosGraf1;
// var dadosFiltradosGraf2;
// var dadosFiltradosGraf3;
// var dadisFiltradosGrafFace;

// var dadosFiltradosByReclamcoes;
// var dadosFiltradosByResolvidas;

// //dados agrupados de acordo com o agrupamento do grafico
// var dadosByEmpresa;
// var dadosByArea;
// var dadosBySegmento;
// var dadosByNota;
// var dadosByEstado;

// //dados agrupados de acordo com o top show
// var dadosByEmpresaTopShow;
// var dadosByAreaTopShow;
// var dadosBySegmentoTopShow;
// var dadosByEstadoTopShow;
// var dadosByReclamacoes;
// var dadosByResolvidas;

// //variaveis dos rostos
// var total;
// var nota1,nota1Pocentagem;
// var nota2,nota2Porcentagem;
// var nota3,nota3Porcentagem;
// var nota4,nota4Porcentagem;
// var nota5,nota5Porcentagem;
// var media;
// var mediaGeral;


d3.csv("data/data.csv", function(data) {
   
   baseDados = data;

   // valores default para exibicao inicial dos dados
   filtroGeo = d3.select("#comboboxEstados").node().value; 
   filtroOrd = d3.select("#filtroOrd").node().value; 
   filtroTop = d3.select("#filtroQtd").node().value; 
  
   // filtra os dados com base nos valores default
   filtrarDadosGeo(filtroGeo);
   filtrarDadosOrdTop(filtroOrd, filtroTop);
  
   //show graphs
   exibirGraficoSTRecSol();
   exibirMapa();
   exibirGraficoRecPorSegmento();
   exibirGraficoRecPorArea();
   exibirGraficoRecPorEmpresa();
   
   //mostrarGraf2();
   //mostrarGraf3();
   //mostrarGrafFace();
   //mostrarGrafLinha();
    
});
 
function acaoFiltrarDados() {
   filtroGeo = d3.select("#comboboxEstados").node().value; 
   filtroOrd = d3.select("#filtroOrd").node().value; 
   filtroTop = d3.select("#filtroQtd").node().value; 
  
   filtrarDadosGeo(filtroGeo);
   filtrarDadosOrdTop(filtroOrd, filtroTop);
     
   //show graphs
   exibirGraficoSTRecSol();
   exibirMapa();
   exibirGraficoRecPorSegmento();
   exibirGraficoRecPorArea();
   exibirGraficoRecPorEmpresa();
} 

/* 
function filterDataButton() {
  

  filtro = d3.select("#comboboxEstados").node().value; 
  sort = d3.select("#filtroOrd").node().value; 
  showtop = d3.select("#filtroQtd").node().value; 
  
  //filtrando os dados
  filterDataCSV(filtro);
  sortData(sort,showtop);
  //show graphs
  //mostrarGraf1();
  //mostrarGraf2();
  //mostrarGraf3();
  //mostrarGrafFace();
  //mostrarGrafLinha();
  
}
*/

function filtrarDadosGeo(filtro)
{
   var dadosFiltrados = baseDados;
   
   // filtra dados por área geográfica
   if (filtro !== "BR") {
      dadosFiltrados = baseDados.filter(function(row) {
         return row['UF'] == filtro ;
      });
   } 
   
   reclamacaoPorMes = d3.nest()
      .key(function(d) { return d.MesAbertura; })
      .rollup(function(v) { return v.length; })
      .entries(baseDados);
   
   reclamacaoResolPorMes = d3.nest()
      .key(function(d) { if (d.AvaliacaoReclamacao == 'Resolvida') return d.MesAbertura; })
      .rollup(function(v) { return v.length; })
      .entries(baseDados);
   reclamacaoResolPorMes = reclamacaoResolPorMes.slice(0, reclamacaoResolPorMes.length-1); 
   
   reclamacaoPorMes.sort( function(x,y) {return x.key - y.key;});
   reclamacaoResolPorMes.sort( function(x,y) {return x.key - y.key;});
   filtro1 = reclamacaoPorMes.filter(function(d,i) { return i <= 12 })
   //console.log(filtro1);
   filtro2 = reclamacaoResolPorMes.filter(function(d,i) {return i <= 12 })
   //console.log(filtro2);
   
   reclamacaoPorEstado = d3.nest()
      .key(function(d) { var estado = d.UF; return ("br-"+estado.toLowerCase()); })
      .rollup(function(v) { return v.length; })
      .entries(dadosFiltrados);
      
   reclamacaoPorSegmento = d3.nest()
      .key(function(d) { return d.SegmentoSigla; })
      .rollup(function(v) { return v.length; })
      .entries(dadosFiltrados);
   
   reclamacaoPorArea = d3.nest()
      .key(function(d) { return d.AreaSigla; })
      .rollup(function(v) { return v.length; })
      .entries(dadosFiltrados);
   
   reclamacaoPorEmpresa = d3.nest()
      .key(function(d) { return d.NomeFantasia; })
      .rollup(function(v) { return v.length; })
      .entries(dadosFiltrados);
      
   
   
  //fazendo o filtro no arquivo
  /*
  if (filtro !== "TODOS")
  {
    
    //fazendo o filtro no arquivo
    
    dadosFiltradosGraf1 = dadosGlobais.filter(function(row) {
      return row['UF'] == filtro ;
    });

    dadosFiltradosGraf2 = dadosGlobais.filter(function(row) {
      return row['UF'] == filtro ;
    });

    dadosFiltradosGraf3 = dadosGlobais.filter(function(row) {
      return row['UF'] == filtro ;
    });

    dadisFiltradosGrafFace = dadosGlobais.filter(function(row) {
      return row['UF'] == filtro ;
    });

    dadosFiltradosByReclamcoes = dadosGlobais.filter(function(row) {
      return row['UF'] == filtro ;
    });

    dadosFiltradosByResolvidas = dadosGlobais.filter(function(row) {
      return row['UF'] == filtro ;
    });

    //armazena o total de reclamacoes agrupadas por empresa.
    dadosByEmpresa = d3.nest()
      .key(function(d) { return d.NomeFantasia; })
      .rollup(function(v) { return v.length; })
      .entries(dadosFiltradosGraf1);

    dadosByArea = d3.nest()
      .key(function(d) { return d.AreaSigla; })
      .rollup(function(v) { return v.length; })
      .entries(dadosFiltradosGraf2);

    dadosBySegmento = d3.nest()
      .key(function(d) { return d.SegmentoSigla; })
      .rollup(function(v) { return v.length; })
      .entries(dadosFiltradosGraf3);

    dadosByNota = d3.nest()
      .key(function(d) { return d.NotaConsumidor; })
      .rollup(function(v) { return v.length })
      .entries(dadisFiltradosGrafFace);

  
    dadosByReclamacoes = d3.nest()
      .key(function(d) { return d.MesAbertura; })
      .rollup(function(v) { return v.length; })
      .entries(dadosFiltradosByReclamcoes);
    
    dadosByResolvidas = d3.nest()
      .key(function(d) { if (d.AvaliacaoReclamacao == 'Resolvida') return d.MesAbertura; })
      .rollup(function(v) { return v.length; })
      .entries(dadosFiltradosByResolvidas);

      dadosByResolvidas = dadosByResolvidas.slice(0, dadosByResolvidas.length-1); 

  }
  else
  {
    //armazena o total de reclamacoes agrupadas por empresa.
    dadosByEmpresa = d3.nest()
      .key(function(d) { return d.NomeFantasia; })
      .rollup(function(v) { return v.length; })
      .entries(dadosGlobais);

    dadosByArea = d3.nest()
      .key(function(d) { return d.AreaSigla; })
      .rollup(function(v) { return v.length; })
      .entries(dadosGlobais);

    dadosBySegmento = d3.nest()
      .key(function(d) { return d.SegmentoSigla; })
      .rollup(function(v) { return v.length; })
      .entries(dadosGlobais);

    dadosByNota = d3.nest()
      .key(function(d) { return d.NotaConsumidor; })
      .rollup(function(v) { return v.length })
      .entries(dadosGlobais);

    dadosByReclamacoes = d3.nest()
      .key(function(d) { return d.MesAbertura; })
      .rollup(function(v) { return v.length; })
      .entries(dadosGlobais);
    
    dadosByResolvidas = d3.nest()
      .key(function(d) { if (d.AvaliacaoReclamacao == 'Resolvida') return d.MesAbertura; })
      .rollup(function(v) { return v.length; })
      .entries(dadosGlobais);

      dadosByResolvidas = dadosByResolvidas.slice(0, dadosByResolvidas.length-1); 
  }
  */
}



function filtrarDadosOrdTop(ord,showtop) {
   ordenarFiltrarTopRecPorRegiao(ord,showtop);
   ordenarFiltrarTopRecPorSegmento(ord,showtop);
   ordenarFiltrarTopRecPorArea(ord,showtop);
   ordenarFiltrarTopRecPorEmpresa(ord,showtop);
   
   //sortDataGraf2(sort,showtop);
   //sortDataGraf3(sort,showtop);
   //sortDataGrafLinha();
}

function ordenarFiltrarTopRecPorSegmento(ord,top) {
   reclamacaoPorSegmento.sort( function(x,y) {return d3.descending(x.values, y.values);});
   reclamacaoPorSegmentoTopOrd = reclamacaoPorSegmento.filter(function(d,i) { return i < +top })

   if (ord == "ordRecl") 
      reclamacaoPorSegmentoTopOrd.sort( function(x,y) {return d3.descending(x.values, y.values);});
   else
      reclamacaoPorSegmentoTopOrd.sort( function(x,y) {return d3.ascending(x.key, y.key); });
}

function ordenarFiltrarTopRecPorArea(ord,top) {
   reclamacaoPorArea.sort( function(x,y) {return d3.descending(x.values, y.values);});
   reclamacaoPorAreaTopOrd = reclamacaoPorArea.filter(function(d,i) { return i < +top })

   if (ord == "ordRecl") 
      reclamacaoPorAreaTopOrd.sort( function(x,y) {return d3.descending(x.values, y.values);});
   else
      reclamacaoPorAreaTopOrd.sort( function(x,y) {return d3.ascending(x.key, y.key); });
}

function ordenarFiltrarTopRecPorEmpresa(ord,top) {
   if (top > 25) top = 25;
   reclamacaoPorEmpresa.sort( function(x,y) {return d3.descending(x.values, y.values);});
   reclamacaoPorEmpresaTopOrd = reclamacaoPorEmpresa.filter(function(d,i) { return i < +top })

   if (ord == "ordRecl") 
      reclamacaoPorEmpresaTopOrd.sort( function(x,y) {return d3.descending(x.values, y.values);});
   else
      reclamacaoPorEmpresaTopOrd.sort( function(x,y) {return d3.ascending(x.key, y.key); });
}

function ordenarFiltrarTopRecPorRegiao(ord,top) {
   reclamacaoPorEstado.sort( function(x,y) {return d3.descending(x.values, y.values);});
   reclamacaoPorEstadoTopOrd = reclamacaoPorEstado.filter(function(d,i) { return i < +top })
}

/*
function sortDataGraf2(sort,showtop)
{
  
  //funcao para ordenar o agrupamento pelo total de reclamacoes
  dadosByArea.sort( function(x,y) {return d3.descending(x.values, y.values);});
  
  //funcao para filtrar apenas uma pequena quantidade
  dadosByAreaTopShow = dadosByArea.filter(function(d,i) { return i < +showtop })

  //ordenando os dados depois de filtrados por total ou nome da empresa
  if (sort == "total")
  {
    //funcao para ordenar
    dadosByAreaTopShow.sort( function(x,y) {return d3.descending(x.values, y.values);});
  }
  else
  {
    //funcao para ordenar
    dadosByAreaTopShow.sort( function(x,y) {return d3.ascending(x.key, y.key); });
  }

}
*/
/*
function sortDataGraf3(sort,showtop)
{
  
  //funcao para ordenar o agrupamento pelo total de reclamacoes
  dadosBySegmento.sort( function(x,y) {return d3.descending(x.values, y.values);});
  
  //funcao para filtrar apenas uma pequena quantidade
  dadosBySegmentoTopShow = dadosBySegmento.filter(function(d,i) { return i < +showtop })

  //ordenando os dados depois de filtrados por total ou nome da empresa
  if (sort == "total")
  {
    //funcao para ordenar
    dadosBySegmentoTopShow.sort( function(x,y) {return d3.descending(x.values, y.values);});
  }
  else
  {
    //funcao para ordenar
    dadosBySegmentoTopShow.sort( function(x,y) {return d3.ascending(x.key, y.key); });
  }

}
*/

/*
function sortDataGrafLinha() {
  reclamacaoPorMes.sort( function(x,y) {return x.key - y.key;});
  //dadosByResolvidas.sort( function(x,y) {return x.key - y.key;});
}
*/