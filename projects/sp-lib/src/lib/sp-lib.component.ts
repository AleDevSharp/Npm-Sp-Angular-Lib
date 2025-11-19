import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/**
 * Official SpLibComponent component
 * @author Alessio Giacché
 * @version 1.0.0
 * @since 1.0.0
 */
@Component({
  selector: 'sp-lib',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>sp-lib works!</p>
  `,
  styles: ``
})
export class SpLibComponent {}
