<?php

if(isset($_POST["ID"]){

$id = $_POST["ID"];

$req = $bdd->prepare('SELECT * FROM USER WHERE ID=\"$id\"');

$req->execute(array(
    'login' => $_POST["LOGIN"],
    'mdp' => $_POST["MDP"],
    'solde'=> $_POST["SOLDE"],
    'mail' => $_POST["MAIL"],
    'ville'=> $_POST["VILLE"],
    'dateins'=> $_POST["DATEINS"]));



$resultat = $req->fetch();
if ($resultat) {// si la requete réussie
     $result["status"]="success";
} else {
  $result["status"]="error";
  $result["errorMessage"] = "Erreur dans la requete $requete" ;
}


}
else { // variables $_POST incorrectes
$result["status"]="error";
$result["errorMessage"] = "Erreur dans la requete : variables indéfinies" ;
}

echo json_encode($result) ;


}
?>
