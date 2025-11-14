import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

/**
 * • minlength="3"
• maxlength="15"
• pattern="^[a-zA-Z0-9_]+$“
• email
• min
• max
• type="url", type="tel", type="email"
 */

@Component({
  selector: 'app-registro',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
  standalone: true,
})
export class Registro implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required], email: ['', [Validators.required, Validators.email]] 
    })
  }

  onSubmit() { console.log('Data:', this.registerForm.value); }
}
