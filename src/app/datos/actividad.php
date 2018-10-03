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
        $proc = $bd->conectar->prepare('INSERT INTO obs_acge (acg_desc,acg_crca) VALUES (:acg_desc,:acg_crca)');

            $nombre=json_decode($postdata,true)["acg_desc"];    
            $acg_crca=json_decode($postdata,true)["acg_crca"];    
            
            $proc->bindValue(':acg_desc',$nombre);            
            $proc->bindValue(':acg_crca',$acg_crca);
            $proc->execute();         

         $bd->conectar=null;
         $bd=null;      
    }

    private function select() {
        $postdata = file_get_contents("php://input");

        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('SELECT acg_codi, acg_desc,acg_crca FROM obs_acge');

      
        $proc->execute();
        $resp = $proc->fetchAll();
        echo  json_encode($resp,true) ;

         $bd->conectar=null;
         $bd=null;      
    }

    private function selectbyId() {
        $postdata = file_get_contents("php://input");
        $acg_codi=json_decode($postdata,true)["acg_codi"];
        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('SELECT acg_codi, acg_desc,acg_crca FROM obs_acge WHERE acg_codi=' . $acg_codi);

      
        $proc->execute();
        $resp = $proc->fetchAll();
        echo  json_encode($resp,true) ;

         $bd->conectar=null;
         $bd=null;      
    }

    private function update() {
        $postdata = file_get_contents("php://input");             
        $acg_codi=json_decode($postdata,true)["acg_codi"];
        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('UPDATE obs_acge SET acg_desc=:acg_desc,acg_crca=:acg_crca  WHERE acg_codi=' . $acg_codi);  

            $nombre=json_decode($postdata,true)["acg_desc"];          
            $acg_crca=json_decode($postdata,true)["acg_crca"];    
            $proc->bindValue(':acg_desc',$nombre);            
            $proc->bindValue(':acg_crca',$acg_crca);            
            $proc->execute();         

         $bd->conectar=null;
         $bd=null;      
    }
}
$api = new Api();  

$api->procesarLLamada();
