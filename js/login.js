

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
            changeUI(result);
            //$('#form_login').attr("onsubmit", "return true;")
            //$('#form_login').submit();
          },
          error: function() {
            //$('#form_login').attr("onsubmit", "return true;")
            //$('#form_login').submit();
            alert("Pseudo ou mot de passe incorrect");
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
      console.log("Nope");
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
    $.post('../ajax/inscription.php', // Un script PHP que l'on va créer juste après
      {
        pseudo : $("#newpseudo").val(),  // Nous récupérons la valeur de nos input que l'on fait passer à connexion.php
        pass : $("#newpass").val(),
        mail : $("#newmail").val(),
        ville : $("#newville").val()
      },
      function(data){
        if(data == 'Success'){
          // Le membre est connecté. Ajoutons lui un message dans la page HTML.
          $(document).write("<p>Vous avez été connecté avec succès !</p>");
        }
        else{
          // Le membre n'a pas été connecté. (data vaut ici "failed")
          $(document).write("<p>Erreur lors de la connexion...</p>");
        }
      },
      'text'
    );
  }
