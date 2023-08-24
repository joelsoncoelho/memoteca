import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API_URL = 'http://localhost:3000/pensamentos';

  constructor(private httpClient: HttpClient) { }


  /*
  listar(): Observable<Pensamento[]> {
    return this.httpClient.get<Pensamento[]>(this.API_URL);
  }
  */
 //GET /posts?_page=7&_limit=20
  listar(pagina: number, filtro: string, favoritos: boolean): Observable<Pensamento[]> {
    const itensPorPagina = 6;

    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

      if(filtro.trim().length > 2){
        params = params.set("q", filtro)
      }

      if(favoritos){
        params = params.set("favorito", true)
      }

      return this.httpClient.get<Pensamento[]>(this.API_URL, {params : params})
  }

  /*
  listarPensamentosFavoritos(pagina: number, filtro: string): Observable<Pensamento[]>{
    const itensPorPagina = 6;

    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)
      .set("favorito", true)

      if(filtro.trim().length > 2){
        params = params.set("q", filtro)
      }
      return this.httpClient.get<Pensamento[]>(this.API_URL, {params : params})
  }

  */

  criar(pensamento: Pensamento): Observable<Pensamento>{
    return this.httpClient.post<Pensamento>(this.API_URL, pensamento);
  }

  editar(pensamento: Pensamento): Observable<Pensamento>{
    return this.httpClient.put<Pensamento>(`${this.API_URL}/${pensamento.id}`, pensamento);
  }

  mudarFavorito(pensamento: Pensamento):Observable<Pensamento>{
    pensamento.favorito = !pensamento.favorito;
  //  const URL = `${this.API_URL}/${pensamento.id}`
  //  return this.httpClient.put<Pensamento>(URL, pensamento);
    return this.editar(pensamento);
  }

  excluir(id: number): Observable<Pensamento>{
   // const url = `${this.API_URL}/${id}`;
    return this.httpClient.delete<Pensamento>(`${this.API_URL}/${id}`);
  }

  buscarPorId(id: number): Observable<Pensamento>{
    return this.httpClient.get<Pensamento>(`${this.API_URL}/${id}`);
  }



}
