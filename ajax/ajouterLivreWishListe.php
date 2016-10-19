<?php
require_once("./DAO.class.php");
$result = array() ;               //Création du tableau à envoyer
$result["status"] = "success";    //Initialisation du premier élément avec "sucess"
$data = $_POST["data"];
if(isset($data)){
  $requete = "Insert into livreSouhaite values ($data[ISBN],$data[USER]) ";  
  $livres = $db->query($requete); //Récupération des informations
}
echo json_encode($result); //Encodage puis envoie.
?>