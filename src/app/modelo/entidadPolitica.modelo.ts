import { Entidad } from "./Entidad.modelo";
import { Politica } from "./politica.modelo";

export class EntidadPolitica {
    epg_codi:number;    
    entidad:Entidad;
    ent_nomb:string;
    epg_enti_codi:number;
    politica:Politica    
    pgd_nomb:string;
    epg_pgdi_codi:number;
    epg_fini:Date;
    epg_ffin:Date;
    epg_punt:number;
}