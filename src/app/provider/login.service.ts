import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';

const USUARIO_NOMBRE = 'admin';
const USUARIO_PASSWORD = '12345678';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usuario : Usuario;
  

  constructor() { 
    console.trace('LoginService - constructor')
    this.usuario = undefined;
  }

  isLogged(): boolean{
    console.trace("LoginService - isLogged")
    let resul: boolean;
    if(this.usuario){
      console.debug('Usuario logeado');
      resul= true;
    }else{
      console.warn('Usuario No logueado');
      resul= false;
    }
    return resul;
  }

  logOut(){
    console.trace("LoginService - logOut")
    this.usuario = undefined;
  }

  login( u: Usuario): boolean{
    console.trace('LoginService login %o',u);
    if (u && u.nombre === USUARIO_NOMBRE && u.password === USUARIO_PASSWORD ){
       console.debug(' usuario logeado');
      this.usuario = u;      
      return true;
    }else{
       console.warn(' usuario no valido');
      this.usuario = undefined;
      return false;
    }
   }
}