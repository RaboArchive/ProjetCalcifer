<?php
require_once("./DAO.class.php");
$result = array() ;               //Création du tableau à envoyer
$result["status"] = "success";    //Initialisation du premier élément avec "sucess"
$ISBN = $_POST["ISBN"];
$USER = $_POST["USER"];
$ETAT = $_POST["ETAT"];
if(isset($data)){
  $requete = "Insert into livreDepose values ($ISBN,$USER,$ETAT,NOW())";
  $livres = $db->query($requete); //Récupération des informations
}
?>
