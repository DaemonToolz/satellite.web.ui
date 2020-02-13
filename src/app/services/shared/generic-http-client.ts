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

  protected put<T>(ressource:string, body: T): Observable<any>{
    // Ajouter authorizationheader
    return this._http.post<T>(`${this._endpoint}/${ressource}`, body);
  }
  
}
