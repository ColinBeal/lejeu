import { Component, OnInit } from '@angular/core';
import { DiceEffectService } from './services/dice-effect.service';
import { DiceEffect, DiceFaceNames, DiceInterface } from './interfaces/dice.interface';
import { EffectsLabel } from './constants/dice.constant';
import { BarInterface } from './interfaces/bar.interface';
import { ShipDataInterface } from './interfaces/ship.interface';
import { CombatStateInterface } from './interfaces/combat.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'lejeu';

  public diceFaces: {[key: number]: DiceFaceNames} = {
    0: 'EVD',
    1: 'WEA',
    2: 'X',
    3: 'SHD',
    4: 'SPC',
    5: 'MON'
  }
  public DiceEffectsLabel = EffectsLabel
  public diceEffects: DiceEffect[];

  public lockedDiceFaces?: {[key: string]: string[]};

  public dices: DiceInterface[] = [];
  public blockReroll: boolean = false;
  public playerData: ShipDataInterface;
  public enemyData: ShipDataInterface;
  public combatState: CombatStateInterface = {
    turn: 1,
    phase: 'player',
    moneyModifier: 0,
    doomed: false
  }

  constructor(private diceEffectService: DiceEffectService) {

  }

  ngOnInit(): void {
    this.initDices()
    this.playerData = this.generateData(15, 15, 10, 15, 15, 0);
    this.enemyData = this.generateData(20, 10, 10, 20, 10);
  }

  initDices() {
    this.dices = [];
    for (let index = 0; index < 10; index++) {
      this.dices.push(
        {
          symbol: this.diceThrow(),
          locked: false
        }
      )
    }
    this.checkDices(true);
  }

  nextPhase() {
    if (this.combatState.phase === 'player') {
      console.log(this.diceEffects);
      this.diceEffectService.triggerDiceEffects(this.diceEffects, this.playerData, this.enemyData, this.combatState);
      this.combatState.doomed = false;
      this.combatState.phase = 'enemy';
      setTimeout(() => {
        this.nextPhase();
      }, 1000);
    }
    else {
      this.combatState.phase = 'player';
      this.combatState.turn++;
      this.initDices();
    }
  }

  generateData(healthMaxValue: number,
               shieldMaxValue: number,
               specialMaxValue: number,
               health: number,
               shield: number,
               moneyModifier?: number): ShipDataInterface {
    return {
      healthBar: {
        type: 'health' as const,
        label: 'HP' as const,
        maxValue: healthMaxValue
      },
      shieldBar: {
        type: 'shield' as const,
        label: 'SHD' as const,
        maxValue: shieldMaxValue
      },
      specialBar: {
        type: 'special' as const,
        label: 'SPC' as const,
        maxValue: specialMaxValue
      },
      health: health,
      shield: shield,
      special: 0,
      evadeStack: 0,
      evade: 0,
      moneyModifier: moneyModifier
    };
  }

  takeDamage(damage: number, ship: ShipDataInterface) {
    ship.health = ship.health - damage;
  }

  diceThrow() {
    return this.diceFaces[Math.floor(Math.random() * 6)];
  }

  rethrowDices() {
    this.blockReroll = true;
    const intervals: number[] = [];
    let symbol: DiceFaceNames[] = [];
    let unlockedDices = this.dices.filter(dice => !dice.locked)
    for (let index = 0; index < unlockedDices.length; index++) {
      symbol[index] = this.diceThrow();
      intervals[index] = window.setInterval(() => {
        this.turnDiceFaces(unlockedDices[index])
      }, 50);
    }
    setTimeout(() => {
      for (let index = 0; index < unlockedDices.length; index++) {
        clearInterval(intervals[index]);
        unlockedDices[index].symbol = symbol[index]
      }
      this.checkDices(false);
      this.blockReroll = false;
    }, 1000)
  }

  turnDiceFaces(dice: DiceInterface) {
    dice.symbol = this.diceThrow();
  }

  toggleDice(dice: DiceInterface, locked: boolean) {
    if (locked) {
      if (dice.symbol === 'X') {
        return;
      }
      dice.locked = false;
      return this.checkDices(false);
    }
    dice.locked = true;
    return this.checkDices(false);
  }

  checkDices(first: boolean) {
    this.lockedDiceFaces = {};
    for (const dice of this.dices) {
      if (dice.symbol === 'X') {
        dice.locked = true;
      }
      if(dice.locked) {
        if (!this.lockedDiceFaces[dice.symbol]) {
          this.lockedDiceFaces[dice.symbol] = [dice.symbol]
        }
        else {
          this.lockedDiceFaces[dice.symbol].push(dice.symbol)
        }
      }
    }
    if (this.lockedDiceFaces['X'] && this.lockedDiceFaces['X'].length > 3 ) {
      this.combatState.doomed = true;
    }
    this.diceEffects = this.diceEffectService.getDiceEffects(this.dices.filter(dice => dice.locked));
  }
}
