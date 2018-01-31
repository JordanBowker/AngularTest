import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map"

import { LoginModel } from "../login/login-model"
import { IAuthenticationModel } from "./authentication-model"

@Injectable()
export class AuthenticationService {

  private storageName: string = "currentPlayer";
  private loggedInPlayerKey : string = "playersId";
  token: string;

  constructor(private readonly http: HttpClient) {
    const authModel = this.getAuthModelFromStorage();
    if (authModel) {
      this.token = authModel.access_token;
    } else {
      this.token = null;
    }
  }

  authorise(loginModel: LoginModel): Observable<boolean> {
    const body = `grant_type=password&username=${loginModel.username}&password=${loginModel.password}`;
    return this.http.post<IAuthenticationModel>("http://localhost/DartsTrackerApi/RequestToken", body)
      .map(authModel => {
        if (authModel) {
          const authToken = authModel.access_token;
          this.token = authToken;
          localStorage.setItem(this.storageName, JSON.stringify(authModel));
          this.setLoggedInPlayersId();
          return true;
        } else {
          return false;
        }
      }
      );
  }

  clearSession(): void {
    this.token = null;
    localStorage.removeItem(this.storageName);
    localStorage.removeItem(this.loggedInPlayerKey);
  }

  isAuthenticated(): boolean {
    const authModel = this.getAuthModelFromStorage();
    if (authModel) {
      return authModel.expires_in > 0;
    }
    else return false;
  }

  private getAuthModelFromStorage() {
    return JSON.parse(localStorage.getItem(this.storageName)) as IAuthenticationModel;
  }

  private setLoggedInPlayersId(): void {
    this.http.get<number>("http://localhost/DartsTrackerApi/Player/LoggedInPlayersId",
      {
        headers: new HttpHeaders().append("Authorization", `Bearer ${this.token}`),
      }).subscribe(id=> {
        localStorage.setItem(this.loggedInPlayerKey, JSON.stringify(id));
      });
  }

  loggedInPlayersId(): number {
    return JSON.parse(localStorage.getItem(this.loggedInPlayerKey)) as number;
  }
}
