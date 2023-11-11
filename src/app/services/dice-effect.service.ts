import { Injectable } from '@angular/core';
import { DiceInterface } from '../interfaces/dice.interface';

@Injectable({
  providedIn: 'root',
})
export class DiceEffectService {
  public diceEffects?: {[key: string]: {effects: string, effectId: string}};
  constructor() { }


  getDiceEffects(dices: DiceInterface[]) {
    for (const dice of dices) {

      console.log(dice);
    }
  }
}
