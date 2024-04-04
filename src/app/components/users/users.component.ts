import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserModel } from '../../models/user-model';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users: UserModel[];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getAll().subscribe(
      (data) => {
        console.log('users: ', data)
        this.users = data as UserModel[];
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
        //this.loading = false;
      }
    );
  }

  onEditUser() {
    console.log('voy a editar')
  }
}
