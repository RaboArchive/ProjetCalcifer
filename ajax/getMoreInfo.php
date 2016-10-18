<?php
require_once("/var/www/html/ProjetCalcifer/ajax/DAO.class.php");

$result = array() ;               //Création du tableau à envoyer
$result["status"] = "success";    //Initialisation du premier élément avec "sucess"
$data = $_POST["data"];

if(isset($data)){
  $requete = "SELECT * FROM livre WHERE id=$data;"; //Préparation de la requête
  $livres = $db->query($requete); //Récupération des informations
  if ($livres) {
    $result["livres"] = array();
    foreach ($livres as $livreBD) {
      $livre = array();
      $livre["idlivre"] = $livreBD["ID"];
      $livre["nom"] = $livreBD["NOM"];
      $livre["auteur"] = $livreBD["AUTEUR"];
      $livre["val"] = $livreBD["VALEUR"];
      $livre["datepub"] = $livreBD["DATEPUB"];
      $livre["etat"] = $livreBD["ETAT"];
      $livre["resume"] = $livreBD["RESUME"];
      array_push($result["livres"], $livre); //Ajoute le livre créé à la liste de livres
    }
  }
}
echo json_encode($result); //Encodage puis envoie.
?>
