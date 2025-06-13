// src/app/messages/message-input.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageService } from './message.services';
import { AuthService } from '../auth/auth.service';  // importe o AuthService
import { Router } from '@angular/router';             // para redirecionar ao login

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent {
  constructor(
    public auth: AuthService,       // torne público para usar no template
    private msgSvc: MessageService,
    private router: Router
  ) { }

  onSubmit(form: NgForm) {
    // 1) se não estiver logado, redireciona para a página de login
    const user = this.auth.getCurrentUser();
    if (!user) {
      this.router.navigate(['/autenticacao/signin']);
      return;
    }

    // 2) caso esteja logado, procede com envio
    const content = form.value.content?.trim();
    if (!content) return;

    this.msgSvc.sendMessage(content).subscribe({
      next: () => form.resetForm(),
      error: (err) => console.error('Erro ao enviar mensagem', err)
    });
  }
}
