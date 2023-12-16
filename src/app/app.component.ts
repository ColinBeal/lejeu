import { Component, OnInit } from '@angular/core';
import { DiceEffectService } from './services/dice-effect.service';
import { DiceEffect, DiceFaceNames, DiceInterface } from './interfaces/dice.interface';
import { EffectsLabel } from './constants/dice.constant';
import { BarInterface } from './interfaces/bar.interface';

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
  public diceEffects?: DiceEffect[];

  public lockedDiceFaces?: {[key: string]: string[]};

  public dices: DiceInterface[] = []
  public doomed: boolean = false;
  public healthBar: BarInterface;
  public health: number = 15;
  public shieldBar: BarInterface;
  public specialBar: BarInterface;

  constructor(private diceEffectService: DiceEffectService) {

  }

  ngOnInit(): void {
    this.initDices()
    this.healthBar = {
      type: 'health',
      label: 'HP',
      maxValue: 15
    }
    this.shieldBar = {
      type: 'shield',
      label: 'SHD',
      maxValue: 15
    }
    this.specialBar = {
      type: 'special',
      label: 'SPC',
      maxValue: 9
    }
  }

  initDices() {
    this.dices = [];
    this.doomed = false;
    for (let index = 0; index < 9; index++) {
      this.dices.push(
        {
          symbol: this.diceThrow(),
          locked: false
        }
      )
    }
    this.checkDices(true);
  }

  takeDamage(damage: number) {
    this.health = this.health - damage;
  }

  diceThrow() {
    return this.diceFaces[Math.floor(Math.random() * 6)];
  }

  rethrowDices() {
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
      this.doomed = true;
    }
    this.diceEffects = this.diceEffectService.getDiceEffects(this.dices.filter(dice => dice.locked));
  }

  nextPhase() {
    this.initDices();
  }
}
