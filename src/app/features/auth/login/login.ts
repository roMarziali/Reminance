import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { AuthStore } from '../../../core/auth/auth.store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  constructor(private authService: AuthService, authStore: AuthStore, router: Router, private route: ActivatedRoute) {
    if (authStore.isAuthenticated()) {
      const returnUrl = route.snapshot.queryParamMap.get('returnUrl');
      router.navigateByUrl(returnUrl || '/menu');
    }
  }

  private formBuilder = inject(FormBuilder)
  emailControl = new FormControl('');
  passwordControl = new FormControl('');
  form = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  submit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.getRawValue();
    if (!email || !password) return;
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    this.authService.login(email, password, returnUrl);
  }
}
