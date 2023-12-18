export interface CombatStateInterface {
  moneyModifier: number;
  phase: 'player' | 'enemy';
  turn: number;
  doomed: boolean;
}

