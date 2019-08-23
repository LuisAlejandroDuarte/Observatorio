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
                                        obs_enpc (epc_enpg_codi,epc_comp_codi,epc_cali) 
                                        VALUES (:epc_enpg_codi,:epc_comp_codi,:epc_cali)');

            $epc_enpg_codi=json_decode($postdata,true)["epc_enpg_codi"];   
            $epc_comp_codi=json_decode($postdata,true)["epc_comp_codi"];  
            $epc_cali=json_decode($postdata,true)["epc_cali"];  
           

            $proc->bindValue(':epc_enpg_codi',$epc_enpg_codi); 
            $proc->bindValue(':epc_comp_codi',$epc_comp_codi); 
            $proc->bindValue(':epc_cali',date($epc_cali));            
            
                       
            $proc->execute();         

         $bd->conectar=null;
         $bd=null;      
    }

    private function select() {
        $postdata = file_get_contents("php://input");

        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('SELECT EPC.epc_codi,C.com_desc,EPC.epc_cali
                                        FROM obs_enpc AS EPC INNER JOIN obs_enpg AS EP ON
                                        EPC.epc_enpg_codi=EP.epg_codi INNER JOIN obs_comp AS C ON
                                        C.com_codi=EPC.epc_comp_codi');

      
        $proc->execute();
        $resp = $proc->fetchAll();
        echo  json_encode($resp,true) ;

         $bd->conectar=null;
         $bd=null;      
    }

    private function selectbyId() {
        $postdata = file_get_contents("php://input");
        $epc_enpg_codi=json_decode($postdata,true)["epc_enpg_codi"];
        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('SELECT EPC.epc_codi,C.com_desc,EPC.epc_cali
                                    FROM obs_enpc AS EPC INNER JOIN obs_enpg AS EP ON
                                    EPC.epc_enpg_codi=EP.epg_codi INNER JOIN obs_comp AS C ON
                                    C.com_codi=EPC.epc_comp_codi WHERE EPC.epc_enpg_codi=' . $epc_enpg_codi);

      
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
