import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey = 'AIzaSyB1dAXR2qMvVUPTqWWVkPNoub56XQcwYS4';
  private apiUrl: string;

  constructor(private http: HttpClient) {
    // Initialize apiUrl after apiKey is defined
    this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.apiKey}`;
  }

  generateResponse(message: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    const body = {
      contents: [{
        role: 'user',
        parts: [{
          text: message
        }]
      }]
    };

    return this.http.post(this.apiUrl, body, { headers })
      .pipe(
        catchError(error => {
          console.error('API Error:', error);
          return of({
            candidates: [{
              content: {
                parts: [{
                  text: 'Sorry, I encountered an error. Please try again.'
                }]
              }
            }]
          });
        })
      );
  }
}
