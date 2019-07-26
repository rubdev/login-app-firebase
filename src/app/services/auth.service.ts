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
  private apiKey = 'AIzaSyB97WGIRAwM6d_hbm2Zomke11e2s83CPJ0';
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

  }

  private guardarToken( tokenId: string ) {
    this.tokenUsuario = tokenId;
    localStorage.setItem('token', this.tokenUsuario);
  }

  private leerToken() {
    if ( localStorage.getItem( 'token ') ) {
      this.tokenUsuario = localStorage.getItem( 'token' );
    } else {
      this.tokenUsuario = '';
    }
    return this.tokenUsuario;
  }

}
