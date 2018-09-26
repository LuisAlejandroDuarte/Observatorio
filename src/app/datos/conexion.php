<?php
    $servidor='localhost';
    $basedatos ='basedatos';
    $user='root';
    $pass='root';


try {
      $con = new PDO('mysql:host='.$servidor.';dbname='.$basedatos, $user, $pass);
        print "Conexión exitosa!";
    }
catch (PDOException $e) {
   print "¡Error!: " . $e->getMessage() . "";
    die();
}






