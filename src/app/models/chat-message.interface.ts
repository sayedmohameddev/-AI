export interface ChatMessage {
  text: string;      // نص الرسالة
  isUser: boolean;   // هل المرسل مستخدم أم روبوت
  isRTL: boolean;    // اتجاه النص
}
