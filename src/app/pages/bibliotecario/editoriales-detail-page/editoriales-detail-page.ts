import { Component, effect, OnInit, signal, untracked, WritableSignal } from '@angular/core';
import { EditorialesService } from '../../../services/bibliotecario/editoriales-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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

  cargando = signal(true);

  path = signal('');

  constructor(
    private fb: FormBuilder,
    private editorialService: EditorialesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    effect(()=>{
      const path = this.path(); 
      if(path){
        untracked(()=>{
          this.cargarEditorial(parseInt(path));
        });
      }
    });
  }
  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      this.path.set(segments[2].path);
    });
  }

  async cargarEditorial(id: number){
    if(!id) return;
    this.cargando.set(true);
    const res = await lastValueFrom(this.editorialService.detalle(id));
    this.editorial.set(res);
    this.cargando.set(false);
    this.initForm(res);
  }

  initForm(editorial: Editorial){
    this.form = this.fb.group({
      nombre: [editorial?.nombre || '', Validators.required],
      ciudad: [editorial?.ciudad || '', Validators.required],
      pais: [editorial?.pais || '', Validators.required]
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
        this.router.navigateByUrl('/biliotecario/editoriales');
      } else {
        const res = await lastValueFrom(this.editorialService.actualizar(user.id,form as Editorial));    
        alert("La editorial ha sido actualizada!");
        this.router.navigateByUrl('/biliotecario/editoriales');
      } 
    } catch(e){
      console.log("Hubo un error al guardar la editorial", e);
    }
  }


}
