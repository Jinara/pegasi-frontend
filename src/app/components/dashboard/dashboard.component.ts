import { Component } from '@angular/core';
import { UserService } from '../../services/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../models/user-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  userId: string;
  user: UserModel;

  constructor(
    private userService: UserService,
    private router: Router,
    private avRoute: ActivatedRoute
  ) {
    const idParam = 'id';

    if (this.avRoute.snapshot.params[idParam]) {
      this.userId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.userService.getById(this.userId.toString()).subscribe(
      (data) => {
        this.user = data as UserModel;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
  get sex() {
    if(this.user?.sex === 'female')
      return 'Mujer'
    return 'Hombre'
  }

  get pregnancy() {
    if(this.user?.sex === 'female')
      return this.user?.pregnancy
    return false
  }

  get birthdate() {
    console.log(this.user?.birthdate)
    return 'mañana'
  }
}
