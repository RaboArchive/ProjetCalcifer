<?php
require_once("../data/db/DAO.class.php");
//Verification de l'existence du pseudo et mdp :
if(isset($_POST["pseudo"])&&isset($POST["pass"])){
// Vérification des identifiants
$req = $db->prepare('SELECT id FROM user WHERE pseudo = :pseudo AND pass = :pass');
$req->execute(array(
    'pseudo' => $_POST["pseudo"],
    'pass' => $POST["pass"]));

$resultat = $req->fetch();

if ($resultat) {// si la requete réussie
     $result["status"]="success";
} else {
  $result["status"]="error";
  $result["errorMessage"] = "Erreur dans la requete $requete" ;
}
echo json_encode($result) ; //Encodage puis envoie.*/

}
?>
