import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'partialDate',
  standalone: true
})
export class PartialDatePipe implements PipeTransform {

  transform(value?: string | null): string {
    if (!value) return '';

    const parts = value.split('-');

    if (parts.length === 1) {
      // YYYY
      return parts[0];
    }

    if (parts.length === 2) {
      // YYYY-MM
      const [year, month] = parts;
      const date = new Date(+year, +month - 1);
      const string = date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
      return String(string).charAt(0).toUpperCase() + String(string).slice(1);
    }

    if (parts.length === 3) {
      // YYYY-MM-DD
      const [year, month, day] = parts;
      const date = new Date(+year, +month - 1, +day);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    }

    return value;
  }
}
