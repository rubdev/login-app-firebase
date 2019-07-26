import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor( private auth: AuthService ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit( formulario: NgForm ) {
    if ( formulario.invalid ) { return; }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Cargando...'
    });
    Swal.showLoading();
    // console.log('Formulario enviado');
    // console.log(`Datos introducidos: ${ JSON.stringify( this.usuario ) }`);
    // console.log(formulario);
    this.auth.registrarUsuario( this.usuario )
             .subscribe( respuestaFirebase => {
                console.log(respuestaFirebase);
             },
             ( err ) => {
               console.log(`Error al registrar usuario: ${ err.error.error.message }`);
               Swal.fire({
                allowOutsideClick: false,
                type: 'error',
                title: 'Error al registrase',
                text: err.error.error.message
              });
             });
  }

}
