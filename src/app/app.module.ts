import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { InputTextModule, ButtonModule, PanelModule, TieredMenuModule, ConfirmDialogModule, ConfirmationService} from "primeng/primeng";

import { AppComponent } from "./app.component";
import { GameComponent } from "./game/game.component";
import { PlayerProfileComponent } from "./player/player-profile.component";
import { LoginComponent } from "./login/login.component";
import { NavbarComponent } from "./navbar/navbar.component";

import { PlayerGuardService } from "./player/player-guard.service";
import { AuthenticationService } from "./authentication/authentication.service";
import { NavbarService } from "./navbar/navbar.service";
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    TieredMenuModule,
    ConfirmDialogModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    GameComponent,
    PlayerProfileComponent,
    LoginComponent,
    NavbarComponent
  ],
  providers: [
    PlayerGuardService,
    AuthenticationService,
    NavbarService,
    ConfirmationService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
