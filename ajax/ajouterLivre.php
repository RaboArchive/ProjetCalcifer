<?php
require_once("./DAO.class.php");
$result = array() ;               //Création du tableau à envoyer
$result["status"] = "success";    //Initialisation du premier élément avec "sucess"
$data1 = $_POST["data"];

$data=json_decode($data1);

$ISBN = $data.ISBN;
$TITRE = $data.titre;
$AUTEUR = $data.auteur;
$EDITION = $data.edition;
$COLLECTION = $data.collection;
$VALEUR = $data.valeur;
$RESUME = $data.resume;
$IMAGE = $data.image;

if(isset($data)){
  $requete = "Insert into livreSouhaite values ($ISBN,$TITRE,$AUTEUR,$EDITION,$COLLECTION,$VALEUR,$RESUME,$IMAGE)";
  $db->query($requete); //Récupération des informations
}
?>
