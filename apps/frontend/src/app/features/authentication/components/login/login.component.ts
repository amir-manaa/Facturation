import { Component, OnInit, inject, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '@services';
import { ILoginForm } from '@models';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, CardModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  private authService = inject(AuthService);
  private router = inject(Router);
  private activateRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.initLoginForm();
  }
  
  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.form['email'].value;
    const password = this.form['password'].value;
    this.authService.login(email, password)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.router.navigate(['/home']));
  }

  get form() {
    return this.loginForm.controls;
  }

  private initLoginForm() {
    this.redirectIfLogged();
    this.loginForm = new FormGroup<ILoginForm>({
      email: new FormControl<string>('', {nonNullable: true}),
      password: new FormControl<string>('', {nonNullable: true})
    })
  }

  private redirectIfLogged() {
    if (this.activateRoute.snapshot.data['isAuth']) {
      this.router.navigate(['/home']);
      return;
    }
  }  
}
