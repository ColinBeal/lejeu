import { BarInterface } from './bar.interface';

export interface ShipDataInterface {
  evadeStack: number;
  evade: number;
  health: number;
  shield: number;
  special: number;
  healthBar: BarInterface;
  shieldBar: BarInterface;
  specialBar: BarInterface;
  moneyModifier?: number;
};
