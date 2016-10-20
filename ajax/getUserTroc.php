<?php
require_once("./DAO.class.php");
$result = array() ;               //Création du tableau à envoyer
$result["status"] = "success";    //Initialisation du premier élément avec "sucess"
$data = $_POST["isbn"];
if(isset($data)){
  $requete = "SELECT login, mail, ville FROM user u, livredepose l WHERE ISBN=\"$data\" and l.iduser=u.id"; //Préparation de la requête
  $users = $db->query($requete); //Récupération des informations

  if ($users) {
    $result["users"] = array();
    foreach ($users as $userBD) {
      $user = array();
      $user["login"] = $userBD["LOGIN"];
      $user["mail"] = $userBD["MAIL"];
      $user["ville"] = $userBD["VILLE"];

      array_push($result["users"], $user); //Ajoute le livre créé à la liste de livres
    }
  }
}
echo json_encode($result); //Encodage puis envoie.
?>
