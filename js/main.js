function launch(){
  var query = $("#srchFld").val();
  console.log(query);
  var data ='data=' + query;

  $.ajax({	type: "POST",
        url: "ajax/getRequete.php",
        data: data, // On passe les informations saisies à l'écran
        success: function(data, textStatus, jqXHR) {
          console.log(result);
          var result = JSON.parse(data) ;
          displayResultContent(result);
        },
        error: function() {
          alert('Erreur dans la requ�te au serveur.');
        }
  });
}

function displayResultContent(data){
  $("#content").empty();
  var toPrint = '<h4> Résultats de la recherche </h4> <ul class="thumbnails">';
  for (var i=0; i < data.livres.length; i++) {
	toPrint += '<li class="span3">';
  //    toPrint += "<div onclick=wantMore("+data.livres[i].idlivre+")> Nom :" + data.livres[i].nom + " | Auteur : " + data.livres[i].auteur;

	toPrint += '<div class="thumbnail">';
	toPrint += "<a href=\"product.html?id="+data.livres[i].idlivre+"\">";
	//toPrint += "<img src=\""+data.livres[i].url+"\" alt=\"\"/></a>";
	toPrint += "<img src=\"jambe.html\" alt=\"\"/></a>";
	toPrint += '<div class="caption">';
	toPrint += "<h5>"+data.livres[i].nom+"</h5>";
	toPrint += "<p>"+data.livres[i].resume+"</p>";

	toPrint += '<h4 style="text-align:center"><a class="btn" href="product.html?id='+data.livres[i].idlivre+'">';
	toPrint += '<i class="icon-zoom-in"></i></a> <a class="btn" href="#">Ajouter <i class="icon-shopping-cart"></i></a>';
	if(data.livres[i].val != null){
	toPrint += '<a class="btn btn-primary" href="#">'+data.livres[i].val+'</a></h4>';
	} else {
	toPrint +='</h4>';
	}

	toPrint += "</div></div></li>";
	
/*

      if(data.livres[i].etat != null){
        toPrint += " | Etat : " + data.livres[i].etat;
      }
      if(data.livres[i].val != null){
        toPrint += " | Valeur : " + data.livres[i].val;
      }
*/
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
}
