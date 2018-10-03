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


    private function borrar() {
        $postdata = file_get_contents("php://input");             
        
        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('DELETE FROM obs_arbol');

            
            $proc->execute();         

         $bd->conectar=null;
         $bd=null;      
    }

    private function generar() {
        $postdata = file_get_contents("php://input");             
        
        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('DELETE from obs_arbol');
        $proc->execute(); 

        $proc = $bd->conectar->prepare('SELECT * from obs_pgdi');

            $cont=0;
            $cont2=0;
            $proc->execute();         
            $rows = $proc->fetchAll(); 
            
            foreach($rows as $row)
            {
                $cont=$cont+1;
               $proc= $bd->conectar->prepare('INSERT obs_arbol (id,parentid,text) VALUES (' .$row[0] . ',-1, "' . $row[1] . '")');
                   $proc->execute(); 
                
              

                $proc2=$bd->conectar->prepare('SELECT ENPC.epc_codi, PGDI.pgd_codi, PGDI.pgd_nomb,COMP.com_codi, COMP.com_desc 
                    from obs_enpg AS ENPG 
                    INNER JOIN obs_enpc AS ENPC ON ENPC.epc_enpg_codi=ENPG.epg_codi 
                    INNER JOIN obs_pgdi AS PGDI ON PGDI.PGD_CODI=ENPG.EPG_PGDI_CODI
                    INNER JOIN obs_comp AS COMP ON COMP.COM_CODI=ENPC.EPC_COMP_CODI WHERE PGDI.pgd_codi=' . $row[0] );
                 $proc2->execute(); 
                $rows2 = $proc2->fetchAll();     
               
                foreach($rows2 as $row2)  
                {
                   
                   $proc3= $bd->conectar->prepare('INSERT INTO obs_arbol (id,parentid,text) VALUES (' . $row2[0] . ',' . $row2[1] . ', "' . $row2[4] . '")');
                   $proc3->execute();  
                   
                   $proc3= $bd->conectar->prepare('SELECT EPCC.ECC_CODI,EPCC.ECC_ENPC_CODI,CATE.CAT_CODI, CATE.CAT_DESC from obs_epcc AS EPCC 
                   INNER JOIN obs_enpc AS ENPC ON ENPC.EPC_CODI=EPCC.ECC_ENPC_CODI
                   INNER JOIn obs_cate AS CATE ON CATE.CAT_CODI=EPCC.ECC_CATE_CODI WHERE EPCC.ECC_ENPC_CODI=' .  $row2[0]);

                   $proc3->execute();  

                   $rows3 = $proc3->fetchAll();      

                    foreach($rows3 as $row3)  
                    {
                        $proc3= $bd->conectar->prepare('INSERT INTO obs_arbol (id,parentid,text) VALUES (' . $row3[0] . ',' . $row2[0] . ', "' . $row3[3] . '")');
                        $proc3->execute(); 

                        $proc4= $bd->conectar->prepare('SELECT EPCCACGE.cca_codi,EPCCACGE.CCA_EPCC_CODI,ACGE.ACG_CODI,ACGE.ACG_DESC from obs_epcc_acge AS EPCCACGE 
                        INNER JOIN obs_epcc AS EPCC ON EPCC.ECC_CODI=EPCCACGE.CCA_EPCC_CODI
                        INNER JOIN obs_acge AS ACGE ON ACGE.ACG_CODI=EPCCACGE.CCA_ACGE_CODI WHERE EPCCACGE.CCA_EPCC_CODI=' . $row3[0]);
                        $proc4->execute(); 

                        $rows4 = $proc4->fetchAll();  

                        foreach($rows4 as $row4)  
                        {   
                            $proc3= $bd->conectar->prepare('INSERT INTO obs_arbol (id,parentid,text) VALUES (' . $row4[0] . ',' . $row3[0] . ', "' . $row4[3] . '")');
                            $proc3->execute();     
                        }

                    }
                }            
            }

            $proc = $bd->conectar->prepare('SELECT id,parentid,text,value FROM obs_arbol');

      
            $proc->execute();
            $resp = $proc->fetchAll();
            echo  json_encode($resp,true) ;
    
             $bd->conectar=null;
             $bd=null;      
    }

    private function select() {
        $postdata = file_get_contents("php://input");

        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('SELECT id,parentid,text,value FROM obs_arbol');

      
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
