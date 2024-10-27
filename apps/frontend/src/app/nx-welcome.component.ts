import { Component, ViewEncapsulation, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { IApiResponse } from '@models';

@Component({
  selector: 'app-nx-welcome',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  template: ``,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent implements OnInit {

 ngOnInit(): void {
  this.checkLoggedUser();
 }

 async checkLoggedUser() {
 }
}
