import { Component } from "@angular/core";

import { PlayerService } from "./player/player.service";
import { AuthenticationService } from "./authentication/authentication.service";
import { GameService } from "./game/game.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [
    PlayerService,
    AuthenticationService,
    GameService
  ]
})

export class AppComponent {
  name = "Darts Darts Darts";
  }
