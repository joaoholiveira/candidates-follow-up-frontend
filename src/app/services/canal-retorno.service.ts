import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../api/api-config';
import { CanalRetorno } from '../model/canal-retorno.model';

@Injectable({
  providedIn: 'root'
})
export class CanalRetornoService {

  constructor(private http: HttpClient) { }

  listarTodosCanaisDeRetornoHabilitados() : Observable<CanalRetorno[]>{
    return this.http.get<CanalRetorno[]>(`${ENDPOINTS.listarTodosCanaisDeRetornoHabilitados}`); 
  }

  inserirNovoCanalDeRetorno(canalRetorno: CanalRetorno){
    return this.http.post(`${ENDPOINTS.CanalRetorno}`, canalRetorno, {observe: 'response'});
  }

  editarCanalDeRetorno(canalRetorno: CanalRetorno){
    return this.http.put(`${ENDPOINTS.CanalRetorno}/`+canalRetorno.id, canalRetorno, {observe: 'response'});
  }

  listarCanalDeRetornoPorDescricao(descricao: string): Observable<CanalRetorno[]>{
    return this.http.get<CanalRetorno[]>(`${ENDPOINTS.listarTodosCanaisDeRetornoHabilitadosPorDescricao}?descricao=`+descricao);
  }

}
