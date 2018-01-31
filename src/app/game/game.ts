import {Scorecard} from './scorecard';

export interface Game{
 id : number;
 isActive: boolean;
 scorecards: Scorecard[];
 }
