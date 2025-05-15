// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { MessagesComponent } from './messages/messages.component';
import { authenticationComponent } from './auth/authentication.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AUTH_ROUTES } from './auth/auth.routers';
import { SignupComponent } from './auth/signup.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { AuthGuard } from './auth/auth.guard';    // importe o guard

export const routes: Routes = [
  // Redireciona raiz para mensagens (protegida)
  {
    path: '',
    redirectTo: '/mensagens',
    pathMatch: 'full'
  },

  // Rota de mensagens protegida
  {
    path: 'mensagens',
    component: MessagesComponent,
    title: 'Dashboard | Mensagens',
    canActivate: [AuthGuard]              // <-- adiciona o guard aqui
  },

  // Módulo de autenticação com rotas filhas
  {
    path: 'autenticacao',
    component: authenticationComponent,
    title: 'Autenticação',
    children: [
      ...AUTH_ROUTES,
      { path: 'signup', component: SignupComponent, title: 'Cadastro' }
    ]
  },

  // Preferências de usuário
  {
    path: 'preferences',
    component: PreferencesComponent,
    title: 'Preferências'
  },

  // Página não encontrada
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
