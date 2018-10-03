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
                                        obs_valo (ecc_enpc_codi,ecc_cate_codi,ecc_cali) 
                                        VALUES (:ecc_enpc_codi,:ecc_cate_codi,:ecc_cali)');

            $ecc_enpc_codi=json_decode($postdata,true)["ecc_enpc_codi"];   
            $ecc_cate_codi=json_decode($postdata,true)["ecc_cate_codi"];  
            $ecc_cali=json_decode($postdata,true)["ecc_cali"];  
           

            $proc->bindValue(':ecc_enpc_codi',$ecc_enpc_codi); 
            $proc->bindValue(':ecc_cate_codi',$ecc_cate_codi); 
            $proc->bindValue(':ecc_cali',date($ecc_cali));            
            
                       
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
        $ecc_enpc_codi=json_decode($postdata,true)["ecc_enpc_codi"];
        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('SELECT EPCC.ecc_codi,CATE.cat_desc,EPCC.ecc_cali
                                    FROM obs_epcc AS EPCC INNER JOIN obs_enpc AS ENPC ON
                                    EPCC.ecc_enpc_codi=ENPC.epc_codi INNER JOIN obs_cate AS CATE ON
                                    CATE.cat_codi=EPCC.ecc_cate_codi WHERE EPCC.ecc_enpc_codi=' . $ecc_enpc_codi);

      
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
