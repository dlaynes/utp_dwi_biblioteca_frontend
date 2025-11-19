import { Component, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Autor } from '../../../domain/autor';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { AutoresService } from '../../../services/bibliotecario/autores-service';

@Component({
  selector: 'app-autores-detail-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './autores-detail-page.html',
  styleUrl: './autores-detail-page.scss'
})
export class AutoresDetailPage {

  errorMessage: WritableSignal<string|null> = signal(null);

  autor = signal<Autor|null>(null);

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private autoresService: AutoresService,
    private router: Router,
  ) {

  }
  ngOnInit(): void {
    let extrasData : Autor|null = null;

    if (this.router.lastSuccessfulNavigation?.extras.state) {
      const receivedData = this.router.lastSuccessfulNavigation?.extras.state;
      console.log('Received data:', receivedData);
      extrasData = receivedData as Autor;
      this.autor.set(extrasData);
    }

    this.form = this.fb.group({
      nombres: [extrasData?.nombres || '', Validators.required],
      apellidos: [extrasData?.apellidos || '', Validators.required],
      nacionalidad: [extrasData?.nacionalidad || '', Validators.required],
      comentarios: [extrasData?.comentarios || '', Validators.required],
    });

  }

  async onSubmit() {
    console.log(this.form.value);

    if(this.form?.invalid){
      return;
    }
    this.sendForm();
  }

  async sendForm(){
    try { 
      const data = this.autor();
      const form = {...this.form?.value};

      if(!data){
        const res = await lastValueFrom(this.autoresService.crear(form as Autor));
        alert("El autor ha sido creado!");
      } else {
        const res = await lastValueFrom(this.autoresService.actualizar(data.id,form as Autor));    
        alert("El autor ha sido actualizado!");
      } 
    } catch(e){
      console.log("Hubo un error al guardar el autor", e);
    }
  }


}
