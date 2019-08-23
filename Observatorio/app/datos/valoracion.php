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
        $proc = $bd->conectar->prepare('INSERT INTO 
                                        obs_valo (val_acge_codi,val_infe,val_supe,val_desc) 
                                        VALUES (:val_acge_codi,:val_infe,:val_supe,:val_desc)');

            $val_acge_codi=json_decode($postdata,true)["val_acge_codi"];   
            $val_infe=json_decode($postdata,true)["val_infe"];  
            $val_supe=json_decode($postdata,true)["val_supe"];  
            $val_desc=json_decode($postdata,true)["val_desc"];  

            $proc->bindValue(':val_acge_codi',$val_acge_codi); 
            $proc->bindValue(':val_infe',$val_infe); 
            $proc->bindValue(':val_supe',$val_supe);
            $proc->bindValue(':val_desc',$val_desc);            
            
                       
            $proc->execute();         

         $bd->conectar=null;
         $bd=null;      
    }

    // private function select() {
    //     $postdata = file_get_contents("php://input");

    //     $bd = new BaseDatos();
    //     $bd->Conectar();
    //     $proc = $bd->conectar->prepare('SELECT EPC.epc_codi,C.com_desc,EPC.epc_cali
    //                                     FROM obs_enpc AS EPC INNER JOIN obs_enpg AS EP ON
    //                                     EPC.epc_enpg_codi=EP.epg_codi INNER JOIN obs_comp AS C ON
    //                                     C.com_codi=EPC.epc_comp_codi');

      
    //     $proc->execute();
    //     $resp = $proc->fetchAll();
    //     echo  json_encode($resp,true) ;

    //      $bd->conectar=null;
    //      $bd=null;      
    // }

    private function selectbyId() {
        $postdata = file_get_contents("php://input");
        $val_acge_codi=json_decode($postdata,true)["val_acge_codi"];
        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('SELECT VAL.val_cons, VAL.val_desc,VAL.val_infe,VAL.val_supe
                                    FROM obs_valo AS VAL INNER JOIN obs_acge AS ACG ON
                                    ACG.acg_codi=VAL.val_acge_codi  WHERE VAL.val_acge_codi=' . $val_acge_codi);

      
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
