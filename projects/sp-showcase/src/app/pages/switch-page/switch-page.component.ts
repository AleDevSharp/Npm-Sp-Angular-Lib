import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SpSwitchComponent } from '../../../../../sp-lib/src/lib/sp-switch/sp-switch.component';
import { SpDividerComponent } from '../../../../../sp-lib/src/public-api';

/**
 * SwitchPageComponent component
 * @author Alessio Giacché
 * @version 1.0.0
 * @since 2.0.0
 */
@Component({
  selector: 'app-switch-page',
  standalone: true,
  imports: [
    CommonModule,
    // Component import
    SpDividerComponent,
    SpSwitchComponent
  ],
  templateUrl: './switch-page.component.html',
  styleUrl: './switch-page.component.scss'
})
export class SwitchPageComponent {}
