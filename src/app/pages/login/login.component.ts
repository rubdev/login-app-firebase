import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onLogin( formulario: NgForm ) {
    if ( formulario.invalid ) { return; }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Cargando...'
    });
    Swal.showLoading();
    // console.log(`Datos enviados: ${ JSON.stringify( this.usuario ) }`);
    // console.log(formulario);
    this.auth.logIn( this.usuario )
             .subscribe( respuestaFirebase => {
                console.log(respuestaFirebase);
                Swal.close();
                this.router.navigateByUrl( '/home' );
             },
             ( err ) => {
                console.log(`Error al realizar el login: ${ err.error.error.message }`);
                Swal.fire({
                  allowOutsideClick: false,
                  type: 'error',
                  title: 'Error de autenticación',
                  text: err.error.error.message
                });
             });
  }
}
