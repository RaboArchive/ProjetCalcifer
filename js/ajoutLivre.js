function verifLivre() {
  var data= $("#ISBN").val();
  $.ajax({	type: "POST",
        url: "ajax/getLivreParISBN.php",
        success: function(data, textStatus, jqXHR) {
          var result = JSON.parse(data) ;
          creerOuAjouter(result);
        },
        error: function() {
          alert('Erreur dans la requ�te au serveur.');
        }
  });
}

function creerOuAjouter(result) {

  if (result) {
    $("#addLivreButton").css("display","none");
    $("#verifLivre").append('<input id=etat required type="text" placeholder="Etat"/>');

    var toPrint = '<h4>Livre à ajouter</h4>';
    toPrint += '<div class="thumbnail">';
    toPrint += '<div class="caption">';
    toPrint += '<img src="'+result.livre.image+'"></img>';
    toPrint += '<h5>'+result.livre.titre+'</h5>';
    toPrint += '<h4>'+result.livre.auteur+'</h4>';
    toPrint += '<p>'+result.livre.resume+'</p>';
    toPrint += '<button onClick="ajouterLivre">Confirmer</button>';
    toPrint += '</div></div>';

    $("verifLivre").append(toPrint);
  } else {
    $("#creerLivre").css("display","inline-block");
  }
}

function ajouterLivre() {
  var data["ISBN"] = $("#ISBN").val();
  data["ETAT"] = $("#etat").val();
  data["USER"] = idUser;
  $.ajax({	type: "POST",
        url: "ajax/deposeLivre.php",
        success: function(data, textStatus, jqXHR) {
          $(".deposeLivre").append('<span><p>Livre ajouté</p></span>');
        },
        error: function() {
          alert('Erreur dans la requ�te au serveur.');
        }
  });
}

function creerLivre() {
  var data={
    ISBN:$("#ISBN").val();
    titre:$("#titre").val();
    auteur:$("#auteur").val();
    valeur:$("#valeur").val();
    datepub:$("#datepub").val();
    edition:$("#edition").val();
    collection:$("collection").val();
    etat:$("#etat").val();
    resume:$("#resume").val();
  }

  $.ajax({	type: "POST",
        url: "ajax/getSixRequete.php",
        success: function(data, textStatus, jqXHR) {
          $(".deposeLivre").append('<span><p>Livre ajouté</p></span>');
        },
        error: function() {
          alert('Erreur dans la requ�te au serveur.');
        }
  });
}
