function load_livresdep() {
  $("#content").empty();
  $('#content').load('pages/livresDep.html',livreDepInit) ;
}

function livreDepInit() {
  var data = "data="+idUser;
  $.ajax({	type: "POST",
        url: "ajax/getLivresDep.php",
        data: data,
        success: function(data, textStatus, jqXHR) {
          var result = JSON.parse(data) ;
          afficheLivresDep(result);
        },
        error: function() {
          alert('Erreur dans la requ�te au serveur.');
        }
  });
}


function afficheLivresDep(result) {
    var toPrint= "";
  for (var i=0; i < result.livres.length; i++) {
    //structure
    toPrint += '<li class="span3">';
    toPrint += '<div class="thumbnail">';
    //?
    toPrint += '<a onclick="wantMore('+result.livres[i].isbn+')">';

    toPrint += "<h5>"+result.livres[i].titre+"</h5>";
    toPrint += "<p>"+result.livres[i].auteur+"</p>";

    //l'image
    toPrint += "<img src=\""+result.livres[i].image+"\" alt=\"\"/></a>";

    toPrint += '<div class="caption">';

    toPrint += '<h4 style="text-align:center"><a class="btn" href="product.html?id='+result.livres[i].isbn+'">';
    toPrint += '<i class="icon-zoom-in"></i></a>';
    toPrint += '<a id="supp" class="btn" onclick="suppLivresDeposes('+result.livres[i].isbn+')"><i class="icon-trash"></i></a></h4>';
/*
    if(result.livres[i].val != null){
      toPrint += '<a class="btn btn-primary" href="#">'+result.livres[i].val+'</a></h4>';
    } else {
      toPrint +='</h4>';
    }
    */
    toPrint += "</div></div></li>";

  }

  $("#content").append(toPrint);
}

function suppLivresDeposes(isbn){
  var data = "isbn="+isbn+"&id="+idUser;
  console.log(data);
  $.ajax({	type: "POST",
        url: "ajax/suppLivresDeposes.php",
        data: data, // On passe les informations saisies à l'écran
        success: function(data, textStatus, jqXHR) {
          load_livresdep();
        },
        error: function() {
          alert('Erreur dans la requete au serveur.');
        }
  });
}
