import { Component, OnInit } from "@angular/core";
import {  MenuItem } from "primeng/primeng";

import { NavbarService } from "./navbar.service";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})

export class NavbarComponent implements OnInit {

  items: MenuItem[];

  constructor(public nav: NavbarService) { }

  ngOnInit(): void {
    this.items = [
      {
        label: "Game", routerLink: ["/game"]
      },
      {
        label: "Profile", routerLink: ["/profile"]
      },
      {
        label: "Stats"
      },
      {
        label: "Leaderboard"
      },
      { separator: true },
      {
        label: "Logout", routerLink: ["/login"]
      }
    ];
  }
}
