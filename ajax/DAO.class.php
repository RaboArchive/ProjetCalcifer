<?php
            $database = 'sqlite:../data/calcifer.db';
            try {
               $db = new PDO($database);
               if (!$db) {die ("Database error");}
            } catch (PDOException $e) {
                echo "Exception reçue : ",  $e->getMessage(), "\n";
            }
    ?>
