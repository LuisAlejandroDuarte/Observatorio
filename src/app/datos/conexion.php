<?php


class BaseDatos {

    public $conectar;
    public $servidor='localhost';
    public $basedatos ='basedatos';
    public $user='root';
    public $pass='';
    public function Conectar() {

        try {
            $this->conectar = new PDO('mysql:host='.$this->servidor.';dbname='.$this->basedatos, $this->user, $this->pass);        
          }
        catch (PDOException $e) {
         print "¡Error!: " . $e->getMessage() . "";
          die();
      }

    }
}

  









