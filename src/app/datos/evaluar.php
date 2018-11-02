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


    

    private function selectbyId() {
        $postdata = file_get_contents("php://input");
        $cca_codi=json_decode($postdata,true)["cca_codi"];
        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('SELECT v.val_desc,v.val_infe,
        v.val_supe from obs_epcc_acge AS E 
        INNER JOIN obs_valo AS v 
        ON V.VAL_ACGE_CODI=E.CCA_ACGE_CODI WHERE E.CCA_CODI=' . $cca_codi);

      
        $proc->execute();
        $resp = $proc->fetchAll();
        echo  json_encode($resp,true) ;

         $bd->conectar=null;
         $bd=null;      
    }

    
}
$api = new Api();  

$api->procesarLLamada();


