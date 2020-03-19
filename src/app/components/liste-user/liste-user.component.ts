import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.css']
})
export class ListeUserComponent implements OnInit {

  users;

  constructor(private Userservice: UserService) { }

  ngOnInit(): void {

    this.Userservice.getUser().subscribe(
      data => {
        this.users = data;
        console.log(this.users_);
      }

    );
  }

  // Function de blocage ou déblocage d'un utilisateur:
  changeStatus(id, status) {
    this.Userservice.statusUser(id, status).subscribe(
      data => {
        console.log(data);
      }
    );
  }

}
