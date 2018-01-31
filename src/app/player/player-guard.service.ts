import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";

import { AuthenticationService } from "../authentication/authentication.service";


@Injectable()
export class PlayerGuardService implements CanActivate {

  constructor(private readonly authService: AuthenticationService,
              private readonly router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isAuthenticated() === false) {
      console.log("Not Authorised");
      this.router.navigate(["**"]);
      return false;
    }
    return true;
  }

}
