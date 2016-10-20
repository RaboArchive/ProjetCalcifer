var idUser = "";
var loginUser = "";
var soldeUser = 0;
var loger = false;

$("document").ready(function () {
  init();
  $("#conf").keyup(checkPasswordMatch);
});

function init(){
  $("#sidebar").empty();

  initAccueil();

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

function initAccueil(){

  $.ajax({	type: "POST",
        url: "ajax/getSixRequete.php",
        success: function(data, textStatus, jqXHR) {
          var result = JSON.parse(data) ;
          displayLastDepot(result);
        },
        error: function() {
          alert('Erreur dans la requête au serveur.');
        }
  });
}

function connect() {
        $(".loger").css("display","inline-block");
        $(".nloger").css("display","none");
        $(".disloger").remove();
        $("#deco").remove();
        var toPrint = '<li class="disloger">';
        toPrint += '<div class="thumbnail disconnect" id="bla bla"><h5 id="bienvenue">Bienvenue '+loginUser+' !</h5>';
        toPrint += '<p id="soldeUser">Solde: '+soldeUser+' points</p>';
        toPrint += '</div></li>';
        toPrint += '<button class="btn btn-primary" id="deco" onclick="disconnect()">Déconnexion</button>';

        $("#topMenu").append(toPrint);
        initAccueil();
}

function maj_navBar(){
  $.ajax({
    url : 'ajax/getInfoUser.php?id='+idUser,
    type : 'GET',
    async : false,
    dataType : 'json',
    success : maj_user
  });
}

function maj_user(data){
  loginUser = data["LOGIN"];
  soldeUser = data["SOLDE"];
  $('#bienvenue').html('Bienvenue '+loginUser+' !');
  $("#soldeUser").html('Solde: '+soldeUser+' points');
  createCookie();
}

function disconnect() {
  $(".disloger").remove();
  $("#deco").remove();
  $(".nloger").css("display","inline-block");
  $(".loger").css("display","none");
  $.cookie("user", null);
  $.removeCookie("user");
  loger=false;
  $("#content").empty();
  initAccueil();
}


function displayLastDepot(data){ // Affiche les derniers livres deposés par défaut sur la page d'accueil
  $("#content").empty();
    var toPrint = '<h4> Derniers livres déposés </h4> <ul class="thumbnails">';
    for (var i=0; i < data.livres.length; i++) {
      //structure
      toPrint += '<li class="span3">';
      toPrint += '<div class="thumbnail">';
      //?
      toPrint += '<a onclick="wantMore('+data.livres[i].isbn+')">';

      toPrint += "<h5>"+data.livres[i].titre+"</h5>";
      toPrint += "<p>"+data.livres[i].auteur+"</p>";

      //l'image
      toPrint += "<img src=\""+data.livres[i].image+"\" alt=\"\"/></a>";

      toPrint += '<div class="caption">';
      //toPrint += "<span onclick=\"wantMore("+data.livres[i].idlivre+")\"><h5>"+data.livres[i].nom+"</h5></span>";

      if (loger){
        toPrint += '<h4 style="text-align:center"><a class="btn" onclick="infoDeposeur('+data.livres[i].isbn+')">';
        toPrint += '<i class="icon-zoom-in"></i></a>' ;
        toPrint += '<a class="btn" onclick="ajouterListeSouhait('+data.livres[i].isbn+')">Ajouter<i class="icon-shopping-cart"></i></a>';
      }

      toPrint +='</h4>';
    }
    toPrint += "</div></div></li>";

  $("#content").append(toPrint);
}
