import { Component } from "@angular/core";

@Component({
  selector: 'app-logout',
  standalone: true,
  template: `
    <div class="col-md-8 col-md-offset-2">
      <br>
      <button class="btn btn-danger" (click)="onLogout()">Logout</button>
    </div>
    <style>
      .btn-danger {
        background-color: white;
        border-color: red;
        color: red;
        border-size: 3px;
      }
      .btn-danger:hover {
        background-color: #c82333;
        border-color: #bd2130;
        color: white;
      }
      .btn-danger:focus, .btn-danger.focus {
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);
      }
    </style>
  `
})
export class LogoutComponent {
  onLogout() {
    // originalmente vazio
  }
}
