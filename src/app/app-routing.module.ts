import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';

const routes: Routes = [
  {
    path: 'admin',
    component: UsersComponent
  },
  {
    path: '',
    component: UserFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
