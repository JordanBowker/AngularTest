import { Component, OnInit } from "@angular/core";

import { PlayerService } from "./player.service";
import { IPlayer } from "./player"
import { AuthenticationService } from "../authentication/authentication.service";

@Component({
  templateUrl: "./player-profile.component.html",
  styleUrls: ["./player-profile.component.css"]
})
export class PlayerProfileComponent implements OnInit {

  player: IPlayer;

  constructor(private readonly playerService: PlayerService,
              private readonly authService: AuthenticationService) {}
  
  ngOnInit(): void {
    this.playerService.getPlayer()
      .subscribe(player => this.player = player,
                 error => console.log(error));
  }

}
