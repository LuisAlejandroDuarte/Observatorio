<?php

require_once('conexion.php');

header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');

class Api extends BaseDatos {

    function procesarLlamada() 
    {
        if (isset($_REQUEST['url'])) {            
           call_user_func(array($this, $_REQUEST['url']));          
        }
    }

    private function ingresar() {
        $postdata = file_get_contents("php://input");             
        
        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('INSERT INTO obs_enti (ent_nomb) VALUES (:ent_nomb)');

            $nombre=json_decode($postdata,true)["ent_nomb"];            
            $proc->bindValue(':ent_nomb',$nombre);            
            $proc->execute();         

         $bd->conectar=null;
         $bd=null;      
    }

    private function select() {
        $postdata = file_get_contents("php://input");

        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('SELECT ent_codi, ent_nomb FROM obs_enti');

      
        $proc->execute();
        $resp = $proc->fetchAll();
        echo  json_encode($resp,true) ;

         $bd->conectar=null;
         $bd=null;      
    }

    private function selectbyId() {
        $postdata = file_get_contents("php://input");
        $ent_codi=json_decode($postdata,true)["ent_codi"];
        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('SELECT ent_codi, ent_nomb FROM obs_enti WHERE ent_codi=' . $ent_codi);

      
        $proc->execute();
        $resp = $proc->fetchAll();
        echo  json_encode($resp,true) ;

         $bd->conectar=null;
         $bd=null;      
    }

    private function update() {
        $postdata = file_get_contents("php://input");             
        $ent_codi=json_decode($postdata,true)["ent_codi"];
        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('UPDATE obs_enti SET ent_nomb=:ent_nomb  WHERE ent_codi=' . $ent_codi);  

            $nombre=json_decode($postdata,true)["ent_nomb"];          
            $proc->bindValue(':ent_nomb',$nombre);            
            $proc->execute();         

         $bd->conectar=null;
         $bd=null;      
    }
}
$api = new Api();  

$api->procesarLLamada();
