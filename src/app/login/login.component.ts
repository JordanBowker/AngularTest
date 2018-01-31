import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService } from "primeng/primeng";


import { AuthenticationService } from "../authentication/authentication.service";
import { LoginModel } from "./login-model";
import { NavbarService } from "../navbar/navbar.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  loginModel = new LoginModel();
  disableLoginButton: boolean = false;

  constructor(private readonly authService: AuthenticationService,
    private readonly router: Router,
    private readonly navbarService: NavbarService,
    private readonly confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.navbarService.hide();
    this.authService.clearSession();
  }

  login() {
    this.disableLoginButton = true;
    this.authService.authorise(this.loginModel)
      .subscribe((): void => {
        this.navbarService.show();
        this.router.navigate(["/profile"]);
      }, (): void => {
        this.showErrorDialog();
        this.loginModel.password = "";
        this.disableLoginButton = false;
      }
      );
  }

  showErrorDialog(): void {
    this.confirmationService.confirm({
      message: "Invalid Login Details",
      acceptVisible: false
    });
  }
}
