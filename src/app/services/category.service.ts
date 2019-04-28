import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  saveCategory(params: any): Observable<any> {
    return this.http.post('/api/category', params);
  }

  getCategories(): Observable<any> {
    return this.http.get('/api/category');
  }
}
