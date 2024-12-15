import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'sp-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-divider.component.html',
  styleUrl: './sp-divider.component.scss'
})
export class SpDividerComponent {
  // The divider height
  @Input() height = '1px';

  // The divider color
  @Input() color = '#666';

  // Constructor for SDividerComponent component
  constructor() {}
}
