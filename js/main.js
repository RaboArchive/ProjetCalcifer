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
  if ($.cookie("user")) {
    var val = JSON.parse($.cookie("user"));
    if (val.log) {
      idUser = val.id;
      loginUser = val.login;
      soldeUser = val.solde;
      loger = val.log;
      connect();
    }
  }
}

function connect() {
        $(".loger").css("display","inline-block");
        $(".nloger").css("display","none");

        var toPrint = '<li class="disloger">';
        toPrint += '<div id="disconnect"><h5>Bienvenue '+loginUser+' !</h5>';
        toPrint += '<p>Solde: '+soldeUser+' points</p>';
        toPrint += '</div></li>';
        toPrint += '<li id="disconnectButton" class="center-block"> <button class="btn btn-primary center-block" onclick="disconnect()">Déconnexion</button></li>';

        $("#topMenu").append(toPrint);
}

function disconnect() {
  $(".disloger").css("display","none");
  $("#disconnectButton").css("display","none");
  $(".nloger").css("display","inline-block");
  $(".loger").css("display","none");
  $.cookie("user", null);
  $.removeCookie("user");
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



function load_compte()
{
  $("#content").empty();
  $("#content").load("pages/compte.html");
}


function load_ajoutLivre() {
  $("#content").empty();
  $("#content").load("pages/depotlivre-form.html");
}
