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
        $proc = $bd->conectar->prepare('SELECT  E.cca_codi, v.val_desc,v.val_infe, E.cca_punt, E.CCA_ACGE_CODI,
        v.val_supe from obs_epcc_acge AS E 
        INNER JOIN obs_valo AS v 
        ON V.VAL_ACGE_CODI=E.CCA_ACGE_CODI WHERE E.CCA_CODI=' . $cca_codi);

      
        $proc->execute();
        $resp = $proc->fetchAll();
        echo  json_encode($resp,true) ;

         $bd->conectar=null;
         $bd=null;      
    }

    private function selectbyPuntaje() {
        $postdata = file_get_contents("php://input");
        $cca_codi=json_decode($postdata,true)["cca_codi"];
        $cca_acge_codi=json_decode($postdata,true)["cca_acge_codi"];
        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('SELECT  E.cca_codi, E.cca_punt
        from obs_epcc_acge AS E 
        WHERE E.cca_codi=' . $cca_codi . ' AND E.CCA_ACGE_CODI=' . $cca_acge_codi);

      
        $proc->execute();
        $resp = $proc->fetchAll();
        echo  json_encode($resp,true) ;

         $bd->conectar=null;
         $bd=null;      
    }

    private function update() {
        $postdata = file_get_contents("php://input");             
        $cca_codi=json_decode($postdata,true)["cca_codi"];
        $cca_acge_codi=json_decode($postdata,true)["cca_acge_codi"];
      
        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('UPDATE obs_epcc_acge SET cca_punt=:cca_punt  WHERE cca_codi=' . $cca_codi . ' AND cca_acge_codi=' . $cca_acge_codi );  
            $cca_punt=json_decode($postdata,true)["cca_punt"];          
            $proc->bindValue(':cca_punt',$cca_punt);             
            $proc->execute();         

            $proc = $bd->conectar->prepare('SELECT  E.CCA_EPCC_CODI
            from obs_epcc_acge AS E 
            WHERE E.cca_codi=' . $cca_codi . ' AND E.CCA_ACGE_CODI=' . $cca_acge_codi);  
           $proc->execute(); 
           $rows2 = $proc->fetchAll();    
           $cca_epcc_codi=$rows2[0]["CCA_EPCC_CODI"];
           //echo  json_encode($rows2[0]["CCA_EPCC_CODI"],true) ;

           $proc = $bd->conectar->prepare('SELECT  avg(E.CCA_PUNT) AS Puntaje
            from obs_epcc_acge AS E 
            WHERE E.CCA_EPCC_CODI=' . $rows2[0]["CCA_EPCC_CODI"] );  

            $proc->execute(); 
            $rows2 = $proc->fetchAll();              
            
            $proc = $bd->conectar->prepare('UPDATE  obs_epcc SET ecc_cali=' .  $rows2[0]["Puntaje"] . ' WHERE ecc_codi=' .  $cca_epcc_codi);
            $proc->execute(); 

            $proc = $bd->conectar->prepare('SELECT  E.ECC_ENPC_CODI
            from obs_epcc AS E 
            WHERE E.ECC_CODI=' . $cca_epcc_codi);  
                            
            $proc->execute(); 
            $rows2 = $proc->fetchAll();    

            $ecc_enpc_codi = $rows2[0]["ECC_ENPC_CODI"];

            $proc = $bd->conectar->prepare('SELECT  avg(E.ecc_cali) As Puntaje
            from obs_epcc AS E 
            WHERE E.ECC_ENPC_CODI=' .  $rows2[0]["ECC_ENPC_CODI"]);  

            $proc->execute(); 
            $rows2 = $proc->fetchAll(); 
             
            $proc = $bd->conectar->prepare('UPDATE  obs_enpc SET epc_cali=' .  $rows2[0]["Puntaje"] . ' WHERE epc_codi=' . $ecc_enpc_codi);
            $proc->execute(); 

            

         $bd->conectar=null;
         $bd=null;      
    }


    
}
$api = new Api();  

$api->procesarLLamada();


