import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInputModule } from "@angular/material/input";
import { MatDialogContent, MatDialogActions, MatDialogTitle, MatDialogClose, MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-work-form',
  imports: [ReactiveFormsModule, MatFormField, MatInputModule, MatDialogContent, MatButtonModule, MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './work-form.html',
  styleUrl: './work-form.scss',
})
export class WorkForm {

  readonly dialogRef = inject(MatDialogRef<WorkForm>);

  constructor() { }

  private formBuilder = inject(FormBuilder)
  title = new FormControl('');
  form = this.formBuilder.group({
    title: ['', Validators.required],
    titleAlias: this.formBuilder.array<string>([])
  });

  get titleAlias(): FormArray<FormControl<string>> {
    return this.form.get('titleAlias') as FormArray<FormControl<string>>;
  }

  submit() {
    if (this.form.invalid) return;
    console.log(this.form.value);
    this.dialogRef.close("update");
  }
}
