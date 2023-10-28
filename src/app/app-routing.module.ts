import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponentComponent } from './form-component/form-component.component';
import { UserListComponent } from './user-list/user-list.component';
import { EdittingUserComponent } from './editting-user/editting-user.component';

const routes: Routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: 'form', component: FormComponentComponent },
  {path: 'list', component: UserListComponent},
  {path: 'edit/:id', component: EdittingUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
