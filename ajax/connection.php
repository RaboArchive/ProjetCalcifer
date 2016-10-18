<?php
require_once("./DAO.class.php");
//Verification de l'existence du pseudo et mdp :
if(isset($_POST["pseudo"]) && isset($_POST["pass"])){
  // Vérification des identifiants
  /*$req = $db->prepare('SELECT id, login, solde FROM user WHERE pseudo = :pseudo AND pass = :pass');
  $req->execute(array(
      'pseudo' => $_POST["pseudo"],
      'pass' => $_POST["pass"]));

  $resultat = $req->fetch(PDO::FETCH_ASSOC);*/

  $pseudo = $_POST["pseudo"];
  $pass = $_POST["pass"];
  $requete = "SELECT id, login, solde FROM user WHERE pseudo=\"$pseudo\" AND pass=\"$pass\""; //Préparation de la requête
  $resultat = $db->query($requete); //Récupération des informations

  if ($resultat) {// si la requete réussie
      $result = array() ; //Création du tableau à envoyer
       //$result["status"]="success";
       array_push($result["status"], "success");
       //$result["id"]=$resultat["id"];
       //$result["login"]=$resultat["login"];
       //$result["solde"]=$resultat["solde"];
  } else {
    //$result["status"]="error";
    array_push($result["status"], "error");
    //$result["errorMessage"] = "Erreur dans la requete $requete" ;
  }
  //var_dump($result);
  echo json_encode($result) ; //Encodage puis envoie.*/

}
//else var_dump($result);
?>
