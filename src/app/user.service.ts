import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9000/users/registrar1';

  constructor(private http: HttpClient) {}

  register1(email: string, pwd1: string, pwd2: string) {
    const info = {
      email: email,
      pwd1: pwd1,
      pwd2: pwd2,
    };
    return this.http.post<string>('http://localhost:9000/users/registrar1', info, { responseType: 'text' as 'json' });
  }
  
}
