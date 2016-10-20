function load_compte()
{
  $("#content").empty();
  $("#sidebar").empty();
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
  loginUser = data["LOGIN"];
  $(".editable > span").attr("onclick","edit_info(this)");
  $("#editable_password > span").attr("onclick","edit_info_password(this)");
}

function edit_info_password(e_button){
  var e_label = e_button.previousElementSibling.previousElementSibling;
  var e_input = e_button.previousElementSibling;
  e_label.innerHTML = "Ancien mot de passe";
  e_input.removeAttribute("readonly");
  e_input.value = '';
  e_input.focus();
  e_button.innerHTML = "";
  var text = '<div id="editable_new_password">'
  +'<label for="mon_compte_new_password" style="display:block;float:left;width:200px;text-align:right;margin-right:10px;">Nouveau mot de passe</label>'
  +'<input type="password" id="mon_compte_new_password">'
  +'<span name="MDP" style="color:blue;text-decoration:underline;cursor:pointer;" onclick="valider_info_password_step1(this)">Valider</span>'
  +'</div>';
  $("#editable_password").after(text);
}

function edit_info(e){
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

function valider_info_password_step1(e){
  e.previousElementSibling.setAttribute("readonly","true");
  $.ajax({
    url : 'ajax/getInfoUser.php?id='+idUser,
    type : 'GET',
    async : false,
    dataType : 'json',
    success : valider_info_password_step2
  });
}

function valider_info_password_step2(data){
  if (data["MDP"]==$("#mon_compte_password").val()){
    update_info(document.getElementById("mon_compte_new_password").nextElementSibling);
  }
  else {
    alert("Mot de passe incorrect");
    load_compte();
  }
}

function update_info(e){
  var data='id='+idUser+'&col='+e.getAttribute("name")+'&val='+e.previousElementSibling.value;
  $.ajax({
    url : 'ajax/setInfoUser.php',
    type : 'POST',
    data : data,
    async : false,
    success : load_info
  });
}

function load_info(){
  maj_navBar();
  load_compte();
}


function load_wishlist(){
  $("#content").empty();
  $("#sidebar").empty();
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
    var titre = ""+data.livres[i].titre;
    console.log(titre);

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

    toPrint += '<h4 style="text-align:center"><a class="btn" onclick="searchSouhait(\''+titre.toString()+'\')">';
    toPrint += '<i class="icon-zoom-in"></i></a>';

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

function searchSouhait(titre){
  console.log(titre);
  $("#srchFld").val(titre);
  lancerRecherche();
}


 function suppListeSouhait(isbn){
   var data = "isbn="+isbn+"&id="+idUser;
   console.log(data);
   $.ajax({	type: "POST",
         url: "ajax/suppLivresSouhaites.php",
         data: data, // On passe les informations saisies à l'écran
         success: function(data, textStatus, jqXHR) {
           load_wishlist();
         },
         error: function() {
           alert('Erreur dans la requete au serveur.');
         }
   });
 }
