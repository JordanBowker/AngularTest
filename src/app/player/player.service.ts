import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";

import { IPlayer } from "./player"
import { AuthenticationService } from "../authentication/authentication.service";

@Injectable()
export class PlayerService {

  constructor(private readonly http: HttpClient,
              private readonly authService: AuthenticationService) {
  }

  getPlayer(): Observable<IPlayer> {
    return this.http.get<IPlayer>("http://localhost/DartsTrackerApi/player",
      {
        headers: new HttpHeaders().append("Authorization", `Bearer ${this.authService.token}`),
      });
  }
}
