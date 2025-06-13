import { Routes } from '@angular/router';
import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';
import { LogoutComponent } from './logout.component';
import { MessagesComponent } from '../messages/messages.component';
import { AuthGuard } from './auth.guard';

export const AUTH_ROUTES: Routes = [
  // redireciona raiz do “/auth” para signup
  { path: '', redirectTo: 'signup', pathMatch: 'full' },

  {
    path: 'signup',
    title: 'Autenticação | Cadastro',
    component: SignupComponent
  },
  {
    path: 'signin',
    title: 'Autenticação | Login',
    component: SigninComponent
  },
  {
    path: 'logout',
    title: 'Autenticação | Logout',
    component: LogoutComponent
  },

  // Rota de mensagens protegida pelo AuthGuard
  {
    path: 'messages',
    title: 'Dashboard | Mensagens',
    component: MessagesComponent,
    canActivate: [AuthGuard]
  }
];
