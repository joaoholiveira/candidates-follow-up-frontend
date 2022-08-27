import { CanalRetorno } from "./canal-retorno.model";

export interface FollowUp {
    id: number; 
    nomeCandidato: string; 
    dataRetorno: string; 
    tipoRetorno: CanalRetorno; 
    isAtivo: boolean; 
    isCandidatoContatado: boolean;
}
