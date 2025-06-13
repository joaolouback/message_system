import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";  // ← adicione RouterLinkActive
import { AuthService } from "./auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  get isLoggedIn(): boolean {
    return !!this.auth.getCurrentUser();
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/autenticacao']);
  }
}
