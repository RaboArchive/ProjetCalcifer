var idUser = "";
var loginUser = "";
var soldeUser = 0;
var loger = false;

$("document").ready(function () {
  init();
  $("#conf").keyup(checkPasswordMatch);
});

function init(){
  $.ajax({	type: "POST",
        url: "ajax/getSixRequete.php",
        success: function(data, textStatus, jqXHR) {
          var result = JSON.parse(data) ;
          displayLastDepot(result);
        },
        error: function() {
          alert('Erreur dans la requ�te au serveur.');
        }
  });
}

function launch(){
  var query = $("#srchFld").val();
  var data ='data=' + query;

  $.ajax({	type: "POST",
        url: "ajax/getRequete.php",
        data: data, // On passe les informations saisies à l'écran
        success: function(data, textStatus, jqXHR) {
          console.log(JSON.parse(data));
          var result = JSON.parse(data) ;
          displayResultContent(result);
        },
        error: function() {
          alert('Erreur dans la requ�te au serveur.');
        }
  });
}

function displayLastDepot(data){ // Affiche les derniers livres deposés par défaut sur la page d'accueil
  $("#content").empty();
    var toPrint = '<h4> Derniers livres ajoutés </h4> <ul class="thumbnails">';
    for (var i=0; i < data.livres.length; i++) {
      //structure
      toPrint += '<li class="span3">';
      toPrint += '<div class="thumbnail">';
      //?
      toPrint += "<a href=\"product.html?id="+data.livres[i].titre+"\">";

      toPrint += "<h5>"+data.livres[i].titre+"</h5>";
      toPrint += "<p>"+data.livres[i].auteur+"</p>";

      //l'image
      toPrint += "<img src=\""+data.livres[i].image+"\" alt=\"\"/></a>";

      toPrint += '<div class="caption">';
      //toPrint += "<span onclick=\"wantMore("+data.livres[i].idlivre+")\"><h5>"+data.livres[i].nom+"</h5></span>";


      toPrint += '<h4 style="text-align:center"><a class="btn" href="product.html?id='+data.livres[i].titre+'">';
      toPrint += '<i class="icon-zoom-in"></i></a> <a class="btn" href="#">Ajouter <i class="icon-shopping-cart"></i></a>';
      if(data.livres[i].val != null){
        toPrint += '<a class="btn btn-primary" href="#">'+data.livres[i].val+'</a></h4>';
      } else {
        toPrint +='</h4>';
    }

    toPrint += "</div></div></li>";

  }
  $("#content").append(toPrint);
}

function displayResultContent(data){
  $("#content").empty();
  var toPrint = '<h4> Résultats de la recherche </h4> <ul class="thumbnails">';
  for (var i=0; i < data.livres.length; i++) {
	toPrint += '<li class="span3">';
	toPrint += '<div class="thumbnail">';
	toPrint += "<a href=\"product.html?id="+data.livres[i].idlivre+"\">";
	//toPrint += "<img src=\""+data.livres[i].url+"\" alt=\"\"/></a>";
	toPrint += "<img src=\"jambe.html\" alt=\"\"/></a>";
	toPrint += '<div class="caption">';
	toPrint += "<span onclick=\"wantMore("+data.livres[i].idlivre+")\"><h5>"+data.livres[i].nom+"</h5></span>";
	toPrint += "<p>"+data.livres[i].resume+"</p>";

	toPrint += '<h4 style="text-align:center"><a class="btn" href="product.html?id='+data.livres[i].idlivre+'">';
	toPrint += '<i class="icon-zoom-in"></i></a> <a class="btn" href="#">Ajouter <i class="icon-shopping-cart"></i></a>';
	if(data.livres[i].val != null){
	toPrint += '<a class="btn btn-primary" href="#">'+data.livres[i].val+'</a></h4>';
	} else {
	toPrint +='</h4>';
	}

	toPrint += "</div></div></li>";

	}
	$("#content").append(toPrint);
}

function wantMore(id){
  var data ='data=' + id;

  $.ajax({	type: "POST",
        url: "ajax/getMoreInfo.php",
        data: data, // On passe les informations saisies à l'écran
        success: function(data, textStatus, jqXHR) {
          var result = JSON.parse(data) ;
          console.log(result);
          displayResultLatPanel(result);
        },
        error: function() {
          alert('Erreur dans la requ�te au serveur.');
        }
  });
}

function displayResultLatPanel(data){
  /*
  $("#lateralPanel").empty();
      var toPrint = "<div><h3> Détails : </h3> Nom :" + data.livres[0].nom + " | Auteur : " + data.livres[0].auteur;
      if(data.livres[0].etat != null){
        toPrint += " | Etat : " + data.livres[0].etat;
      }
      if(data.livres[0].val != null){
        toPrint += " | Valeur : " + data.livres[0].val;
      }
      if(data.livres[0].datepub != null){
        toPrint += " | Valeur : " + data.livres[0].val;
      }
      if(data.livres[0].resume != null){
        toPrint += " | Valeur : " + data.livres[0].resume;
      }
      toPrint += "<br><br><button onclick=addPanier()> Je veux ! </button>";
      $("#lateralPanel").append(toPrint+"</div><br>");
*/

    $("#sidebar").empty();
    //toPrint += "<img src=\""+data.livres[i].url+"\" alt=\"\"/></a>";
    var toPrint = '<h4>Résultat détaillé</h4>';
    toPrint +='<div class="thumbnail">';
    toPrint += '<div class="caption">';
    toPrint += '<h5>'+data.livres[0].nom+'</h5>';
    toPrint += '<h4>'+data.livres[0].auteur+'</h4>';
    toPrint += '<p>'+data.livres[0].resume+'</p>';

    toPrint += '</div></div>';

    $("#sidebar").append(toPrint);


}
