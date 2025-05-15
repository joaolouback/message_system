// src/app/auth/auth.guard.ts

/*
  AuthGuard: protege rotas que exigem autenticação
  - Verifica se o usuário está logado via AuthService
  - Se não estiver, redireciona para a página de login
*/
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  /**
   * Método canActivate:
   * - Retorna true se o usuário estiver autenticado
   * - Caso contrário, redireciona para login e retorna false
   */
  canActivate(): boolean {
    if (this.auth.getCurrentUser()) {
      return true;
    } else {
      this.router.navigate(['/autenticacao/signin']);
      return false;
    }
  }
}
