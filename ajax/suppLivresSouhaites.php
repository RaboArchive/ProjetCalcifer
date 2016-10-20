<?php
require_once("./DAO.class.php");
$result = array() ;               //Création du tableau à envoyer
$result["status"] = "success";    //Initialisation du premier élément avec "sucess"
$data =$_POST["isbn"];
$id = $_POST["id"];
if(isset($data) && isset($id)){
  $requete = "DELETE FROM LIVRESOUHAITE WHERE ISBN=\"$data\" AND IDUSER=\"$id\"";

  $requete = $db->query($requete); //Récupération des informations
}
 //Encodage puis envoie.
?>
