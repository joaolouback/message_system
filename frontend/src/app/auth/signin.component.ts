// src/app/auth/signin.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, AuthResponse } from './auth.service';  // usar SigninResponse

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  myFormIn!: FormGroup;
  loading = false;
  errorMsg: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.myFormIn = this.fb.group({
      emailTS: [
        null,
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9\\-_.]+@[a-zA-Z0-9\\-_.]+')
        ]
      ],
      passwordTS: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          this.minusculoFValidator
        ]
      ]
    });
  }

  minusculoFValidator(control: AbstractControl) {
    const pass = control.value as string;
    return pass && pass !== pass.toLowerCase()
      ? { minusculoF: true }
      : null;
  }

  onSubmit() {
    if (this.myFormIn.invalid) {
      return;
    }

    this.loading = true;
    this.errorMsg = null;

    const { emailTS, passwordTS } = this.myFormIn.value;
    this.auth.signIn(emailTS, passwordTS).subscribe({  // usar signIn
      next: (res: AuthResponse) => {
        // Armazena usuário e navega
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        this.router.navigate(['/mensagens']);
      },
      error: (err: any) => {
        this.errorMsg = err.error?.error || 'Erro no login';
        this.loading = false;
      }
    });
  }
}
