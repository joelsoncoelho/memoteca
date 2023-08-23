import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API_URL = 'http://localhost:3000/pensamentos';

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<Pensamento[]> {
    return this.httpClient.get<Pensamento[]>(this.API_URL);
  }

  criar(pensamento: Pensamento): Observable<Pensamento>{
    return this.httpClient.post<Pensamento>(this.API_URL, pensamento);
  }

  editar(pensamento: Pensamento): Observable<Pensamento>{
    return this.httpClient.put<Pensamento>(`${this.API_URL}/${pensamento.id}`, pensamento);
  }

  excluir(id: number): Observable<Pensamento>{
   // const url = `${this.API_URL}/${id}`;
    return this.httpClient.delete<Pensamento>(`${this.API_URL}/${id}`);
  }

  buscarPorId(id: number): Observable<Pensamento>{
    return this.httpClient.get<Pensamento>(`${this.API_URL}/${id}`);
  }



}
