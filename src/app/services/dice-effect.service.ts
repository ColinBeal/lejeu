import { Injectable } from '@angular/core';
import { DiceEffect, DiceFaceNames, DiceInterface, EffectIds, EvadeEffectsIDs, MoneyEffectsIDs, MultiplierEffectsIDs, ShieldEffectsIDs, WeaponEffectsIDs, XEffectsIDs } from '../interfaces/dice.interface';
import { ShipDataInterface } from '../interfaces/ship.interface';
import { CombatStateInterface } from '../interfaces/combat.interface';

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
          this.diceEffects.push(
            {
              effectId: key+value.toString() as EffectIds,
              value: value,
              type: key as DiceFaceNames
            }
          )
        }
      }
    }
    return this.diceEffects;
  }

  triggerDiceEffects(diceEffects: DiceEffect[], playerData: ShipDataInterface, enemyData: ShipDataInterface, combatState: CombatStateInterface) {
    console.log(diceEffects);
    if (!combatState.doomed) {
      for (const effect of diceEffects) {
        switch (effect.type) {
          case 'EVD':
            this.evadeEffect(effect, playerData);
            break;
          case 'MON':
            this.moneyEffect(effect, combatState);
            break;
          case 'SPC':
            this.specialEffect(effect, playerData, enemyData);
            break;
          case 'WEA':
            this.dealDamage(effect.value, enemyData, 1);
            break;
          case 'SHD':
            this.shieldEffect(effect, playerData);
            break;
          default:
            break;
        }
      }
    }
  }


  evadeEffect(effect: DiceEffect, playerData: ShipDataInterface) {
    playerData.evade = effect.value;
    for (let index = 0; index < effect.value; index++) {
      if(playerData.evadeStack < 9) {
          playerData.evadeStack++;
      }
      else {
        return;
      }
    }

  }

  moneyEffect(effect: DiceEffect, combatState: CombatStateInterface) {
    combatState.moneyModifier = effect.value * 25;
  }

  specialEffect(effect: DiceEffect, playerData: ShipDataInterface, enemyData: ShipDataInterface) {
    for (let index = 0; index < effect.value; index++) {
      setTimeout(() => {
        playerData.special++;
        if (playerData.special >= 10) {
          playerData.special = 0;
          this.dealDamage(10, enemyData, 0.5);
        }
      }, 250);
    }
  }

  shieldEffect(effect: DiceEffect, playerData: ShipDataInterface) {
    for (let index = 0; index < effect.value; index++) {
      setTimeout(() => {
        if (playerData.shield < playerData.shieldBar.maxValue) {
          playerData.shield++;
        }
      }, 250);
    }
  }

  dealDamage(damage: number, enemyData: ShipDataInterface, accuracy: number) {
    for (let index = 0; index < damage; index++) {
      setTimeout(() => {
        this.dealSingleDamage(1, enemyData, accuracy);
      }, 250);
    }
  }

  dealSingleDamage(damage: number, enemyData: ShipDataInterface, accuracy: number) {
    const hit = Math.random() < accuracy;
    if (hit) {
      if (enemyData.shield > 0) {
        enemyData.shield -= damage;
      }
      else {
        enemyData.health -= damage;
      }
    }
  }
}

