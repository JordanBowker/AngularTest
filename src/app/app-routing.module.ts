import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerProfileComponent } from "./player/player-profile.component";
import { GameComponent } from "./game/game.component";
import { LoginComponent } from "./login/login.component";

import { PlayerGuardService } from "./player/player-guard.service";

const routes: Routes = [
  {
    path: "profile",
    canActivate: [PlayerGuardService],
    component: PlayerProfileComponent
  },
  {
    path: "game",
    canActivate: [PlayerGuardService],
    component: GameComponent
  },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", redirectTo: "login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
