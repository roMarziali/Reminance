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

  category = input.required<string>();
  values = input.required<string[]>();

  trackByIndex(index: number, item: string) {
    return index; // ou item si tes strings sont uniques
  }

  addFilter(value: string) {
    console.log(value);
  }
}
