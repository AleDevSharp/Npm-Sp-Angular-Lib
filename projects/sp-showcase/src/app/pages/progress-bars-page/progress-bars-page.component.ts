import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  SpDividerComponent,
  SpProgressbarCircularComponent,
  SpProgressbarComponent,
  SpProgressbarRoundedComponent,
  SpSpinnerComponent
} from '../../../../../sp-lib/src/public-api';

/**
 * ProgressBarsPageComponent component
 * @author Alessio Giacché
 * @version 1.0.0
 * @since 2.0.0
 */
@Component({
  selector: 'app-progress-bars-page',
  standalone: true,
  imports: [
    CommonModule,
    // Component import
    SpSpinnerComponent,
    SpDividerComponent,
    SpProgressbarComponent,
    SpProgressbarRoundedComponent,
    SpProgressbarCircularComponent
  ],
  templateUrl: './progress-bars-page.component.html',
  styleUrl: './progress-bars-page.component.scss'
})
export class ProgressBarsPageComponent implements OnInit {
  // Show variant
  public showVariant = false;

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    setTimeout(() => {
      this.showVariant = true;
    }, 600);
  }
}
