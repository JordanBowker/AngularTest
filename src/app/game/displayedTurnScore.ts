export class DisplayedTurnScore{
  turnNumber : string;
  remainingScore: number;
  previousScore: string;

constructor(turnNumber:string,remainingScore: number, previousScore: string){
  this.turnNumber = turnNumber;
  this.remainingScore = remainingScore;
  this.previousScore = previousScore;
  }
}
