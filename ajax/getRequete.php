
<?php
require_once("./DAO.class.php");
$result = array() ;               //Création du tableau à envoyer
$result["status"] = "success";    //Initialisation du premier élément avec "sucess"
$data = $_POST["data"];
if(isset($data)){
  $data = str_replace(" ", "_", $data);
  $requete = "SELECT * FROM livre L, LIVREDEPOSE LD WHERE L.ISBN=LD.ISBN AND (L.titre=\"$data\" OR L.auteur=\"$data\")"; //Préparation de la requête
  $livres = $db->query($requete); //Récupération des informations
  if ($livres) {
    $result["livres"] = array();
    foreach ($livres as $livreBD) {
      $livre = array();
      $livre["idlivre"] = $livreBD["ISBN"];
      $livre["nom"] = $livreBD["TITRE"];
      $livre["auteur"] = $livreBD["AUTEUR"];
      $livre["val"] = $livreBD["VALEUR"];
      array_push($result["livres"], $livre); //Ajoute le livre créé à la liste de livres
    }
  }
}
echo json_encode($result); //Encodage puis envoie.
?>
