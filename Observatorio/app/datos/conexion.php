<?php


class BaseDatos {



    public $conectar;
    public $servidor='localhost';
    public $basedatos ='grupogua_observatorio';
    public $user='grupogua_jmedicru';
    public $pass='MbCj199803#';
    public function Conectar() {

        try {

            $this->conectar = new PDO('mysql:host='.$this->servidor.';dbname='.$this->basedatos, $this->user, $this->pass);        
            $this->conectar->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          }
        catch (PDOException $e) {
         print "¡Error!: " . $e->getMessage() . "";
          die();
      }

    }
}

  









