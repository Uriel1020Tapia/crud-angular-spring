import { Injectable } from '@angular/core';
import { ApiClass } from '@data/schema/ApiClass.class';
import { ICardUser } from '@shared/components/cards/card-user/card-user.metadata';
import { Observable } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService  extends ApiClass{

  /**
  * Get all Users API
  */
getAllUsers(): Observable<{
  error:boolean,
  msg:string;
  data:ICardUser[]
}> {
  const response ={ error:false, msg:'', data:null};//Esto es lo que respondemos depende la repuesta de tu API
  return this.http.get<ICardUser[]>(`${this.url}/users`)
  .pipe(
    delay(3000),
    map( r => {
      response.data = r; //manipulamos la respuesta para convertirla en el objeto que se requiere regresar
      return response;
    }),
    catchError(this.error)//si ocurre un error mandamos a llamar a nuestro metodo handler error de la clase ApiClass
  );
 }

  /**
  * Get user by id API
  * @param id number;
  */
 getUserById(id:number): Observable<{
  error:boolean,
  msg:string;
  data:ICardUser
 }>{
  const response ={ error:false, msg:'', data:null}; //Esto es lo que respondemos depende la repuesta de tu API
    return this.http.get<ICardUser>(`${this.url}/users/${id}`)
    .pipe(
      map( r => {
        response.data = r; //manipulamos la respuesta para convertirla en el objeto que se requiere regresar
        return response;
      }),
      catchError(this.error)//si ocurre un error mandamos a llamar a nuestro metodo handler error de la clase ApiClass
    )
 }
}
