<?php
require_once("./DAO.class.php");

	// Vérification de la validité des informations
	if(isset($_POST["pseudo"]) && isset($_POST["pass"])){//les variables minimales

		$_POST["solde"]=15;

		if(!isset($_POST["mail"])){
			$_POST["mail"]="";
		}
		if(!isset($_POST["ville"])){
			$_POST["ville"]="";
		}

		// Insertion

		$req = $db->prepare('INSERT INTO user(LOGIN, MDP, SOLDE, MAIL,VILLE,DATEINS) VALUES(:pseudo, :pass,:solde, :email, :ville, DATE())');

		$req->execute(array(
		    'pseudo' => $_POST["pseudo"],
		    'pass' => $_POST["pass"],
		    'solde'=> $_POST["solde"],
		    'email' => $_POST["mail"],
		    'ville'=> $_POST["ville"]));



		//$resultat = $req->fetch();
		$result = array() ;
		$result["status"] = "success";

		if ($req) {// si la requete réussie
		     $result["status"]="success";
				 //$result["pseudo"]=$_POST["pseudo"];
				 //$result["pass"]=$POST["pass"];
		} else {
		  $result["status"]="error";
		  $result["errorMessage"] = "Erreur dans la requete" ;
		}


	}
	else { // variables $_POST incorrectes
		$result["status"]="error";
		$result["errorMessage"] = "Erreur dans la requete : variables indéfinies" ;
	}

	echo json_encode($result) ; //Encodage puis envoie.*/
?>
