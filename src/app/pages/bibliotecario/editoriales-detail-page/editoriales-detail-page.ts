import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { EditorialesService } from '../../../services/bibliotecario/editoriales-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { Editorial } from '../../../domain/editorial';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-editoriales-detail-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './editoriales-detail-page.html',
  styleUrl: './editoriales-detail-page.scss',
  standalone: true
})
export class EditorialesDetailPage implements OnInit {

  errorMessage: WritableSignal<string|null> = signal(null);

  editorial = signal<Editorial|null>(null);

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private editorialService: EditorialesService,
    private router: Router,
  ) {

  }
  ngOnInit(): void {
    let extrasData : Editorial|null = null;

    if (this.router.lastSuccessfulNavigation?.extras.state) {
      const receivedData = this.router.lastSuccessfulNavigation?.extras.state;
      console.log('Received data:', receivedData);
      extrasData = receivedData as Editorial;
      this.editorial.set(extrasData);
    }

    this.form = this.fb.group({
      nombre: [extrasData?.nombre || '', Validators.required],
      ciudad: [extrasData?.ciudad || '', Validators.required],
      pais: [extrasData?.pais || '', Validators.required]
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
      const user = this.editorial();
      const form = {...this.form?.value};

      if(!user){
        const res = await lastValueFrom(this.editorialService.crear(form as Editorial));
        alert("La editorial ha sido creada!");
      } else {
        const res = await lastValueFrom(this.editorialService.actualizar(user.id,form as Editorial));    
        alert("La editorial ha sido actualizada!");
      } 
    } catch(e){
      console.log("Hubo un error al guardar la editorial", e);
    }
  }


}
