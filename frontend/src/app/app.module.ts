// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';   // <— importe aqui

@NgModule({
  declarations: [
    AppComponent,
    // outros componentes que você declarar aqui...
  ],
  imports: [
    BrowserModule,
    AppRoutingModule   // <— e adicione aqui
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
