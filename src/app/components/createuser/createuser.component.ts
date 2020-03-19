import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { RoleService } from './../../services/role.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  role;
  formuser: FormGroup;
  iri = `/api/roles/`;
  error: string;
  constructor(private servrole: RoleService, private servuser: UserService, private route: Router, private fb:FormBuilder ) { }

  ngOnInit(): void {
    this.role = this.servrole.getRoles()
    // tslint:disable-next-line: triple-equals
    .pipe(map((array) => array.filter(role => role.libelle != 'ADMIN_SYSTEME')))
    .subscribe(data => {

      this.role = data;
      console.log(data);
    });
    // Récupération des données de l'utilisateur connecté avec le Formgroup
    this.formuser = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    });
  }
  get control(){
    return this.formuser.controls;
  }
// Fonction de création utilisateur
OncreateUser(){
  // changement de la valeur de role en iri
  this.formuser.value.role = `${this.iri}${this.control.role.value}`;
  console.log(this.formuser.value.role);

  this.servuser.createUser(this.formuser.value).subscribe(
    data => {
      console.log(data);
      alert('Utilisateur ajouté avec succés');
    },
    errorhttp => {
     this.error = errorhttp.error['hydra:description'];
     alert(this.error);
  }


  )
}

}
