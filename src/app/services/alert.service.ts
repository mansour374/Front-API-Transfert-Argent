import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<any>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {

     // effacer les messages d'alerte sur le changement de route sauf si l'indicateur «keepAfterRouteChange» est vrai
     this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          if (this.keepAfterRouteChange) {
              // ne conserver que pour un seul changement d'itinéraire
              this.keepAfterRouteChange = false;
          } else {
              // effacer le message d'alerte
              this.clear();
          }
      }
  });
}

getAlert(): Observable<any> {
  return this.subject.asObservable();
}

success(message: string, keepAfterRouteChange = false) {
  this.keepAfterRouteChange = keepAfterRouteChange;
  this.subject.next({ type: 'success', text: message });
}

error(message: string, keepAfterRouteChange = false) {
  this.keepAfterRouteChange = keepAfterRouteChange;
  this.subject.next({ type: 'error', text: message });
}

clear() {
  //effacer en appelant subject.next () sans paramètres
  this.subject.next();
   }
}
