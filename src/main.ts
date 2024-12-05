import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './app/components/header/header.component';
import { ChatListComponent } from './app/components/chat-list/chat-list.component';
import { TypingFormComponent } from './app/components/typing-form/typing-form.component';
import { ChatService } from './../services/chat.service';
import { CommonModule } from '@angular/common'; // استيراد CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ChatListComponent, TypingFormComponent, CommonModule], // إضافة CommonModule هنا
  template: `
    <app-header />
    <app-chat-list [messages]="messages$ | async" />
    <app-typing-form (sendMessage)="handleMessage($event)" />
  `
})
export class App {
  messages$ = this.chatService.getMessages();

  constructor(private chatService: ChatService) {}

  handleMessage(message: string) {
    this.chatService.sendMessage(message);
  }
}

bootstrapApplication(App, {
  providers: [
    ChatService,
    provideHttpClient(),
    HttpClientModule  
  ]
});
