import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-authentication',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    template: `
            <div class="auth-container">
                <div class="auth-tabs">
                    <a
                    class="nav-link"
                    routerLink="/autenticacao/signup"
                    routerLinkActive="active"
                    [routerLinkActiveOptions]="{ exact: true }">
                    Cadastro
                    </a>

                    <a
                    class="nav-link"
                    routerLink="/autenticacao/signin"
                    routerLinkActive="active">
                    Login
                    </a>
                </div>

                <router-outlet></router-outlet>
            </div>

    `,
    styleUrls: ['./authentication.component.css']
})

export class authenticationComponent {

}
