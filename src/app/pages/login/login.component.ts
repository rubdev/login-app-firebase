import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;

  constructor() { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onLogin( formulario: NgForm ) {
    if ( formulario.invalid ) { return; }
    console.log(`Datos enviados: ${ JSON.stringify( this.usuario ) }`);
    console.log(formulario);
  }

}
