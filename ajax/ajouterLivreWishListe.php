<?php
require_once("./DAO.class.php");
$result = array() ;               //Création du tableau à envoyer
$result["status"] = "success";    //Initialisation du premier élément avec "sucess"
//$data = $_POST["data"];
$data = array(
    "isbn" =>  $_POST["isbn"],
    "user" =>  $_POST["user"],
);
if(isset($data)){
  $requete = "Insert into livreSouhaite values ($data[isbn],$data[user]) ";
  $livres = $db->query($requete); //Récupération des informations
}
echo json_encode($result); //Encodage puis envoie.
?>
