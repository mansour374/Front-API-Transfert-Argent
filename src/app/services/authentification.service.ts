import { User } from './../models/user';
import { environment } from './../../environments/environment';
import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private currentUserSubject: BehaviorSubject<User>;


  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  getLogin(username: string, password: string ) {
    console.log(environment.apiUrl);
    return this.httpClient.post<any>(`${environment.apiUrl}/api/login`, {username, password}).
    pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
  }));
  }

}
