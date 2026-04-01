import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ui',
  imports: [CommonModule],
  templateUrl: './ui.html',
  styleUrl: './ui.scss',
})
export class UiComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled = false;
}
