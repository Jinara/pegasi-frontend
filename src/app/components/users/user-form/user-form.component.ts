import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserModel } from '../../../models/user-model';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  form: FormGroup;
  errorMessage: any;
  user: UserModel;
  errors: any[] = []

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router
  ) {

    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: ['', [Validators.required]],
      sex: ['', []],
      pregnancy: ['', []],
      birthdate: ['', []],
      phoneNumber: ['', []],
      // sex: ['', [Validators.required]],
      // pregnancy: ['', [Validators.required]],
      // birthdate: ['', [Validators.required]],
      // phoneNumber: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  save() {
    if (!this.form.valid) {
      return;
    }

    // https://cloud.mongodb.com/v2/660c412d9d95192e7674f8e6#/metrics/replicaSet/660c419d6e32d028ebe48388/explorer/pegasiDB/users/find
    // https://github.com/IT-Labs/MEAN-Stack/blob/master/src/server/public/angular/client-app/src/app/app.module.ts

    let userModel = new UserModel();
    userModel.firstName = this.firstName?.value;
    userModel.lastName = this.lastName?.value;
    userModel.age = this.age?.value;

    this.userService.insert(userModel).subscribe(
      (data) => {
        this.router.navigate(['/', data]);
      },
      (err: HttpErrorResponse) => {
        if(err.error)
        console.log('holiiiiiii',err.error, err.error.error);
          this.errors = [err.error.error]
        //this.loading = false;
      }
    );
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get age() {
    return this.form.get('age');
  }

  get sex() {
    return this.form.get('sex');
  }

  get pregnancy() {
    return this.form.get('pregnancy');
  }

  get birthdate() {
    return this.form.get('birthdate');
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }
}
