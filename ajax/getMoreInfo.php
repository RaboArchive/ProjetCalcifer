<?php
require_once("./DAO.class.php");
$result = array() ;               //Création du tableau à envoyer
$result["status"] = "success";    //Initialisation du premier élément avec "sucess"
$data = $_POST["data"];
if(isset($data)){
  $requete = "SELECT * FROM livre WHERE ISBN=$data;"; //Préparation de la requête
  $livres = $db->query($requete); //Récupération des informations
  if ($livres) {
    $result["livres"] = array();
    foreach ($livres as $livreBD) {
      $livre = array();
      $livre["ISBN"] = $livreBD["ISBN"];
      $livre["titre"] = $livreBD["TITRE"];
      $livre["auteur"] = $livreBD["AUTEUR"];
      $livre["val"] = $livreBD["VALEUR"];//optionel    
      $livre["resume"] = $livreBD["RESUME"];//optionel
      $livre["image"] = $livreBD["IMAGE"];//optionel
      array_push($result["livres"], $livre); //Ajoute le livre créé à la liste de livres
    }
  }
}
echo json_encode($result); //Encodage puis envoie.
?>
