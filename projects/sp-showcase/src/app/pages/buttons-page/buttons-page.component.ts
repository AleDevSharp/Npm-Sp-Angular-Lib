import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SpBtnComponent, SpBtnTxtComponent, SpDividerComponent } from '../../../../../sp-lib/src/public-api';

/**
 * ButtonsPageComponent component
 * @author Alessio Giacché
 * @version 1.0.0
 * @since 2.0.0
 */
@Component({
  selector: 'app-buttons-page',
  standalone: true,
  imports: [
    CommonModule,
    // Component import
    SpBtnComponent,
    SpBtnTxtComponent,
    SpDividerComponent
  ],
  templateUrl: './buttons-page.component.html',
  styleUrl: './buttons-page.component.scss'
})
export class ButtonsPageComponent {
  /**
   * Constructor for ButtonsPageComponent component
   */
  constructor() {}

  /**
   * Show alert message
   * @param message the message to show
   */
  public showAlert(message: string): void {
    alert(message);
  }
}
