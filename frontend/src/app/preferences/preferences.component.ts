// src/app/preferences/preferences.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ReactiveFormsModule,
    FormBuilder,
    Validators
} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { PreferencesService } from './preferences.service';

@Component({
    selector: 'app-preferences',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './preferences.component.html'
})
export class PreferencesComponent {
    form = this.fb.group({
        theme: ['light', Validators.required],
        notification: ['email', Validators.required],
        newsletter: [false]
    });

    private user = this.auth.getCurrentUser()!;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private svc: PreferencesService
    ) { }

    onSubmit() {
        if (this.form.invalid) {
            return;
        }

        // Extrai e converte para os tipos exatos
        const theme = this.form.get('theme')!.value as 'light' | 'dark';
        const notification = this.form.get('notification')!.value as 'email' | 'sms';
        const newsletter = this.form.get('newsletter')!.value as boolean;

        const payload = {
            user: this.user.id,
            theme,
            notification,
            newsletter
        };

        this.svc.save(payload).subscribe({
            next: () => alert('Preferências salvas!'),
            error: err => console.error('Erro ao salvar preferências', err)
        });
    }
}
