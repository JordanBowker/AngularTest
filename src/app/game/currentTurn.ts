export class CurrentTurn{
 throw1 : number;
 throw2? : number;
 throw3? : number;

 haveBust: boolean;

 constructor()
 {
   this.haveBust = false;
 }

 setAllThrowsToZero() : void {
   this.throw1 = 0;
   this.throw2 = 0;
   this.throw3 = 0;
 }

 totalScore() : number {
   let totalScore = 0;
   if(this.throw1) totalScore += this.throw1;
   if(this.throw2) totalScore += this.throw2;
   if(this.throw3) totalScore += this.throw3;
   return totalScore;
 }

 removeNullValues() : void {
   this.throw1 = this.throw1 || 0 ;
   this.throw2 = this.throw2 || 0 ;
   this.throw3 = this.throw3 || 0 ;
 }

}
