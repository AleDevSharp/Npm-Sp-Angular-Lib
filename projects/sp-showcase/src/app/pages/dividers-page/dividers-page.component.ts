import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SpDividerComponent } from '../../../../../sp-lib/src/public-api';

/**
 * DividersPageComponent component
 * @author Alessio Giacché
 * @version 1.0.0
 * @since 2.0.0
 */
@Component({
  selector: 'app-dividers-page',
  standalone: true,
  imports: [
    CommonModule,
    // Component import
    SpDividerComponent
  ],
  templateUrl: './dividers-page.component.html',
  styleUrl: './dividers-page.component.scss'
})
export class DividersPageComponent {}
