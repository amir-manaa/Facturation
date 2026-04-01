import {
  Component,
  OnInit,
  inject,
  DestroyRef,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@services';
import { ILoginForm } from '@models';
import { customValidator } from '@utils';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitedForm = signal(false);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly activateRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.initLoginForm();
  }

  login(): void {
    this.submitedForm.set(true);
    if (this.loginForm.invalid) {
      return;
    }

    const email: string = this.form['email'].value;
    const password: string = this.form['password'].value;
    this.authService
      .login(email, password)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        complete: () => {
          this.router.navigateByUrl('/dashboard');
        },
      });
  }

  get form() {
    return this.loginForm.controls;
  }

  private initLoginForm(): void {
    this.redirectIfLogged();
    this.loginForm = new FormGroup<ILoginForm>({
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, customValidator.validateEmail()],
      }),
      password: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  private redirectIfLogged() {
    const isAuth = this.activateRoute.snapshot.data['isAuth'];
    if (!isAuth) {
      this.router.navigateByUrl('/dashboard');
      return;
    }
  }
}
