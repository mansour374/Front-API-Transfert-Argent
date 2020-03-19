import { ListeUserComponent } from './components/liste-user/liste-user.component';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'login', component: ConnexionComponent},
  {path: 'addUser', component:  CreateuserComponent},
  {path: 'ListeUser', component: ListeUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
