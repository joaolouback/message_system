import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-authentication',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    template: `
                <header class="row spacing">
                    <nav class="col-md-8 col-md-offset-2">
                        <ul class="nav nav-tabs">
                            <li><a class="nav-link"
                            routerLinkActive="active" [routerLink]="['signup']">Cadastro</a></li>
                            <li><a class="nav-link"
                                    routerLinkActive="active" [routerLink]="['signin']">Login</a></li>
                        </ul>
                    </nav>
                </header>

                <router-outlet></router-outlet>
    `,
    styleUrls: ['./authentication.component.css']
})

export class authenticationComponent {

}
