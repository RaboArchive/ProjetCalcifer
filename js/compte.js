function load_compte()
{
  $("#content").empty();
  $("#content").load("pages/compte.html",function(){
    document.getElementById("pseudo").value = "BLANC DE POULET";
    document.getElementById("newemail").value = "SAUCE BLANCHE";
    document.getElementById("newville").value = "MOULE FRITE";

  });

}
function on_load(){
  var temp = "Tête de bite";
  $("#niketamere").val();
  var x = document.getElementById("content");


}
function on_load_js()
{
  document.getElementById("niketamere").value("WALLAH");

}

function load_wishlist(){
  $("#content").empty();
  var query = idUser;
  var data ='data=' + query;

  $.ajax({	type: "POST",
        url: "ajax/getLivresSouhaites.php",
        data: data, // On passe les informations saisies à l'écran
        success: function(data, textStatus, jqXHR) {
          console.log(JSON.parse(data));
          var result = JSON.parse(data) ;
          displayListeSouhait(result);
        },
        error: function() {
          alert('Erreur dans la requete au serveur.');
        }
  });
}

function displayListeSouhait(data){
  var toPrint = '<h4> Vos livres souhaités </h4> <ul class="thumbnails">';
  for (var i=0; i < data.livres.length; i++) {
    //structure
    toPrint += '<li class="span3">';
    toPrint += '<div class="thumbnail">';
    //?
    toPrint += "<a href=\"product.html?id="+data.livres[i].titre+"\">";
    // titre
    toPrint += "<h5>"+data.livres[i].titre+"</h5>";
    // auteur
    toPrint += "<p>"+data.livres[i].auteur+"</p>";
    // l'image
    toPrint += "<img src=\""+data.livres[i].image+"\" alt=\"\"/></a>";

    toPrint += '<div class="caption">';

    toPrint += '<h4 style="text-align:center"><a class="btn" href="product.html?id='+data.livres[i].titre+'">';
    toPrint += '<i class="icon-zoom-in"></i></a>';
    if(data.livres[i].val != null){
      toPrint += '<a class="btn btn-primary" href="#">'+data.livres[i].val+'</a></h4>';
    } else {
      toPrint +='</h4>';
    }
  toPrint += "</div></div></li>";
  }
  $("#content").append(toPrint);
}
