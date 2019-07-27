import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // sign up -> https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // sign in -> https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'YOUR API KEY FROM FIREBASE';
  tokenUsuario: string;

  constructor( private http: HttpClient ) { 
    this.leerToken();
  }

  registrarUsuario( usuario: UsuarioModel ) {
    const datos = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };
    return this.http.post(`${ this.url }signUp?key=${ this.apiKey }`, datos)
                    .pipe (
                      map( respuestaFirebase => {
                        this.guardarToken( respuestaFirebase['idToken'] );
                        console.log('Token ID guardado');
                        return respuestaFirebase;
                      })
                    );
  }

  logIn( usuario: UsuarioModel ) {
    const datos = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };
    return this.http.post(`${ this.url }signInWithPassword?key=${ this.apiKey }`, datos)
                    .pipe (
                      map( respuestaFirebase => {
                        this.guardarToken( respuestaFirebase['idToken'] );
                        console.log('Token ID guardado');
                        return respuestaFirebase;
                      })
                    );
  }

  logOut() {
    localStorage.removeItem( 'token' );
  }

  private guardarToken( tokenId: string ) {
    this.tokenUsuario = tokenId;
    localStorage.setItem( 'token', this.tokenUsuario );
    let hoy = new Date();
    hoy.setSeconds( 3600 );
    localStorage.setItem( 'tokenExpira', hoy.getTime.toString() )
  }

  private leerToken() {
    if ( localStorage.getItem( 'token ' ) ) {
      this.tokenUsuario = localStorage.getItem( 'token' );
    } else {
      this.tokenUsuario = '';
    }
    return this.tokenUsuario;
  }

  estaLogeado(): boolean {
    if ( this.tokenUsuario.length > 2 ) {
      return false;
    }
    const expira = Number ( localStorage.getItem( 'tokenExpira' ) );
    const fechaExpira = new Date();
    fechaExpira.setTime( expira );
    if ( fechaExpira > new Date() ) {
      return true;
    } else {
      return false;
    }
  }

}
