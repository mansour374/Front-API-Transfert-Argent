import { Router } from '@angular/router';

import { AuthentificationService } from './../../services/authentification.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-form-connexion',
  templateUrl: './form-connexion.component.html',
  styleUrls: ['./form-connexion.component.css']
})
export class FormConnexionComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private auth: AuthentificationService, private route: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup ({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }
  onlogin(){
    console.log(this.loginForm.value);
    let user = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.auth.getLogin(user.username, user.password).subscribe(
      data => {
        console.log(data);
        this.route.navigateByUrl("/addUser");
      },
      error=>{
          console.log(error);
      }
    );
  }

}







