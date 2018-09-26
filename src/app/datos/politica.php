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
        $request = json_decode($postdata,true);
        
        $id=0;
        $accion='insert';
        $nombre=json_decode($postdata,true)["pgd_nomb"];
        $desc=json_decode($postdata,true)["pgd_desc"];
        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('CALL prPolitica(?,?,?,?)');

         $proc->bindParam(2, $id, PDO::PARAM_INT|PDO::PARAM_INPUT_OUTPUT, 12);
         $proc->bindParam(3, $nombre, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 200);
         $proc->bindParam(4, $desc, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 200);
         $proc->bindParam(1, $accion, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 200);
         $proc->execute();
         $resp = $proc->fetchAll();
         echo  json_encode($resp,true) ;

         $bd->conectar=null;
         $bd=null;      
    }

    private function select() {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata,true);
        
        $id=0;
        $accion='select';
        $nombre='';
        $desc='';
        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('CALL prPolitica(?,?,?,?)');

         $proc->bindParam(2, $id, PDO::PARAM_INT|PDO::PARAM_INPUT_OUTPUT, 12);
         $proc->bindParam(3, $nombre, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 200);
         $proc->bindParam(4, $desc, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 200);
         $proc->bindParam(1, $accion, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 200);
         $proc->execute();
         $resp = $proc->fetchAll();
         echo  json_encode($resp,true) ;

         $bd->conectar=null;
         $bd=null;      
    }


}
$api = new Api();  

$api->procesarLLamada();
