import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  user: UserModel;
  errors: any[] = [];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.min(2)]],
      lastName: ['', [Validators.required, Validators.min(2)]],
      age: ['', [Validators.required, , Validators.min(5)]],
      sex: ['', [Validators.required]],
      pregnancy: [false, []],
      birthdate: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  save() {
    if (!this.form.valid) {
      return;
    }

    let userModel = new UserModel();
    userModel.firstName = this.firstName?.value;
    userModel.lastName = this.lastName?.value;
    userModel.age = this.age?.value;
    userModel.sex = this.sex?.value;
    userModel.birthdate = this.birthdate?.value;
    userModel.phoneNumber = this.phoneNumber?.value;

    if(this.sex?.value == 'female')
      userModel.pregnancy = this.pregnancy?.value;

    //TODO: Add a loader
    this.userService.insert(userModel).subscribe(
      (data) => {
        this.router.navigate(['/dashboard', data]);
      },
      (err: HttpErrorResponse) => {
        this.errors = [err.error.error];
      }
    );
  }

  goToList() {
    this.router.navigate(['/admin']);
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
