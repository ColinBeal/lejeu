import { Component, OnInit } from '@angular/core';
import { DiceEffectService } from './services/dice-effect.service';
import { DiceInterface } from './interfaces/dice.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'lejeu';

  public diceFaces: {[key: number]: string} = {
    0: 'EVD',
    1: 'WEA',
    2: 'X',
    3: 'SHD',
    4: 'MUL',
    5: 'MON'
  }

  public lockedDiceFaces?: {[key: string]: string[]};

  public dices: DiceInterface[] = []
  public doomed: boolean = false;


  constructor(private diceEffectService: DiceEffectService) {

  }

  ngOnInit(): void {
    this.initDices()
    this.animateBars(0, 20, 'grow');
  }

 animateBars(currentIndex: number, endIndex: number, direction: 'grow' | 'shrink') {
    if (currentIndex !== endIndex) {
      const singleBars = document.querySelectorAll('.single-bar');
      const bar = singleBars[currentIndex] as HTMLElement;
      if (direction === 'grow') {
        if (currentIndex < singleBars.length) {
          bar.style.animation = 'growAnimation 0.25s';
          bar.style.visibility = 'visible';
          setTimeout(() => {
            this.animateBars(currentIndex + 1, endIndex, direction); // Animate the next bar after a delay
          }, 250); // Delay between animations (1 second)
        }
      }
      else {
        bar.style.animation = 'shrinkAnimation 0.25s';
        setTimeout(() => {
          bar.style.visibility = 'hidden';
          this.animateBars(currentIndex - 1, endIndex, direction); // Animate the next bar after a delay
        }, 250); // Delay between animations (1 second)
      }
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

  diceThrow() {
    return this.diceFaces[Math.floor(Math.random() * 6)];
  }

  rethrowDices() {
    const intervals: number[] = [];
    let symbol: string[] = [];
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
    this.diceEffectService.getDiceEffects(this.dices.filter(dice => !dice.locked));
  }

  nextPhase() {
    this.initDices();
  }
}
