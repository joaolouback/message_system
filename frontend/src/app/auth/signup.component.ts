// src/app/auth/signup.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ReactiveFormsModule,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    myForm: FormGroup;
    selectedFile?: File;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router
    ) {
        this.myForm = this.fb.group({
            firstNameTS: [
                '',
                Validators.required
            ],
            lastNameTS: [
                '',
                [Validators.required, Validators.minLength(4), Validators.maxLength(16)]
            ],
            emailTS: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
                ]
            ],
            passwordTS: [
                '',
                Validators.required
            ]
            // removido avatarUrl do FormGroup
        });
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files?.length) {
            this.selectedFile = input.files[0];
        }
    }

    onSubmit(): void {
        if (this.myForm.invalid) return;

        const { firstNameTS, lastNameTS, emailTS, passwordTS } =
            this.myForm.value;
        const username = `${firstNameTS} ${lastNameTS}`;

        this.auth
            .signUp(username, emailTS, passwordTS, this.selectedFile)
            .subscribe({
                next: () => this.router.navigate(['/mensagens']),
                error: err => console.error('Erro no cadastro:', err)
            });
    }
}
