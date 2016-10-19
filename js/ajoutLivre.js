function verifLivre() {
  var data= "ISBN="+$("#ISBN").val();
  console.log(data);
  $.ajax({	type: "POST",
        url: "ajax/getLivreParISBN.php",
        data : data,
        success: function(data, textStatus, jqXHR) {
          console.log(data);
          var result = JSON.parse(data) ;
          creerOuAjouter(result);
        },
        error: function() {
          alert('Erreur dans la requ�te au serveur.');
        }
  });
}

function creerOuAjouter(result) {

  if (result.livre) {
    $("#addLivreButton").css("display","none");
    //$("#verifLivre").append('<input id=etat required type="text" placeholder="Etat"/>');

    var toPrint = '<h4>Livre à ajouter</h4>';
    toPrint += '<div class="thumbnail">';
    toPrint += '<div class="caption">';
    toPrint += '<img src="'+result.livre.image+'"></img>';
    toPrint += '<h3>'+result.livre.titre+'</h3>';
    toPrint += '<h4>'+result.livre.auteur+'</h4>';
    toPrint += '<p>'+result.livre.resume+'</p>';
    toPrint += '<input id=etat type="text" placeholder="Etat"/></br>';
    toPrint += '<button onClick="ajouterLivre()">Confirmer</button>';
    toPrint += '</div></div>';

    $("#verifLivre").append(toPrint);
  } else {
    $("#creerLivre").css("display","inline-block");
  }
}

function ajouterLivre() {
  var data ="ISBN="+$("#ISBN").val()+"&ETAT="+$("#etat").val()+"&USER="+idUser;
  $.ajax({	type: "POST",
        url: "ajax/deposerLivre.php",
        data : data,
        success: function(data, textStatus, jqXHR) {
          $(".form").append('<span><p>Livre ajouté</p></span>');
        },
        error: function() {
          alert('Erreur dans la requ�te au serveur.');
        }
  });
}

function creerLivre() {

  var data ="ISBN="+$("#ISBN").val()+"&ETAT="+$("#etat").val()+"&TITRE="+$("#titre").val()+"&AUTEUR="+$("#auteur").val()+"&VALEUR="+$("#valeur").val()+"&DATEPUB="+$("#datepub").val();
  data +="&EDITION="+$("#edition").val()+"&COLLECTION="+$("#collection").val();
  data +="&RESUME="+$("#resume").val();

  console.log(data);
  $.ajax({	type: "POST",
        url: "ajax/ajouterLivre.php",
        data : data,
        success: function(data, textStatus, jqXHR) {
          $(".deposeLivre").append('<span><p>Livre ajouté</p></span>');
        },
        error: function() {
          alert('Erreur dans la requ�te au serveur.');
        }
  });
}
