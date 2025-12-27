import { Component, inject, computed, Signal, signal, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInputModule } from "@angular/material/input";
import { MatDialogContent, MatDialogActions, MatDialogTitle, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatChipGrid, MatChipsModule } from "@angular/material/chips";
import { MatIcon } from "@angular/material/icon";
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { WorkStoreService } from '../services/work-store.service';
import { MatSelectModule } from '@angular/material/select';
import { isoDateValidator } from '../../../validators/iso-date.validator';


export interface WorkFormField {
  name: string;
  label: string;
  type: string;
}

@Component({
  selector: 'app-session-form',
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
    MatIcon,
    MatSelectModule
  ],
  templateUrl: './session-form.html',
  styleUrl: './session-form.scss',
})
export class SessionForm {


  constructor(public workStore: WorkStoreService, @Inject(MAT_DIALOG_DATA) public data: { action: "creation" | "edit", workId: number, sessionId?: number }) {
    this.action = data.action;
    this.workId = data.workId;
    this.sessionId = (data.sessionId) ? data.sessionId : 0;
  }

  readonly dialogRef = inject(MatDialogRef<SessionForm>);
  readonly action: "creation" | "edit";
  readonly workId: number;
  readonly sessionId: number;

  public fields: WorkFormField[] = [
    { name: "date", label: "Date", type: "date" },
    { name: "modalities", label: "Modalités", type: "string" },
    { name: "comment", label: "Commentaire", type: "comment" },
    { name: "moods", label: "Ressentis", type: "chips" },
    { name: "ended", label: "Terminé", type: "options" },
    { name: "endedPrecision", label: "Précision sur la fin", type: "string" }
  ];

  endedOptions  = [
    {value: 'Y', viewValue: 'Oui'},
    {value: 'N', viewValue: 'Non'},
    {value: 'Ongoing', viewValue: 'En cours'},
  ];

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    date: ['', isoDateValidator()],
    modalities: [''],
    comment: ['', Validators.required],
    moods: this.formBuilder.array<string>([]),
    ended: [''],
    endedPrecision: [''],
  });

  moodsSuggestions = computed(() => {
    const works = this.workStore.works();
    return [
      ...new Set(
        works
          .flatMap(work => work.moods ?? [])
          .filter(mood => !!mood && mood.trim().length > 0)
      )
    ];
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
    if (this.action == "creation") this.workStore.addSession(this.form.value, this.workId);
    if (this.action == "edit") this.workStore.editSession(this.form.value, this.workId, this.sessionId);
    this.dialogRef.close("update");
  }

  getFilteredSuggestions(value: string): string[] {
    return (this.moodsSuggestions() ?? []).filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
  }
}
