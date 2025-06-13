// src/app/messages/message-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MessageService, Message } from './message.services';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
  public baseUrl = 'http://localhost:3000';

  messages: Message[] = [];
  private sub!: Subscription;

  constructor(private msgSvc: MessageService) { }

  ngOnInit() {
    this.load();
    this.sub = this.msgSvc.refreshNeeded$.subscribe(() => this.load());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private load() {
    this.msgSvc.getMessages().subscribe({
      next: res => {
        // Aqui pegamos a lista original e invertimos a ordem:
        // as mensagens vindas por último do backend (mais recentes) entram primeiro no array.
        this.messages = res.messages.slice().reverse();
      },
      error: err => console.error('Erro ao carregar mensagens', err)
    });
  }

  editMessage(msg: Message) {
    const novo = prompt('Novo texto:', msg.content);
    if (novo != null) {
      this.msgSvc.updateMessage(msg._id, novo).subscribe();
    }
  }

  deleteMessage(id: string) {
    if (confirm('Deseja realmente apagar essa mensagem?')) {
      this.msgSvc.deleteMessage(id).subscribe({
        next: () => {
          console.log('Mensagem removida com sucesso:', id);
        },
        error: err => {
          console.error('Erro ao apagar mensagem:', err);
          alert(`Falha ao apagar: ${err.error?.error || err.message}`);
        }
      });
    }
  }
}
