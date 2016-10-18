<?php

if(isset($_POST["TITRE"]) && isset($_POST["AUTEUR"]) && isset($_POST["ID"]))
{//les variables minimales
  if(!isset($_POST["VALEUR"]))
  {
    $_POST["VALEUR"]="10";
  }
  if(!isset($_POST["DATEPUB"]))
  {
    $_POST["DATEPUB"]="";
  }
  if(!isset($_POST["ETAT"]))
  {
    $_POST["ETAT"]="Moyen";
  }
  if(!isset($_POST["RESUME"]))
  {
    $_POST["RESUME"]="";
  }
  // Insertion

  $req = $bdd->prepare('INSERT INTO LIVRE(NOM, AUTEUR, VALEUR, DATEPUB,ETAT,RESUME) VALUES(:nom, :auteur,:valeur, :datepub, :etat, :resume');

  $req->execute(array(
      'nom' => $_POST["TITRE"],
      'auteur' => $_POST["AUTEUR"],
      'valeur'=> $_POST["VALEUR"],
      'datepub' => $_POST["DATEPUB"],
      'etat'=> $_POST["ETAT"],
      'resume'=> $_POST["RESUME"]));



  $resultat = $req->fetch();
  if ($resultat) {// si la requete réussie
       $result["status"]="success";
  } else {
    $result["status"]="error";
    $result["errorMessage"] = "Erreur dans la requete $requete" ;
  }


}
else { // variables $_POST incorrectes
  $result["status"]="error";
  $result["errorMessage"] = "Erreur dans la requete : variables indéfinies" ;
}

echo json_encode($result) ;

 ?>
