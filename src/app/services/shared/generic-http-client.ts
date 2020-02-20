import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GenericHttpService<T> {
  private _endpoint: string;
  
  public init(endpoint: string) : void {
    this._endpoint = endpoint
  }

  constructor(private _http: HttpClient ) { }

  protected get(ressource: string): Observable<T>{
    // Ajouter authorizationheader
    return this._http.get<T>(`${this._endpoint}/${ressource}`);
  }

  protected getArray(ressource: string): Observable<T[]>{
    // Ajouter authorizationheader
    return this._http.get<T[]>(`${this._endpoint}/${ressource}`);
  }

  protected post<T>(ressource:string, body: T): Observable<any>{
    // Ajouter authorizationheader
    return this._http.post<T>(`${this._endpoint}/${ressource}`, body);
  }

  protected postArray(ressource:string, body: any): Observable<T[]>{
    // Ajouter authorizationheader
    return this._http.post<T[]>(`${this._endpoint}/${ressource}`, body);
  }

  protected put<T>(ressource:string, body: T): Observable<any>{
    // Ajouter authorizationheader
    return this._http.put<T>(`${this._endpoint}/${ressource}`, body);
  }
  
  protected getAny<A>(ressource: string): Observable<A>{
    // Ajouter authorizationheader
    return this._http.get<A>(`${this._endpoint}/${ressource}`);
  }

  
  protected postAny<A>(ressource:string, body: any): Observable<A>{
    // Ajouter authorizationheader
    return this._http.post<A>(`${this._endpoint}/${ressource}`, body);
  }

  protected putAny<A>(ressource:string, body: any): Observable<A>{
    // Ajouter authorizationheader
    return this._http.put<A>(`${this._endpoint}/${ressource}`, body);
  }

}
