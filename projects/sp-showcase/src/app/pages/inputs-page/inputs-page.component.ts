import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SpInputComponent } from '../../../../../sp-lib/src/lib/sp-input/sp-input.component';
import { SpDividerComponent } from '../../../../../sp-lib/src/public-api';

/**
 * InputsPageComponent component
 * @author Alessio Giacché
 * @version 1.0.0
 * @since 2.0.0
 */
@Component({
  selector: 'app-inputs-page',
  imports: [CommonModule, FormsModule, SpDividerComponent, SpInputComponent],
  standalone: true,
  templateUrl: './inputs-page.component.html',
  styleUrl: './inputs-page.component.scss'
})
export class InputsPageComponent {
  // Password visible flag
  public passwordVisible = signal<boolean>(false);

  // Name from the event
  public nameFromEvent = '';

  // For email value ng model demo
  public emailValue = '';

  /**
   * Toggle password
   */
  public togglePassword(): void {
    this.passwordVisible.set(!this.passwordVisible());
  }

  /**
   * Change the name
   * @param value the event string value
   */
  public onNameChange(value: string): void {
    this.nameFromEvent = value;
  }
}
