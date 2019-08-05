import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  validatingCredentials: boolean;
  authMessage: string;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  get currentUser(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  login(email: string, password: string): void {
    this.validatingCredentials = true;

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.authMessage = '';

        this.router.navigate(['']);

        this.validatingCredentials = false;
      })
      .catch(err => {
        this.authMessage = err;
        this.validatingCredentials = false;
      });
  }

  logout(): void {
    this.afAuth.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.error(err);
      });
  }
}
