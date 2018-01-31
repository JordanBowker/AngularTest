import { Component, OnInit } from "@angular/core";
import { ConfirmationService} from "primeng/primeng";
import { Router } from "@angular/router";

import { GameService } from "./game.service";
import { Game } from "./game";
import { Scorecard } from "./scorecard";
import { CurrentTurn } from "./currentTurn";
import { DisplayedTurnScore } from "./displayedTurnScore";
import { PlayerService } from "../player/player.service";

@Component({
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
})

export class GameComponent implements OnInit {
  game: Game;
  showGame: boolean;
  showStartGameOptions: boolean;
  currentTurn: CurrentTurn;
  displayedTurnScores: DisplayedTurnScore[] = [];
  currentScore:number;
  allowInput: boolean;
  confirmationText: string;
  showEndGameButton: boolean = true;

  playersId :number;
  playersScoreCard : Scorecard;

  constructor(private readonly confirmationService: ConfirmationService,
              private readonly gameService: GameService,
              private readonly router: Router,
              private readonly playerService: PlayerService) {}

  ngOnInit() {
    this.checkForExistingGame();
  }

  checkForExistingGame() : void {
    this.gameService.getActiveGame()
        .subscribe(game => {
          if (game.id) {
            this.game = game;
            this.displayGame();
          } else {
            this.showStartGameOptions = true;
          }
        });
  }

  displayGame(): void{
    this.startTurn();
    this.showGame = true;
    this.showStartGameOptions = false;
  }

  startTurn(): void {
    this.playersScoreCard = this.gameService.loggedInPlayersScorecard(this.game);
    this.currentTurn = new CurrentTurn();
    this.allowInput = true;
    this.showEndGameButton = true;
    this.generateTurnScoreRows();
    this.updateCurrentScore();
  }

  generateTurnScoreRows() : void{
    this.displayedTurnScores = [];
    this.displayedTurnScores.push(new DisplayedTurnScore("-",this.game.scorecards[0].startingScore,"-"));

    const turn = this.playersScoreCard.turns;
    for(let i in turn) {
      if (turn.hasOwnProperty(i)) {
        const previousScore = turn[i].totalScore;
        const remainingScore = (this.displayedTurnScores[i].remainingScore - previousScore);
         this.displayedTurnScores.push(new DisplayedTurnScore(i, remainingScore, previousScore.toString()));
      }
    }
  }

  updateCurrentScore(): void {
    const remainingScore = this.displayedTurnScores[this.displayedTurnScores.length-1].remainingScore;
    this.currentScore = remainingScore - this.currentTurn.totalScore();
  }

  createGameWithStartingScore(startingScore: number): void  {
    this.gameService.startNewGame(startingScore)
      .subscribe(game => {
        this.game = game;
        this.displayGame();
      });
  }

  onEnterScore() : void {
    this.allowInput = false;
    this.confirmationText = `You scored ${this.currentTurn.totalScore()}. Is this correct?`;
  }

  onBust()  : void{
    this.allowInput = false;
    this.currentTurn.haveBust = true;
    this.confirmationText = "You bust. Is this correct?";
  }

  onConfirmTurn(): void {
    this.gameService.updateGameScore(this.currentTurn)
      .subscribe(game => {
        this.game = game;
        if (this.game.isActive === false) this.router.navigate(["/profile"]);
        this.startTurn();
      });
  }

  onReEnterScore() : void {
    this.showEndGameButton = true;
    this.currentTurn.haveBust = false;
    this.allowInput = true;
  }

  onEndGame() : void {
    this.showEndGameButton = false;
  }

  onConfirmEndGame(): void {
    this.gameService.endGame(this.game.id)
      .subscribe(() => {
        this.router.navigate(["/profile"]);
      });
  }

  preventInvalidDartScores(event: any) {
    const inputChar = +String.fromCharCode(event.charCode);
    const currentValue = event.target.value;
    const newValue = currentValue+inputChar;
    if(newValue <61 && this.currentScore- +newValue + +currentValue>=0) return;
    event.preventDefault();
  }

}
