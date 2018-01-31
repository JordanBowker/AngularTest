import { Turn } from './turn';

export interface Scorecard {
    playerId: number;
    startingScore: number;
    turns: Turn[];
}
