import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // sign up -> https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // sign in -> https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyB97WGIRAwM6d_hbm2Zomke11e2s83CPJ0';

  constructor( private http: HttpClient ) { }

  registrarUsuario( usuario: UsuarioModel ) {

  }

  logIn( usuario: UsuarioModel ) {

  }

  logOut() {

  }

}
