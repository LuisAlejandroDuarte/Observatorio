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
                                        obs_epcc_acge (cca_epcc_codi,cca_acge_codi,cca_punt) 
                                        VALUES (:cca_epcc_codi,:cca_acge_codi,:cca_punt)');

            $cca_epcc_codi=json_decode($postdata,true)["cca_epcc_codi"];   
            $cca_acge_codi=json_decode($postdata,true)["cca_acge_codi"];  
            $cca_punt=json_decode($postdata,true)["cca_punt"];  
           

            $proc->bindValue(':cca_epcc_codi',$cca_epcc_codi); 
            $proc->bindValue(':cca_acge_codi',$cca_acge_codi); 
            $proc->bindValue(':cca_punt',$cca_punt);            
            
                       
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
        $cca_epcc_codi=json_decode($postdata,true)["cca_epcc_codi"];
        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('SELECT ACGE.acg_desc,ACGE.acg_codi
                                    FROM obs_epcc_acge AS EPCC INNER JOIN obs_acge AS ACGE ON
                                    EPCC.cca_acge_codi=ACGE.acg_codi  WHERE EPCC.cca_epcc_codi=' . $cca_epcc_codi);

      
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
