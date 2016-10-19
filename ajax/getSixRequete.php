<?php
require_once("./DAO.class.php");

$result = array() ;               //Création du tableau à envoyer
$result["status"] = "success";    //Initialisation du premier élément avec "sucess"


$requete = "SELECT l.TITRE,l.AUTEUR,l.IMAGE, l.ISBN FROM livre l, LIVREDEPOSE d WHERE d.ISBN = l.ISBN ORDER BY DATEDEPOT LIMIT 6;"; //Préparation de la requête
$livres = $db->query($requete); //Récupération des informations
if ($livres) {
  $result["livres"] = array();
  foreach ($livres as $livreBD) {
    $livre = array();
    $livre["titre"] = $livreBD["TITRE"];
    $livre["auteur"] = $livreBD["AUTEUR"];
    $livre["image"] = $livreBD["IMAGE"];
    $livre["isbn"] = $livreBD["ISBN"];

    array_push($result["livres"], $livre); //Ajoute le livre créé à la liste de livres
  }
}

echo json_encode($result); //Encodage puis envoie.
?>
