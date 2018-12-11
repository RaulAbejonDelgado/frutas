import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Frutas } from 'src/app/model/fruta';


@Injectable({
  providedIn: 'root'
})
export class FrutaService {


  endpoint : string ='http://localhost:3000/frutas' ;

  constructor(public http : HttpClient) { }

  getAll(): Observable <any>{
    console.trace('FrutaService - getAll');
    return this.http.get(this.endpoint);
  }

  add(fruta: Frutas): Observable<any>{
    console.trace(`FrutaService add ${this.endpoint}`);
    let body  = {
          //"id": tarea.id,
          "nombre": fruta.nombre,
          "precio": fruta.precio,
          "calorias": fruta.calorias, 
          "colores" : fruta.colores,
          "oferta": fruta.oferta,
          "descuento": fruta.descuento,
          "imagen" : fruta.imagen
        };  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post( this.endpoint, body , httpOptions );
}

delete(id: number): Observable <any>{
  let uri = this.endpoint + "/"+id;
  console.trace("FrutaService - delete->" + uri);
  return this.http.delete(this.endpoint + "/"+id);
}

obtenerFrutaPorId(id: number): any {
  return this.http.get(this.endpoint+"/"+id);
}

actualizar(fruta: Frutas): Observable<any>{
  console.trace(`FrutaService actualizar ${this.endpoint}`);
  console.log(fruta.id);
  let body  = {
        "id":fruta.id,
        "nombre": fruta.nombre,
        "precio": fruta.precio,
        "calorias": fruta.calorias, 
        "colores" : fruta.colores,
        "oferta": fruta.oferta,
        "descuento": fruta.descuento,
        "imagen" : fruta.imagen
        
      };  
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  return this.http.put( this.endpoint+"/"+fruta.id, body , httpOptions );


}
}