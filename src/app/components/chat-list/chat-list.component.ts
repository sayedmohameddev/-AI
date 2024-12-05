import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessage } from '../../models/chat-message.interface';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent {
  @Input() messages: ChatMessage[] | null = [];

  copyMessage(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied');
    });
  }
}