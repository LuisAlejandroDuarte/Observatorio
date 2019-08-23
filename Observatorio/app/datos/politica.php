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
        $proc = $bd->conectar->prepare('INSERT INTO obs_pgdi (PGD_NOMB,PGD_DESC) VALUES (:pgd_nomb,:pgd_desc)');

            $nombre=json_decode($postdata,true)["pgd_nomb"];
            $desc=json_decode($postdata,true)["pgd_desc"];
            $proc->bindValue(':pgd_nomb',$nombre);
            $proc->bindValue(':pgd_desc',$desc);         
            $proc->execute();         

         $bd->conectar=null;
         $bd=null;      
    }

    private function select() {
        $postdata = file_get_contents("php://input");

        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('SELECT pgd_codi, pgd_nomb,pgd_desc FROM obs_pgdi');

      
        $proc->execute();
        $resp = $proc->fetchAll();
        echo  json_encode($resp,true) ;

         $bd->conectar=null;
         $bd=null;      
    }

    private function selectbyId() {
        $postdata = file_get_contents("php://input");
        $pgd_codi=json_decode($postdata,true)["pgd_codi"];
        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('SELECT pgd_codi, pgd_nomb,pgd_desc FROM obs_pgdi WHERE pgd_codi=' . $pgd_codi);

      
        $proc->execute();
        $resp = $proc->fetchAll();
        echo  json_encode($resp,true) ;

         $bd->conectar=null;
         $bd=null;      
    }

    private function update() {
        $postdata = file_get_contents("php://input");             
        $pgd_codi=json_decode($postdata,true)["pgd_codi"];
        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('UPDATE obs_pgdi SET pgd_nomb=:pgd_nomb ,PGD_DESC=:pgd_desc WHERE pgd_codi=' . $pgd_codi);  

            $nombre=json_decode($postdata,true)["pgd_nomb"];
            $desc=json_decode($postdata,true)["pgd_desc"];
            $proc->bindValue(':pgd_nomb',$nombre);
            $proc->bindValue(':pgd_desc',$desc);         
            $proc->execute();         

         $bd->conectar=null;
         $bd=null;      
    }
}
$api = new Api();  

$api->procesarLLamada();
