import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http/src/response';
import { ElementRef } from '@angular/core';

@Injectable()
export class MediaService {
  constructor(private http: HttpClient) { }
  baseUrl = 'http://media.mw.metropolia.fi/wbma/';
  login(username: string, password: string) {
    const body = {
      'username': `${username}`,
      'password': `${password}`
    };
    const settings = {
      headers : new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.http.post(this.baseUrl + 'login', body, settings);
  }

  register(username: string, password: string, email: string) {
    const body = {
      'username': `${username}`,
      'password': `${password}`,
      'email': `${email}`
    };
    const settings = {
      headers : new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.http.post(this.baseUrl + 'users', body, settings);
  }

  getUserData() {
    const token = localStorage.getItem('token');
    const settings = {
      headers : new HttpHeaders().set('x-access-token', token)
    };

    return this.http.get(this.baseUrl + 'users/user', settings);
  }

  uploadFile(file: File, title: ElementRef, description: ElementRef) {
    const token = localStorage.getItem('token');
    const settings = {
      headers : new HttpHeaders().set('x-access-token', token)
    };
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('title', title.nativeElement.value);
    formData.append('description', description.nativeElement.value);
    return this.http.post(this.baseUrl + 'media', formData, settings);
  }
}
