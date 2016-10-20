<?php
require_once("./DAO.class.php");

$id = $_GET["id"];

$requete = "SELECT * FROM user WHERE id=\"$id\";";
$resultat = $db->query($requete);
$resAssoc = $resultat->fetch(PDO::FETCH_ASSOC);

echo json_encode($resAssoc);
?>
