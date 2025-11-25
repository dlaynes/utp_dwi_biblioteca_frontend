import { Component, effect, signal, untracked, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Autor } from '../../../domain/autor';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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

  path = signal('');

  cargando = signal(true);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private autoresService: AutoresService,
    private router: Router,
  ) {
    effect(()=>{
      const path = this.path(); 
      if(path){
        untracked(()=>{
          if(path === 'nuevo' || path === 'nueva'){
            this.initForm(null);
            this.cargando.set(false);
          } else {
            this.cargarAutor(parseInt(path));
          }
        })
      }
    });
  }

  initForm(autor: Autor|null){
    this.form = this.fb.group({
      nombres: [autor?.nombres || '', Validators.required],
      apellidos: [autor?.apellidos || '', Validators.required],
      nacionalidad: [autor?.nacionalidad || '', Validators.required],
      comentarios: [autor?.comentarios || '', Validators.required],
    });
  }

  
  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      this.path.set(segments[2].path);
    });
  }

  private async cargarAutor(id: number): Promise<void> {
    if(id){
      try {
        const res = await lastValueFrom(this.autoresService.detalle(id));
        this.autor.set(res);
        this.cargando.set(false);
        this.initForm(res);

      } catch(e){
        console.log("Hubo un error al leer el autor", e)
      }
    }
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
        this.router.navigateByUrl('/bibliotecario/autores');
      } else {
        const res = await lastValueFrom(this.autoresService.actualizar(data.id,form as Autor));    
        alert("El autor ha sido actualizado!");
        this.router.navigateByUrl('/bibliotecario/autores');
      } 
    } catch(e){
      console.log("Hubo un error al guardar el autor", e);
    }
  }


}
