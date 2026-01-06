import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  base = environment.apiUrl;
  constructor(private http: HttpClient) {}

  private headers() {
    return { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }

  get(path: string) {
    return this.http.get(`${this.base}${path}`, this.headers());
  }

  post(path: string, body: any) {
    return this.http.post(`${this.base}${path}`, body, this.headers());
  }

  put(path: string, body: any) {
    return this.http.put(`${this.base}${path}`, body, this.headers());
  }

  delete(path: string) {
    return this.http.delete(`${this.base}${path}`, this.headers());
  }
}
