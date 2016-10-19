
<?php
require_once("./DAO.class.php");
$result = array() ;               //Création du tableau à envoyer
$result["status"] = "success";    //Initialisation du premier élément avec "sucess"
$data = $_POST["data"];
if(isset($data)){
  //$data = str_replace(" ", "_", $data);
  $requeteLivreNotice = "SELECT distinct titre,auteur,image,L.isbn FROM livre L, LIVREDEPOSE LD WHERE L.ISBN=LD.ISBN AND (L.titre LIKE \"%$data%\" OR L.auteur LIKE \"%$data%\")";
  $requeteLivreDepose = "SELECT distinct titre,auteur, image,L.isbn FROM livre L, LIVREDEPOSE LD WHERE L.ISBN not in (select li.isbn from livre li ,livredepose lid where li.isbn=lid.isbn) AND (L.titre LIKE \"%$data%\" OR L.auteur LIKE \"%$data%\")";
  $livres = $db->query($requeteLivreNotice); //Récupération des informations
  if ($livres) {
    $result["livres"] = array();
    foreach ($livres as $livreBD) {
      $livre = array();
      $livre["isbn"] = $livreBD["ISBN"];
      $livre["titre"] = $livreBD["TITRE"];
      $livre["auteur"] = $livreBD["AUTEUR"];
      $livre["image"] = $livreBD["IMAGE"];
      array_push($result["livres"], $livre); //Ajoute le livre créé à la liste de livres
    }
  }
  $livresdep = $db->query($requeteLivreDepose); //Récupération des informations
  if ($livresdep) {
    $result["livresdep"] = array();
    foreach ($livresdep as $livreBD) {
      $livredep = array();
      $livredep["isbn"] = $livreBD["ISBN"];
      $livredep["titre"] = $livreBD["TITRE"];
      $livredep["auteur"] = $livreBD["AUTEUR"];
      $livredep["image"] = $livreBD["IMAGE"];
      array_push($result["livresdep"], $livredep); //Ajoute le livre créé à la liste de livres
    }
  }
}
echo json_encode($result); //Encodage puis envoie.
?>
