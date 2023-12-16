import { Component, Input, OnChanges, OnInit, SimpleChanges, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { BarInterface } from 'src/app/interfaces/bar.interface';

@Component({
  selector: 'bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})

export class BarComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChildren('singleBar') singleBars: QueryList<any>;
  @Input() barConfiguration: BarInterface = {
    type: 'health',
    label: 'HP',
    maxValue: 10
  };
  @Input() currentValue: number = 0;

  public bars: any[] = []
  constructor() {

  }

  ngOnInit(): void {
    this.bars = new Array(this.barConfiguration.maxValue).fill(0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentValue']) {

      if (changes['currentValue'].currentValue < changes['currentValue'].previousValue) {
        this.animateBars(changes['currentValue'].previousValue - 1, changes['currentValue'].currentValue - 1, 'shrink');
      }
    }
  }

  ngAfterViewInit(): void {
    console.log(this.currentValue);
    const barsArray = this.singleBars.toArray();
    for (const bar of barsArray) {
      bar.nativeElement.style.height = 100/this.barConfiguration.maxValue + '%'
    }
    this.growBars(0, this.currentValue-1);
    //this.animateBars(this.barConfiguration.maxValue-1, -1, 'grow');
  }

  growBars(startIndex: number, endIndex: number) {
    const barsArray = this.singleBars.toArray();
    let delay = 0;
    for (let i = startIndex; i <= endIndex; i++) {
      setTimeout(() => {
      const bar = barsArray[i].nativeElement;
      bar.style.animation = 'growAnimation 0.25s';
      bar.style.visibility = 'visible';
      }, delay);
    delay += 250;
    }
  }

  shrinkBars(startIndex: number, endIndex: number) {
  }

 animateBars(currentIndex: number, endIndex: number, direction: 'grow' | 'shrink') {
    if (currentIndex !== endIndex) {
      const barsArray = this.singleBars.toArray();
      const bar = barsArray[currentIndex].nativeElement;
      if (direction === 'grow') {
        if (currentIndex < this.singleBars.length) {
          bar.style.animation = 'growAnimation 0.25s';
          bar.style.visibility = 'visible';
          setTimeout(() => {
            this.animateBars(currentIndex - 1, endIndex, direction); // Animate the next bar after a delay
          }, 250); // Delay between animations (1 second)
        }
      }
      else {
        bar.style.animation = 'shrinkAnimation 0.25s';
        setTimeout(() => {
          bar.style.visibility = 'hidden';
          this.animateBars(currentIndex + 1, endIndex, direction); // Animate the next bar after a delay
        }, 250); // Delay between animations (1 second)
      }
    }
  }
}
