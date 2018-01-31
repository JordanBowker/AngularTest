import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";

import { AuthenticationService } from "../authentication/authentication.service";
import { Game } from "./game"
import { CurrentTurn } from "./currentTurn"
import { Scorecard } from "./scorecard"

@Injectable()
export class GameService {

  constructor(private readonly http: HttpClient,
              private readonly authService: AuthenticationService) {
  }

  getActiveGame(): Observable<Game> {
    return this.http.get<Game>("http://localhost/DartsTrackerApi/Game/GetActiveGame",
      {
        headers: new HttpHeaders().append("Authorization", `Bearer ${this.authService.token}`)
      });
  }

  startNewGame(startingScore: number): Observable<Game> {
    return this.http.get<Game>(`http://localhost/DartsTrackerApi/Game/CreateGame/${startingScore}`,
      {
        headers: new HttpHeaders().append("Authorization", `Bearer ${this.authService.token}`)
      });
  }

  updateGameScore(turn: CurrentTurn): Observable<Game> {
    if (turn.haveBust) turn.setAllThrowsToZero();
    else turn.removeNullValues();
    let adas = JSON.stringify(turn);
    let headers = new HttpHeaders().append("Authorization", `Bearer ${this.authService.token}`);
    headers = headers.set("Content-Type", "application/json");
    return this.http.post<Game>("http://localhost/DartsTrackerApi/Game/UpdateGame", JSON.stringify(turn),
      {
        headers: headers
      });
  }

  endGame(gameId: number): Observable<Game> {
    return this.http.post<Game>("http://localhost/DartsTrackerApi/Game/EndGameWithoutWinner","",
      {
        headers: new HttpHeaders().append("Authorization", `Bearer ${this.authService.token}`)
  });
  }

  loggedInPlayersScorecard(game : Game) : Scorecard {
    return game.scorecards.filter(x=> x.playerId === this.authService.loggedInPlayersId())[0];
  }

}
