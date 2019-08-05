import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/assistants'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(mod => mod.LoginModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'assistants',
    loadChildren: () =>
      import('./assistants/assistants.module').then(
        mod => mod.AssistantsModule
      ),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
