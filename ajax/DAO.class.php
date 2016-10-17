<?php
            $database = 'sqlite:/var/www/html/NvBooker/data/BDD/Book';
            try {
               $db = new PDO($database);
               if (!$db) {die ("Database error");}
            } catch (PDOException $e) {
                echo "Exception reçue : ",  $e->getMessage(), "\n";
            }
    ?>
