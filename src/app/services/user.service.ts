import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post<any>(`${environment.apiUrl}/api/users`, user);

  }

  getUser() {

    return this.http.get<any>(`${environment.apiUrl}/api/users.json`);
  }

  statusUser( id: number , status: boolean ) {

    return this.http.put<any>(`${environment.apiUrl}/api/users/${id}`, {isActive: status});
  }
}
