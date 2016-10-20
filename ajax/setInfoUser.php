<?php
require_once("./DAO.class.php");

$id = $_POST["id"];
$col = $_POST["col"];
$val = $_POST["val"];

$requete = "UPDATE USER SET $col='$val' WHERE id=$id;";
$resultat = $db->query($requete);

?>
