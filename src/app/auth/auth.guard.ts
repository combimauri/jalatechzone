import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    const path = next.routeConfig.path;

    return this.auth.currentUser.pipe(
      first(),
      map(user => {
        if (user) {
          if (path === 'login') {
            this.router.navigate(['/']);

            return false;
          }

          return true;
        } else if (path === 'login') {
          return true;
        }

        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
