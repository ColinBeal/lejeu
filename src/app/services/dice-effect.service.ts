import { Injectable } from '@angular/core';
import { DiceEffect, DiceFaceNames, DiceInterface, EffectIds, EvadeEffectsIDs, MoneyEffectsIDs, MultiplierEffectsIDs, ShieldEffectsIDs, WeaponEffectsIDs, XEffectsIDs } from '../interfaces/dice.interface';

@Injectable({
  providedIn: 'root',
})
export class DiceEffectService {
  public diceEffects?: DiceEffect[];

  constructor() { }


  getDiceEffects(dices: DiceInterface[]) {
    this.diceEffects = [];
    let diceFaceMap: {[key in DiceFaceNames]: number} = {
      'EVD': 0,
      'MON': 0,
      'SPC': 0,
      'WEA': 0,
      'SHD': 0,
      'X': 0
    }
    for (const dice of dices) {
      diceFaceMap[dice.symbol] = diceFaceMap[dice.symbol] +1
    }
    for (const [key , value] of Object.entries(diceFaceMap)) {
      let activated = false;
      if (value !== 0) {
        if ((value >= 4 && key === 'X') || (value >= 2 && key !== 'X')) {
          activated = true
        }
        this.diceEffects.push(
          {
            effectId: key+value.toString() as EffectIds,
            activated: activated,
            value: Array(value).fill(1),
            type: key as DiceFaceNames
          }
        )
      }
    }
    return this.diceEffects;
  }
}
