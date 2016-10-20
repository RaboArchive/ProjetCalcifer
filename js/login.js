// Toggle Function
$('.toggle').click(function(){
  // Switches the Icon
  $(this).children('i').toggleClass('fa-pencil');
  // Switches the forms
  $('.form').animate({
    height: "toggle",
    'padding-top': 'toggle',
    'padding-bottom': 'toggle',
    opacity: "toggle"
  }, "slow");
});

function checkPasswordMatch() {
    var password = $("#newpass").val();
    var confirmPassword = $("#conf").val();

    if (password != confirmPassword)
        $("#divCheckPasswordMatch").html("Passwords do not match!");
    else
        $("#divCheckPasswordMatch").html("Passwords match.");
}

function login(){
    var login = $("#pseudo").val();
    var mdp = $("#pass").val();
    //console.log(login);
    var data = "login="+login+"&mdp="+mdp;
    $.ajax({	type: "POST",
          url: "ajax/connection.php",
          async : false,
          data: data, // On passe les informations saisies à l'écran
          success: function(data, textStatus, jqXHR) {
            console.log(JSON.parse(data));
            var result = JSON.parse(data) ;
            $("#newLogin").modal('hide');
            changeUI(result);
            //$('#form_login').attr("onsubmit", "return true;")
            //$('#form_login').submit();
          },
          error: function() {

          }
    });
  }

  function changeUI(data){
    if(data.log == "true"){
      loger=true;
      idUser=data.id;
      loginUser=data.login;
      soldeUser=parseInt(data.solde);
      if($('#rememberme').is(":checked")){
        createCookie();
      }
        connect();
        console.log("Oui");
    }else{
      loger=false;
      alert("Pseudo ou mot de passe incorrect");
    }
  }

  function createCookie(){
    var user = {
      log : loger,
      id : idUser,
      login : loginUser,
      solde : soldeUser
    };
    $.cookie("user",JSON.stringify(user),{expires:1000});
  }


function signup(){

    var pseudo = $("#newpseudo").val();
    var pass = $("#newpass").val();
    var mail = $("#newmail").val();
    var ville = $("#newville").val();
    //console.log(login);
    var data = "pseudo="+pseudo+"&pass="+pass+"&mail="+mail+"&ville="+ville;
    $.ajax({	type: "POST",
          url: "ajax/inscription.php",
          async : false,
          data: data, // On passe les informations saisies à l'écran
          success: function(data, textStatus, jqXHR) {
            console.log(JSON.parse(data));
            var result = JSON.parse(data) ;
            $("#newLogin").modal('hide');
            if (result.status=="success"){
              alert("Inscription réussi");
              $("#clickLogin").click();
              setTimeout(function(){
                  $("#styloID").click();
              }, 250);


            }
            else alert(result.errorMessage);
            //changeUI(result);
          },
          error: function() {
              alert("Erreur interne du serveur");
          }
    });

  }
