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
                                        obs_enpg (epg_enti_codi,epg_pgdi_codi,epg_fini,epg_ffin,epg_punt) 
                                        VALUES (:epg_enti_codi,:epg_pgdi_codi,:epg_fini,:epg_ffin,:epg_punt)');

            $epg_enti_codi=json_decode($postdata,true)["epg_enti_codi"];   
            $epg_pgdi_codi=json_decode($postdata,true)["epg_pgdi_codi"];  
            $epg_fini=json_decode($postdata,true)["epg_fini"];  
            $epg_ffin=json_decode($postdata,true)["epg_ffin"];  
            $epg_punt=json_decode($postdata,true)["epg_punt"];  

            $proc->bindValue(':epg_enti_codi',$epg_enti_codi); 
            $proc->bindValue(':epg_pgdi_codi',$epg_pgdi_codi); 
            $proc->bindValue(':epg_fini',date($epg_fini)); 
            $proc->bindValue(':epg_ffin',date($epg_ffin)); 
            $proc->bindValue(':epg_punt',$epg_punt); 
            
                       
            $proc->execute();         

         $bd->conectar=null;
         $bd=null;      
    }

    private function select() {
        $postdata = file_get_contents("php://input");

        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('SELECT E.ent_codi,E.ent_nomb,P.pgd_codi,P.pgd_nomb,
                                        EP.epg_fini,EP.epg_ffin,EP.epg_punt
                                        FROM obs_enti AS E INNER JOIN obs_enpg AS EP ON
                                        E.ENT_CODI=EP.epg_enti_codi INNER JOIN obs_pgdi AS P ON 
                                        P.pgd_codi=EP.epg_pgdi_codi ');

      
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
