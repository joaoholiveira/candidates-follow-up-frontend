import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../api/api-config';
import { FollowUp } from '../model/follow-up.model';

@Injectable({
  providedIn: 'root'
})
export class FollowUpService {

  constructor(private http: HttpClient) { }

  listarFollowUpsPelaDataAtual(): Observable<FollowUp[]>{
    return this.http.get<FollowUp[]>(`${ENDPOINTS.FollowUpHabilitadosComDataAtual}`); 
  }

  listarFollowUpsPelaDescricaoEDataDeRetorno(nomeCandidato: string, dataRetorno: string): Observable<FollowUp[]>{
    return this.http.get<FollowUp[]>(`${ENDPOINTS.FollowUpHabilitadosPorDescricaoEData}?nomeCandidato=`+nomeCandidato+`&dataRetorno=`+dataRetorno); 
  }

  listarFollowUpsPorTipoDeRetorno(id: number) {
    return this.http.get<FollowUp[]>(`${ENDPOINTS.FollowUpHabilitadosPorTipoDeRetorno}`+id); 
  }

  listarFollowUpsHabilitados() : Observable<FollowUp[]> {
    return this.http.get<FollowUp[]>(`${ENDPOINTS.FollowUp}`); 
  }

  inserirFollowUp(followUp: FollowUp) {
    return this.http.post(`${ENDPOINTS.FollowUp}`, followUp, {observe: 'response'}); 
  }

  atualizarFollowUp(followUp: FollowUp) {
    return this.http.put(`${ENDPOINTS.FollowUp}`+followUp.id, followUp, {observe: 'response'}); 
  }

  disableFollowUp(id: number) {
    return this.http.put(`${ENDPOINTS.desabilitarFollowUp}`+id, "", {observe: 'response'}); 
  }
}
