<?php
require_once("./DAO.class.php");

$result = array() ;               //Création du tableau à envoyer
$result["status"] = "success";    //Initialisation du premier élément avec "sucess"

  // Vérification des identifiants
  $pseudo = $_POST["login"];
  $pass = $_POST["mdp"];
  $requete = "SELECT * FROM user WHERE login=\"$pseudo\";"; //Préparation de la requête
  $resultat = $db->query($requete); //Récupération des informations
  $tempRes = $resultat->fetch();
  if(strcmp($pass,$tempRes["MDP"]) == 0){
    $result["log"] = "true";
    $result["login"] = $pseudo;
    $result["id"] = $tempRes["ID"];
    $result["solde"] = $tempRes["SOLDE"];
  }else{
    $result["log"] = "false";
  }
  echo json_encode($result) ; //Encodage puis envoie.
?>
