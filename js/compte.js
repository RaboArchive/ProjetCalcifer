function load_compte()
{
  $("#content").empty();
  $("#content").load("pages/compte.html", function(){
      $.ajax({
    		url : 'ajax/getInfoUser.php?id='+idUser,
    		type : 'GET',
    		//async : false, //Demander à M. Brouard
    		dataType : 'json',
    		success : load_compte_infos
    	});
  });
}

function load_compte_infos(data){
  $("#mon_compte_pseudo").val(data["LOGIN"]);
  $("#mon_compte_mail").val(data["MAIL"]);
  $("#mon_compte_password").val(data["MDP"]);
  $("#mon_compte_ville").val(data["VILLE"]);
  $(".editable > span").attr("onclick","edit_info(this)");
}

function edit_info(e){
  console.log(e.previousElementSibling);
  e.previousElementSibling.removeAttribute("readonly");
  e.previousElementSibling.focus();
  e.innerHTML = "Valider";
  e.setAttribute("onclick","valider_info(this)");
}

function valider_info(e){
  e.previousElementSibling.setAttribute("readonly","true");
  update_info(e);
  e.innerHTML = "Modifier";
  e.setAttribute("onclick","edit_info(this)");
}

function update_info(e){
  var data='id='+idUser+'&col='+e.getAttribute("name")+'&val='+e.previousElementSibling.value;
  $.ajax({
    url : 'ajax/setInfoUser.php',
    type : 'POST',
    data : data,
    async : false,
    //dataType : 'json',
    success : load_compte
  });
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
    var id = data.livres[i].isbn;
    //structure
    toPrint += '<li class="span3">';
    toPrint += '<div class="thumbnail">';
    //?
    toPrint += '<a onclick="wantMore('+data.livres[i].isbn+')">';
    // titre
    toPrint += "<h5>"+data.livres[i].titre+"</h5>";
    // auteur
    toPrint += "<p>"+data.livres[i].auteur+"</p>";
    // l'image
    toPrint += "<img src=\""+data.livres[i].image+"\" alt=\"\"/></a>";

    toPrint += '<div class="caption">';

    toPrint += '<h4 style="text-align:center"><a class="btn" href="product.html?id='+data.livres[i].titre+'">';
    toPrint += '<i class="icon-zoom-in"></i></a>';
    console.log(data.livres[i]);
    toPrint += '<a class="btn" id="supp" onclick="suppListeSouhait('+data.livres[i].isbn+')"><i class="icon-trash"></i></a>';
    if(data.livres[i].val != null){
      toPrint += '<a class="btn btn-primary" href="#">'+data.livres[i].val+'</a></h4>';
    } else {
      toPrint +='</h4>';
    }
  toPrint += "</div></div></li>";
  }
  $("#content").append(toPrint);
}
 function suppListeSouhait(button){
   alert(button);
 }
