var idUser;

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

$(document).ready(function () {
  $("#conf").keyup(checkPasswordMatch);
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
    $.post('ajax/connection.php', // Un script PHP que l'on va créer juste après
      {
        pseudo : $("#pseudo").val(),  // Nous récupérons la valeur de nos input que l'on fait passer à connexion.php
        pass : $("#pass").val()
      },
      function(data){
        console.log(data);
        if(data["status"] == 'success'){
          // Le membre est connecté. Ajoutons lui un message dans la page HTML.
          //console.log(data);
          alert("success");
          //$(document).write("<p>Vous avez été connecté avec succès !</p>");
        }
        else{
          // Le membre n'a pas été connecté. (data vaut ici "failed")
          //console.log(data);
          alert("failed");
          //$(document).write("<p>Erreur lors de la connexion...</p>");
        }
      },
      'text'
    );

    /*$.ajax({	type: "POST",
          url: "../ajax/connexion.php",
          data: data, // On passe les informations saisies à l'écran
          success: function(data) {
            console.log(JSON.parse(data));
            var result = JSON.parse(data) ;
            displayResultContent(result);
          },
          error: function() {
            alert('Erreur dans la requ�te au serveur.');
          }
    });*/
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
