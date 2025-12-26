import { Component, inject, ChangeDetectionStrategy, computed, Signal, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInputModule } from "@angular/material/input";
import { MatDialogContent, MatDialogActions, MatDialogTitle, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatChipGrid, MatChipsModule } from "@angular/material/chips";
import { MatIcon } from "@angular/material/icon";
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { WorkStoreService } from '../services/work-store.service';

export interface WorkFormField {
  name: string;
  label: string;
  type: string;
  suggestFromPrevious?: boolean;
}

@Component({
  selector: 'app-work-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatDialogContent,
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
    MatAutocompleteModule,
    MatDialogClose,
    MatChipGrid,
    MatChipsModule,
    MatIcon
  ],
  templateUrl: './work-form.html',
  styleUrl: './work-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkForm {


  constructor(public workStore: WorkStoreService) { }

  readonly dialogRef = inject(MatDialogRef<WorkForm>);

  public suggestions: Record<string, string[]> = {};

  public fields: WorkFormField[] = [
    { name: "title", label: "Titre", type: "string" },
    { name: "titleAlias", label: "Alias", type: "chips" },
    { name: "type", label: "Type", type: "chips", suggestFromPrevious: true },
    { name: "licenses", label: "Série", type: "chips", suggestFromPrevious: true },
    { name: "artists", label: "Artistes", type: "chips", suggestFromPrevious: true },
    { name: "publishers", label: "Éditeurs", type: "chips", suggestFromPrevious: true },
    { name: "genres", label: "Genres, thèmes", type: "chips", suggestFromPrevious: true },
    { name: "countries", label: "Pays", type: "chips", suggestFromPrevious: true },
    { name: "releaseDate", label: "Date de sortie", type: "date" }
  ];

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    title: ['', Validators.required],
    titleAlias: this.formBuilder.array<string>([]),
    type: this.formBuilder.array<string>([]),
    licenses: this.formBuilder.array<string>([]),
    artists: this.formBuilder.array<string>([]),
    publishers: this.formBuilder.array<string>([]),
    genres: this.formBuilder.array<string>([]),
    countries: this.formBuilder.array<string>([]),
    releaseDate: ['']
  });

  readonly fieldValues: Record<string, Signal<string>> = this.fields.reduce((acc, field) => {
    acc[field.name] = signal(this.form.get(field.name)?.value || '');
    return acc;
  }, {} as Record<string, Signal<string>>);

  readonly filteredSuggestions: Signal<Record<string, string[]>> = computed(() => {
    const filtered: Record<string, string[]> = {};
    for (const field of this.fields) {
      if (!field.suggestFromPrevious) continue;
      const currentValue = this.fieldValues[field.name]?.()?.toLowerCase() || '';
      filtered[field.name] = currentValue
        ? this.suggestions[field.name].filter(value => value.toLowerCase().includes(currentValue))
        : [...this.suggestions[field.name]];
    }
    return filtered;
  });

  getField(fieldName: string): FormArray<FormControl<string>> {
    return this.form.get(fieldName) as FormArray<FormControl<string>>;
  }

  addChipsValue(value: string, fieldName: string) {
    if (!value) return;
    value = value.trim();
    if (value && !this.getField(fieldName).value.includes(value)) {
      this.getField(fieldName).push(new FormControl(value, { nonNullable: true }));
    }
  }

  removeChipsValue(index: number, fieldName: string) {
    this.getField(fieldName).removeAt(index);
  }

  selected(event: MatAutocompleteSelectedEvent, fieldName: string): void {
    this.addChipsValue(event.option.value, fieldName);
    event.option.deselect();
  }

  submit() {
    if (this.form.invalid) return;
    this.workStore.addWork(this.form.value);
    this.dialogRef.close("update");
  }
}
