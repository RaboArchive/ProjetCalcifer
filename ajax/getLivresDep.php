<?php
require_once("./DAO.class.php");

$result = array() ;               //Création du tableau à envoyer
$result["status"] = "success";    //Initialisation du premier élément avec "sucess"
$data = $_POST["data"];

if(isset($data)){
  $requete = "SELECT L.ISBN, L.AUTEUR, L.TITRE, L.VALEUR, LP.ETAT, L.RESUME, L.IMAGE FROM LIVRE L, LIVREDEPOSE LP WHERE L.ISBN=LP.ISBN AND LP.IDUSER=$data"; //Préparation de la requête
  $livres = $db->query($requete); //Récupération des informations
  if ($livres) {
    $result["livres"] = array();
    foreach ($livres as $livreBD) {
      $livre = array();
      $livre["isbn"] = $livreBD["ISBN"];
      $livre["titre"] = $livreBD["TITRE"];
      $livre["auteur"] = $livreBD["AUTEUR"];
      $livre["val"] = $livreBD["VALEUR"];
      $livre["etat"] = $livreBD["ETAT"];
      $livre["resume"] = $livreBD["RESUME"];
      $livre["image"] = $livreBD["IMAGE"];
      array_push($result["livres"], $livre); //Ajoute le livre créé à la liste de livres
    }
  }
}
echo json_encode($result); //Encodage puis envoie.
?>
