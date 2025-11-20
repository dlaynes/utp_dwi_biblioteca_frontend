import { Component } from '@angular/core';
import { ComentariosService } from '../../../services/publico/comentarios-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Comentario } from '../../../domain/comentario';

@Component({
  selector: 'app-contacto-page',
  imports: [ReactiveFormsModule],
  templateUrl: './contacto-page.html',
  styleUrl: './contacto-page.scss',
  standalone: true,
})
export class ContactoPage {

  form!: FormGroup;

  constructor(
    private comentariosService: ComentariosService,
    private fb: FormBuilder,
  ){
    
  }

  ngOnInit(): void {  
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      celular: [''],
      mensaje: ['', Validators.required],
    });
  }

  async enviar(){
    const val = this.form.value;

    try {
      const res = lastValueFrom(this.comentariosService.crear({
        nombre: val.nombre,
        correo: val.correo,
        celular: val.celular,
        mensaje: val.mensaje
      } as Comentario));
      alert("El mensaje fue guardado exitosamente.");
      this.form.reset();

    } catch(e){
      console.log("Hubo un problema al enviar el mensaje: ", e);
    }
  }

}
