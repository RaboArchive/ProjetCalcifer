<?php

	// Vérification de la validité des informations
	if(isset($_POST["pseudo"]) && isset($_POST["pass_hash"])){//les variables minimales

		$_POST["SOLDE"]=15;

		if(!isset($_POST["MAIL"])){
			$_POST["MAIL"]="";
		}
		if(!isset($_POST["VILLE"])){
			$_POST["VILLE"]="";
		}

		// Insertion

		$req = $bdd->prepare('INSERT INTO user(LOGIN, MDP, SOLDE, MAIL,VILLE,DATEINS) VALUES(:pseudo, :pass,:solde, :email, :ville, CURDATE())');

		$req->execute(array(
		    'pseudo' => $_POST["pseudo"],
		    'pass' => $_POST["pass_hash"],
		    'solde'=> $_POST["SOLDE"],
		    'email' => $_POST["MAIL"],
		    'ville'=> $_POST["VILLE"],
		    'solde'=> $_POST["SOLDE"]));



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

	echo json_encode($result) ; //Encodage puis envoie.*/
?>
