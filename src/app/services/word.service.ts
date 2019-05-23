import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(
    private http: HttpClient,
    private message: NzMessageService
  ) { }

  getWordList(params?: any): Observable<any> {
    return this.http.get('/api/word', {params: params});
  }

  saveWord(params): Observable<any> {
    return this.http.post('/api/word', params)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.message.error(err.error.data)
          return of(err.error.data)
        })
      );
  }

  updateWord(params): Observable<any> {
    return this.http.put('./api/word', params);
  }

  deleteWord(id: number): Observable<any> {
    return this.http.delete(`/api/word/${id}`, )
  }
}
