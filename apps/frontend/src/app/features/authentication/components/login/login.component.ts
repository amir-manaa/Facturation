import {
  Component,
  OnInit,
  inject,
  DestroyRef,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { validator } from 'sequelize/types/utils/validator-extras';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
          this.router.navigateByUrl('/');
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
        validators: [Validators.required, Validators.email],
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
      this.router.navigateByUrl('/');
      return;
    }
  }
}
