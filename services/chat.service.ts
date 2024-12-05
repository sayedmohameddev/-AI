import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatMessage } from '../src/app/models/chat-message.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();

  constructor(private apiService: ApiService) {}

  isRTL(text: string): boolean {
    const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
    return rtlChars.test(text);
  }

  async sendMessage(message: string): Promise<void> {
    const userMessage: ChatMessage = {
      text: message,
      isUser: true,
      isRTL: this.isRTL(message)
    };

    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, userMessage]);

    this.apiService.generateResponse(message).subscribe(response => {
      const botResponse = response.candidates[0]?.content?.parts[0]?.text || 'Sorry, I could not generate a response.';
      
      const botMessage: ChatMessage = {
        text: botResponse,
        isUser: false,
        isRTL: this.isRTL(botResponse)
      };

      this.messagesSubject.next([...this.messagesSubject.value, botMessage]);
    });
  }

  getMessages(): Observable<ChatMessage[]> {
    return this.messages$;
  }
}