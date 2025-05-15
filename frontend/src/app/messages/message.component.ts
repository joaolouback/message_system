import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from './message.models';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() message!: Message;
  @Output() edit = new EventEmitter<Message>();
  @Output() delete = new EventEmitter<string>();

  onEdit(): void {
    this.edit.emit(this.message);
  }

  onDelete(): void {
    this.delete.emit(this.message._id);
  }
}
