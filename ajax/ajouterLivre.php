<?php
require_once("./DAO.class.php");
$result = array() ;               //Création du tableau à envoyer
$result["status"] = "success";    //Initialisation du premier élément avec "sucess"

$USER = $_POST["ID"];
$ISBN = $_POST["ISBN"];
$TITRE = $_POST["TITRE"];
$ETAT = $_POST["ETAT"];
$PUB = $_POST["DATEPUB"];
$AUTEUR = $_POST["AUTEUR"];
$EDITION = $_POST["EDITION"];
$COLLECTION = $_POST["COLLECTION"];
$VALEUR = $_POST["VALEUR"];
$RESUME = $_POST["RESUME"];
$IMAGE = $_POST["URL"];

  $requeteInsDepose = "INSERT INTO livredepose VALUES ($ISBN,$USER,\"$ETAT\",date('now'));";
  echo $requeteInsDepose;
  $requeteInsLivre = "INSERT INTO livre VALUES ($ISBN,\"$TITRE\",\"$AUTEUR\",\"$EDITION\",\"$COLLECTION\",$VALEUR,\"$RESUME\",\"$IMAGE\");";
  echo $requeteInsLivre;

  $db->query($requeteInsLivre);
  $db->query($requeteInsDepose);

  echo json_encode($result);
?>
