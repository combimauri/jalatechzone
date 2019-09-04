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
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./registration/registration.module').then(
        mod => mod.RegistrationModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'credentials',
    loadChildren: () =>
      import('./credentials/credentials.module').then(
        mod => mod.CredentialsModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'scanner',
    loadChildren: () =>
      import('./scanner/scanner.module').then(mod => mod.ScannerModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
