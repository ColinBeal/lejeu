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
  constructor() {}

  ngOnInit(): void {
    this.bars = new Array(this.barConfiguration.maxValue).fill(0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentValue'] && changes['currentValue'].currentValue !== changes['currentValue'].previousValue && !changes['currentValue'].firstChange) {
      if (changes['currentValue'].currentValue < changes['currentValue'].previousValue) {
        this.shrinkBars(changes['currentValue'].previousValue-1, changes['currentValue'].currentValue-1);
      }
      if (changes['currentValue'].currentValue > changes['currentValue'].previousValue) {
        this.growBars(changes['currentValue'].previousValue-1, changes['currentValue'].currentValue-1);
      }
    }
  }

  ngAfterViewInit(): void {
    this.growBars(0, this.currentValue-1);
  }

  growBars(startIndex: number, endIndex: number) {
    if (endIndex <= this.barConfiguration.maxValue) {
      const barsArray = this.singleBars.toArray();
      let delay = 0;
      for (let i = startIndex; i <= endIndex; i++) {
        setTimeout(() => {
        const bar = barsArray[i].nativeElement;
        bar.style.animation = 'growAnimation 0.25s';
        bar.style.width = '100%';
        }, delay);
      delay += 250;
      }
    }
    return
  }

  shrinkBars(startIndex: number, endIndex: number) {
    if (startIndex >= 0)  {
      const barsArray = this.singleBars.toArray();
      let delay = 0;
      barsArray.reverse();
      for (let i = startIndex; i > endIndex; i--) {
        const bar = barsArray[i].nativeElement;
        setTimeout(() => {
          bar.style.width = '0px';
        }, delay);
        delay += 250;
      }
    }
    return
  }
}
