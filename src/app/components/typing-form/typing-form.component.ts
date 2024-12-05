import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-typing-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './typing-form.component.html',
  styleUrls: ['./typing-form.component.scss']
})
export class TypingFormComponent {
  message = '';
  @Output() sendMessage = new EventEmitter<string>();

  onSubmit() {
    if (this.message.trim()) {
      this.sendMessage.emit(this.message);
      this.message = '';
    }
  }
}