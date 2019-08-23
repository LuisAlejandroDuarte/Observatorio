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

            $proc = $bd->conectar->prepare('SELECT epc_enpg_codi
            from obs_enpc AS enpc
            WHERE enpc.epc_codi=' . $ecc_enpc_codi);  
            $proc->execute(); 
            $rows2 = $proc->fetchAll();    

            $codi=$rows2[0]["epc_enpg_codi"];
            
            $proc = $bd->conectar->prepare('SELECT avg(acge.CCA_PUNT) As Puntaje from  obs_enpg AS enpg inner join obs_enpc as enpc on enpc.EPC_ENPG_CODI=enpg.EPG_CODI 
            inner join obs_epcc as epcc on epcc.ECC_ENPC_CODI=enpc.EPC_CODI
            inner join obs_epcc_acge as acge on acge.CCA_EPCC_CODI=epcc.ECC_CODI            
            where enpg.EPG_CODI=' . $rows2[0]["epc_enpg_codi"]);  
            $proc->execute(); 
            $rows2 = $proc->fetchAll();           

           
            $proc = $bd->conectar->prepare('UPDATE  obs_enpg SET EPG_PUNT=' .  $rows2[0]["Puntaje"] . ' WHERE EPG_CODI=' . $codi);
            $proc->execute(); 
            
            echo  json_encode($rows2[0]["Puntaje"],true) ;

         $bd->conectar=null;
         $bd=null;      
    }

    private function updatePolitica() {
        $postdata = file_get_contents("php://input");             
        
        $bd = new BaseDatos();
        $bd->Conectar();
        $proc = $bd->conectar->prepare('DELETE from obs_arbol2');
        $proc->execute(); 

        $proc = $bd->conectar->prepare('SELECT distinct PGDI.PGD_CODI,PGDI.PGD_NOMB,ENPG.EPG_PUNT from obs_enpg AS ENPG  left join obs_pgdi AS PGDI  ON ENPG.EPG_PGDI_CODI=PGDI.PGD_CODI');

            $cont=0;
            $cont2=0;
            $proc->execute();         
            $rows = $proc->fetchAll(); 
            
            foreach($rows as $row)
            {
                $cont=$cont+1;
               $proc= $bd->conectar->prepare('INSERT obs_arbol2 (id,parentid,text,value) VALUES (' .$row[0] . ',"-1", "' . $row[1] . '",' . $row[2] . ')');
                   $proc->execute(); 
                
              

                $proc2=$bd->conectar->prepare('SELECT ENPC.epc_codi, PGDI.pgd_codi, PGDI.pgd_nomb,COMP.com_codi, COMP.com_desc,ENPC.EPC_CALI 
                    from obs_enpg AS ENPG 
                    INNER JOIN obs_enpc AS ENPC ON ENPC.epc_enpg_codi=ENPG.epg_codi 
                    INNER JOIN obs_pgdi AS PGDI ON PGDI.PGD_CODI=ENPG.EPG_PGDI_CODI
                    INNER JOIN obs_comp AS COMP ON COMP.COM_CODI=ENPC.EPC_COMP_CODI WHERE PGDI.pgd_codi=' . $row[0] );
                 $proc2->execute(); 
                $rows2 = $proc2->fetchAll();     
               
                foreach($rows2 as $row2)  
                {
                   
                   $proc3= $bd->conectar->prepare('INSERT INTO obs_arbol2 (id,parentid,text,value) VALUES ("a' . $row2[0] . '",' . $row[0] . ', "' . $row2[4] . '",' . $row2[5] . ')');
                   $proc3->execute();  
                   
                   $proc3= $bd->conectar->prepare('SELECT EPCC.ECC_CODI,EPCC.ECC_ENPC_CODI,CATE.CAT_CODI, CATE.CAT_DESC,EPCC.ECC_CALI from obs_epcc AS EPCC 
                   INNER JOIN obs_enpc AS ENPC ON ENPC.EPC_CODI=EPCC.ECC_ENPC_CODI
                   INNER JOIn obs_cate AS CATE ON CATE.CAT_CODI=EPCC.ECC_CATE_CODI WHERE EPCC.ECC_ENPC_CODI=' .  $row2[0]);

                   $proc3->execute();  

                   $rows3 = $proc3->fetchAll();      

                    foreach($rows3 as $row3)  
                    {
                        $proc3= $bd->conectar->prepare('INSERT INTO obs_arbol2 (id,parentid,text,value) VALUES ("b' . $row3[0] . '","a' . $row2[0] . '", "' . $row3[3] . '",' . $row3[4] . ')');
                        $proc3->execute(); 

                        $proc4= $bd->conectar->prepare('SELECT EPCCACGE.cca_codi,EPCCACGE.CCA_EPCC_CODI,ACGE.ACG_CODI,ACGE.ACG_DESC,EPCCACGE.CCA_PUNT from obs_epcc_acge AS EPCCACGE 
                        INNER JOIN obs_epcc AS EPCC ON EPCC.ECC_CODI=EPCCACGE.CCA_EPCC_CODI
                        INNER JOIN obs_acge AS ACGE ON ACGE.ACG_CODI=EPCCACGE.CCA_ACGE_CODI WHERE EPCCACGE.CCA_EPCC_CODI=' . $row3[0]);
                        $proc4->execute(); 

                        $rows4 = $proc4->fetchAll();  

                        foreach($rows4 as $row4)  
                        {   
                            $proc3= $bd->conectar->prepare('INSERT INTO obs_arbol2 (id,parentid,text,value) VALUES (' . $row4[0] . ',"b' . $row3[0] . '", "' . $row4[3] . '","' . $row4[4] . '")');
                            $proc3->execute();     
                        }

                    }
                }            
            }

            $proc = $bd->conectar->prepare('SELECT id,parentid,text,value FROM obs_arbol2');

      
            $proc->execute();
            $resp = $proc->fetchAll();
            echo  json_encode($resp,true) ;
    
             $bd->conectar=null;
             $bd=null;      
    }
    
}
$api = new Api();  

$api->procesarLLamada();


