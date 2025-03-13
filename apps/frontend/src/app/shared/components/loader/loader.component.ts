import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '@services';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
    selector: 'app-loader',
    imports: [CommonModule, MatProgressSpinnerModule],
    templateUrl: './loader.component.html',
    styleUrl: './loader.component.sass',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  isLoading$ = inject(LoaderService).isLoading$;
}
