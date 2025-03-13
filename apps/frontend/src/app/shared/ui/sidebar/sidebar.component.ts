import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { ISidebarRouter } from './sidebar-routes.model';

@Component({
    selector: 'ui-sidebar',
    imports: [CommonModule, MatIcon, RouterLink, MatExpansionModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  readonly panelOpenState = signal(false);
  @Input({ required: true }) dashboardRoutes!: ISidebarRouter[];
}
