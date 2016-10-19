<?php
require_once("./DAO.class.php");
$result = array() ;               //Création du tableau à envoyer
$result["status"] = "success";    //Initialisation du premier élément avec "sucess"
$data = $_POST["data"];
if(isset($data)){
  $requete = "Insert into livreSouhaite values ($data[ISBN],$data[titre],$data[auteur],$data[edition],$data[collection],$data[valeur],$data[resume],$data[image])";  
  $db->query($requete); //Récupération des informations
}
?>