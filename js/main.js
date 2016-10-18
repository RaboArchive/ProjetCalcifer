$( document ).ready(function() {
    $("#content").load("./pages/accueil.html");
});

function launch(){
  var query = $("#query").val();
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
  $("#result").empty();
  for (var i=0; i < data.livres.length; i++) {
      var toPrint = "<div onclick=wantMore("+data.livres[i].idlivre+")> Nom :" + data.livres[i].nom + " | Auteur : " + data.livres[i].auteur;
      if(data.livres[i].etat != null){
        toPrint += " | Etat : " + data.livres[i].etat;
      }
      if(data.livres[i].val != null){
        toPrint += " | Valeur : " + data.livres[i].val;
      }
      $("#result").append(toPrint+"</div><br>");
	}
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
