import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SpSelectComponent } from '../../../../../sp-lib/src/lib/sp-select/sp-select.component';
import { SpDividerComponent } from '../../../../../sp-lib/src/public-api';

/**
 * SelectPageComponent component
 * @author Alessio Giacché
 * @version 1.0.0
 * @since 2.0.0
 */
@Component({
  selector: 'app-select-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // Component import
    SpDividerComponent,
    SpSelectComponent
  ],
  templateUrl: './select-page.component.html',
  styleUrl: './select-page.component.scss'
})
export class SelectPageComponent {
  // Example
  public favoriteFruit = '';

  /**
   * Change select value
   * @param value the value
   */
  public onSelectChange(value: string) {
    alert('Selected value: ' + value);
  }

  /**
   * Constructor for SelectPageComponent component
   */
  constructor() {}
}
