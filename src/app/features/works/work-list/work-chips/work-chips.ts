import { Component, input } from '@angular/core';
import { WorkStoreService } from '../../services/work-store.service';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-work-chips',
  imports: [MatChipsModule],
  templateUrl: './work-chips.html',
  styleUrl: './work-chips.scss',
})
export class WorkChips {

  constructor(public workStore: WorkStoreService) { }

  field = input.required<string>();
  values = input.required<string[]>();

  trackByIndex(index: number, item: string) {
    return index;
  }

  addFilter(value: string) {
    this.workStore.addFilter(this.field(), value);
  }
}
