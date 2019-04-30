import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(
    private http: HttpClient
  ) { }

  getWordList(params?: any): Observable<any> {
    return this.http.get('/api/word', {params: params});
  }

  saveWord(params): Observable<any> {
    return this.http.post('/api/word', params);
  }

  updateWord(params): Observable<any> {
    return this.http.put('./api/word', params);
  }
}
