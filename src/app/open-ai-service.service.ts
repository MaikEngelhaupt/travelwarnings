import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAiServiceService {

  private url = 'https://aiforcause.deepnight.tech/openai/';

  private http = inject(HttpClient);
  constructor() {
  }


}
