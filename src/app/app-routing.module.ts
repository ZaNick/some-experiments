import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  // {
  //   path: 'login',
  //   loadChildren: './modules/login/login.module#LoginModule',
  // },
  // {
  //   path: 'signup',
  //   loadChildren: './modules/signup/signup.module#SignupModule',
  // },
  // {
  //   path: 'newPassword',
  //   loadChildren: './modules/new-password/new-password.module#NewPasswordModule'
  // },
  // {
  //   path: 'restore',
  //   loadChildren: './modules/restore/restore.module#RestoreModule',
  // },
  // {
  //   path: '',
  //   loadChildren: './modules/form-order/form-order.module#FormOrderModule',
  // },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
